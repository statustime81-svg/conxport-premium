
import { requireSupabase } from '../lib/supabase/client';

/* ================================
   TYPES
================================ */

export type PublicCategory = {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
};

export type PublicProduct = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  summary: string | null;
  description: string | null;
  primary_category_id: string | null;
  image_url?: string | null;
};

export type PublicMedia = {
  id: string;
  product_id: string;
  storage_path: string;
  media_type: string;
  sort_order: number;
};

export type PublicProductView = {
  product: PublicProduct;
  images: string[];
  category: PublicCategory | null;
};

/* ================================
   SUPABASE CLIENT
================================ */

const db = () => requireSupabase();

/* ================================
   PUBLISHED CATEGORIES
================================ */

export async function publishedCategories(): Promise<PublicCategory[]> {
  const { data, error } = await db()
    .from('categories')
    .select(
      'id,parent_id,name,slug,description,image_url'
    )
    .eq('is_published', true)
    .order('name')
    .limit(500);

  if (error) throw error;

  return (data ?? []) as PublicCategory[];
}

/* ================================
   PUBLISHED PRODUCTS
================================ */

export async function publishedProducts(): Promise<PublicProduct[]> {
  const { data, error } = await db()
    .from('products')
    .select(
      'id,name,slug,sku,summary,description,primary_category_id'
    )
    .eq('is_published', true)
    .order('name')
    .limit(500);

  if (error) throw error;

  return attachThumbnails((data ?? []) as PublicProduct[]);
}

/* ================================
   SINGLE PRODUCT DETAILS
================================ */

/** Fetch thumbnails in one query, preserving the existing public catalogue contract. */
async function attachThumbnails(products: PublicProduct[]): Promise<PublicProduct[]> {
  if (products.length === 0) return products;
  const client = db();
  const { data, error } = await client.from('product_media')
    .select('product_id,storage_path,sort_order')
    .in('product_id', products.map(item => item.id))
    .eq('media_type', 'image')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  const urls = new Map<string, string>();
  for (const item of data ?? []) {
    if (!urls.has(item.product_id) && item.storage_path && !item.storage_path.includes('..')) {
      urls.set(item.product_id, client.storage.from('product-public').getPublicUrl(item.storage_path).data.publicUrl);
    }
  }
  return products.map(item => ({ ...item, image_url: urls.get(item.id) ?? null }));
}

export async function getPublishedProduct(
  slug: string
): Promise<PublicProductView | null> {
  const client = db();

  const { data, error } = await client
    .from('products')
    .select(
      'id,name,slug,sku,summary,description,primary_category_id'
    )
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) throw error;

  if (!data) return null;

  const product = data as PublicProduct;

  /* Product media and primary category */
  const [mediaResult, categoryResult] = await Promise.all([
    client
      .from('product_media')
      .select(
        'id,product_id,storage_path,media_type,sort_order'
      )
      .eq('product_id', product.id)
      .eq('media_type', 'image')
      .order('sort_order')
      .limit(60),

    product.primary_category_id
      ? client
          .from('categories')
          .select(
            'id,parent_id,name,slug,description,image_url'
          )
          .eq('id', product.primary_category_id)
          .eq('is_published', true)
          .maybeSingle()
      : Promise.resolve({
          data: null,
          error: null,
        }),
  ]);

  if (mediaResult.error) {
    throw mediaResult.error;
  }

  if (categoryResult.error) {
    throw categoryResult.error;
  }

  /* Generate public image URLs from storage */
  const images = (mediaResult.data ?? [])
    .filter((media) => {
      return (
        Boolean(media.storage_path) &&
        !media.storage_path.includes('..')
      );
    })
    .map((media) => {
      return client.storage
        .from('product-public')
        .getPublicUrl(media.storage_path)
        .data.publicUrl;
    });

  return {
    product,
    images,
    category: categoryResult.data as PublicCategory | null,
  };
}

/* ================================
   PRODUCTS BY CATEGORY
================================ */

export async function publishedProductsByCategory(
  categoryId: string
): Promise<PublicProduct[]> {
  const client = db();

  /* Products assigned through junction table */
  const { data: links, error: linksError } = await client
    .from('product_categories')
    .select('product_id')
    .eq('category_id', categoryId)
    .limit(1000);

  if (linksError) throw linksError;

  const linkedIds = (links ?? []).map(
    (item) => item.product_id
  );

  /* Products with primary category */
  const { data: primary, error: primaryError } = await client
    .from('products')
    .select(
      'id,name,slug,sku,summary,description,primary_category_id'
    )
    .eq('is_published', true)
    .eq('primary_category_id', categoryId)
    .limit(500);

  if (primaryError) throw primaryError;

  let secondary: PublicProduct[] = [];

  /* Products linked through product_categories */
  if (linkedIds.length > 0) {
    const { data, error } = await client
      .from('products')
      .select(
        'id,name,slug,sku,summary,description,primary_category_id'
      )
      .eq('is_published', true)
      .in('id', linkedIds.slice(0, 500))
      .limit(500);

    if (error) throw error;

    secondary = (data ?? []) as PublicProduct[];
  }

  /* Remove duplicate products */
  const uniqueProducts = new Map<
    string,
    PublicProduct
  >();

  [...(primary ?? []), ...secondary].forEach(
    (product) => {
      uniqueProducts.set(product.id, product);
    }
  );

  return attachThumbnails(Array.from(uniqueProducts.values()));
}
