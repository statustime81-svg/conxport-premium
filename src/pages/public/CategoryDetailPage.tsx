import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowUpRight, ImageOff, PackageSearch } from 'lucide-react';
import CategoryTile from '../../components/catalogue/CategoryTile';
import {
  publishedCategories,
  publishedProductsByCategory,
  type PublicCategory,
  type PublicProduct,
} from '../../services/publicCatalogue';

function ProductRow({ product }: { product: PublicProduct }) {
  const [failed, setFailed] = useState(false);
  return (
    <article className="flex flex-col gap-4 border-b border-[#e3ebeb] py-5 last:border-b-0 sm:flex-row sm:items-center sm:gap-6">
      <Link to={`/products/${product.slug}`} className="flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#edf1f1] bg-[#f6f8f8] p-3 sm:h-32 sm:w-36">
        {product.image_url && !failed ? (
          <img src={product.image_url} alt={product.name} loading="lazy" className="h-full w-full object-contain" onError={() => setFailed(true)} />
        ) : (
          <ImageOff size={26} strokeWidth={1.5} className="text-[#99aeb2]" aria-label="No product image" />
        )}
      </Link>
      <div className="min-w-0 flex-1">
        <p className="!mb-1 text-xs font-semibold uppercase tracking-wide !text-[#69818a]">SKU: {product.sku}</p>
        <h3 className="!m-0 !font-sans !text-lg !font-bold !tracking-[-0.02em] !text-[#18323c] sm:!text-xl">{product.name}</h3>
        <p className="!mb-0 !mt-2 line-clamp-3 max-w-3xl text-sm !leading-relaxed !text-[#627783]">
          {product.summary?.trim() || 'Product specifications and availability are available on request.'}
        </p>
      </div>
      <Link to={`/products/${product.slug}`} className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#cbded9] px-4 py-2.5 text-sm font-bold text-[#07546B] transition hover:bg-[#E7F5F7] sm:self-center">
        View product <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}

export default function CategoryDetailPage() {
  const { categorySlug } = useParams();
  const [category, setCategory] = useState<PublicCategory | null>(null);
  const [children, setChildren] = useState<PublicCategory[]>([]);
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setCategory(null);
    setChildren([]);
    setProducts([]);
    setImageFailed(false);
    async function load() {
      try {
        const all = await publishedCategories();
        const found = all.find(item => item.slug === categorySlug) ?? null;
        if (!found) return;
        const assigned = await publishedProductsByCategory(found.id);
        if (active) {
          setCategory(found);
          setChildren(all.filter(item => item.parent_id === found.id));
          setProducts(assigned);
        }
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Category unavailable');
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [categorySlug]);

  return (
    <main className="min-h-[65vh] bg-[#FFFCF9] text-[#043C50]">
      <div className="mx-auto w-[min(1240px,calc(100%-32px))] py-9 sm:w-[min(1240px,calc(100%-48px))] sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[#70818a]">
          <Link to="/" className="hover:text-[#07546B]">Home</Link><span>/</span>
          <Link to="/categories" className="hover:text-[#07546B]">Categories</Link><span>/</span>
          <span className="font-semibold text-[#07546B]">{category?.name ?? 'Category'}</span>
        </nav>

        {loading ? (
          <p role="status" className="!text-[#647780]">Loading category…</p>
        ) : error ? (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 !text-red-700">{error}</p>
        ) : !category ? (
          <section className="py-12">
            <h1 className="!font-['DM_Serif_Display',Georgia,serif] !text-[clamp(2.5rem,4.8vw,4.8rem)] !font-normal !text-[#043C50]">Category not found</h1>
            <Link to="/categories" className="mt-5 inline-flex gap-2 font-semibold text-[#07546B]"><ArrowLeft size={17} /> Back to categories</Link>
          </section>
        ) : (
          <>
            <section className="grid items-start gap-8 border-b border-[#e2ebeb] pb-10 md:grid-cols-[minmax(0,1fr)_minmax(250px,360px)] md:gap-12">
              <div className="min-w-0">
                <p className="!mb-3 text-xs font-bold uppercase tracking-[0.15em] !text-[#D84312]">Equipment category</p>
                <h1 className="!mb-4 !font-['DM_Serif_Display',Georgia,serif] !text-[clamp(2.5rem,4.8vw,4.8rem)] !font-normal !leading-tight !tracking-[-0.045em] !text-[#043C50] sm:!text-4xl lg:!text-[44px]">{category.name} <em className="italic !text-[#D84312]">equipment.</em></h1>
                <p className="!mb-0 max-w-2xl whitespace-pre-line text-base !leading-8 !text-[#5e737d]">
                  {category.description?.trim() || 'Explore the equipment available in this category. Open a product to see more details and request a quotation.'}
                </p>
                <p className="!mb-0 !mt-5 text-sm font-semibold !text-[#D84312]">
                  {children.length} {children.length === 1 ? 'subcategory' : 'subcategories'} · {products.length} {products.length === 1 ? 'product' : 'products'}
                </p>
              </div>
              {category.image_url && !imageFailed && (
                <div className="flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-[#e1e9e9] bg-[#f7f9f9] p-4 sm:h-64">
                  <img src={category.image_url} alt={category.name} className="h-full w-full object-contain" onError={() => setImageFailed(true)} />
                </div>
              )}
            </section>

            {children.length > 0 && (
              <section aria-labelledby="subcategories-title" className="border-b border-[#e2ebeb] py-10">
                <h2 id="subcategories-title" className="!mb-5 !font-['DM_Serif_Display',Georgia,serif] !text-[clamp(1.9rem,3vw,3rem)] !font-normal !tracking-[-0.035em] !text-[#043C50]">Explore <em className="italic !text-[#D84312]">subcategories.</em></h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {children.map(child => <CategoryTile category={child} key={child.id} />)}
                </div>
              </section>
            )}

            <section aria-labelledby="category-products-title" className="py-10">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
                <h2 id="category-products-title" className="!m-0 !font-['DM_Serif_Display',Georgia,serif] !text-[clamp(1.9rem,3vw,3rem)] !font-normal !tracking-[-0.035em] !text-[#043C50]">Products in this <em className="italic !text-[#D84312]">category.</em></h2>
                <span className="text-sm text-[#69818a]">{products.length} products</span>
              </div>
              {products.length ? (
                <div className="divide-y divide-[#e2ebeb]">
                  {products.map(product => <ProductRow product={product} key={product.id} />)}
                </div>
              ) : (
                <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-[#d8e3e1] bg-[#f8faf9] px-6 py-10">
                  <PackageSearch size={28} className="text-[#87a19b]" />
                  <p className="!m-0 font-semibold !text-[#043C50]">No published products assigned to this category yet.</p>
                  <p className="!m-0 text-sm !text-[#667b83]">Products appear here after they are published and assigned to this category in Admin.</p>
                  <Link to="/products" className="mt-1 inline-flex items-center gap-2 self-start text-sm font-bold text-[#07546B]">Browse all products <ArrowUpRight size={16} /></Link>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
