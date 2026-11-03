import { requireSupabase } from '../lib/supabase/client';

const bucket = 'product-public';

async function adminClient() {
  const db = requireSupabase();
  const { data: auth, error } = await db.auth.getUser();
  if (error || !auth.user) throw new Error('Administrator sign-in required.');
  const result = await db.rpc('is_conxport_admin');
  if (result.error || result.data !== true) throw new Error('Administrator access required.');
  return db;
}

export async function uploadCmsImage(file: File) {
  const db = await adminClient();
  const extension = file.name.split('.').pop()?.toLowerCase();
  const allowed = ['jpg', 'jpeg', 'png', 'webp'];
  if (!extension || !allowed.includes(extension)) throw new Error('Only JPG, PNG and WebP are allowed.');
  if (file.size <= 0 || file.size > 10 * 1024 * 1024) throw new Error('Image must be between 1 byte and 10 MB.');
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const path = `cms/${fileName}`;
  const { error } = await db.storage.from(bucket).upload(path, file, { upsert: false, contentType: file.type || `image/${extension}` });
  if (error) throw error;
  return db.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
