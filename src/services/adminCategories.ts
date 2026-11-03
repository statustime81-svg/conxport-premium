import { requireSupabase } from '../lib/supabase/client';
import { categorySchema, type CategoryInput } from '../lib/validations/adminCategory';

export type CategoryRecord = CategoryInput & { id: string };

async function adminClient() {
  const db = requireSupabase();
  const { data: { user }, error } = await db.auth.getUser();
  if (error || !user) throw Error('Admin sign in required.');
  const check = await db.rpc('is_conxport_admin');
  if (check.error || check.data !== true) throw Error('Administrator permission required.');
  return db;
}

export async function listCategories(): Promise<CategoryRecord[]> {
  const db = await adminClient();
  const { data, error } = await db.from('categories')
    .select('id,name,slug,description,parent_id,is_published,image_url')
    .order('name').limit(500);
  if (error) throw error;
  return (data ?? []).map(row => ({ ...row, description: row.description ?? '', image_url: row.image_url ?? null })) as CategoryRecord[];
}

export async function saveCategory(input: CategoryInput, id?: string): Promise<string> {
  const db = await adminClient();
  const values = categorySchema.parse(input);
  if (id && values.parent_id === id) throw Error('A category cannot be its own parent.');
  if (id) {
    const { data, error } = await db.from('categories').update(values).eq('id', id).select('id').single();
    if (error) throw error;
    if (!data) throw Error('Category not updated.');
    return id;
  }
  const { data, error } = await db.from('categories').insert(values).select('id').single();
  if (error) throw error;
  return data.id as string;
}

const validTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
]);

export async function uploadCategoryImage(file: File, categoryId: string): Promise<string> {
  const extension = validTypes.get(file.type);
  if (!extension) throw Error('Only JPG, PNG or WebP images are allowed.');
  if (file.size > 5 * 1024 * 1024) throw Error('Image must be smaller than 5 MB.');
  if (file.size === 0) throw Error('Please select a non-empty image.');
  const db = await adminClient();
  const path = `${categoryId}/${crypto.randomUUID()}.${extension}`;
  const { error } = await db.storage.from('category-public').upload(path, file, {
    cacheControl: '3600', contentType: file.type, upsert: false,
  });
  if (error) throw error;
  return db.storage.from('category-public').getPublicUrl(path).data.publicUrl;
}

export async function removeCategory(id: string) {
  const db = await adminClient();
  const { data, error } = await db.from('categories').delete().eq('id', id).select('id');
  if (error) throw error;
  if (!data?.length) throw Error('Category was not deleted.');
}
