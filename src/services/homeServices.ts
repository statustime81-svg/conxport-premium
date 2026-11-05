import { requireSupabase } from '../lib/supabase/client';
import { uploadCmsImage } from './contentMedia';

export type HomeService = {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
};

const table = 'home_services';

export async function getHomeServices(): Promise<HomeService[]> {
  const { data, error } = await requireSupabase()
    .from(table)
    .select('id,title,image_url,created_at')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as HomeService[];
}

async function checkAdmin() {
  const db = requireSupabase();
  const { data: auth, error: authError } = await db.auth.getUser();
  if (authError || !auth.user) throw new Error('Please sign in as administrator.');
  const { data, error } = await db.rpc('is_conxport_admin');
  if (error || data !== true) throw new Error('Administrator permission required.');
  return db;
}

export async function saveHomeService(input: { id?: string; title: string; image?: File; currentImage?: string }) {
  const db = await checkAdmin();
  const title = input.title.trim();
  if (!title || title.length > 120) throw new Error('Service title must be between 1 and 120 characters.');
  const image_url = input.image ? await uploadCmsImage(input.image) : (input.currentImage ?? '');
  if (!image_url) throw new Error('Choose a service image.');
  const payload = { title, image_url };
  const result = input.id
    ? await db.from(table).update(payload).eq('id', input.id)
    : await db.from(table).insert(payload);
  if (result.error) throw result.error;
}

export async function deleteHomeService(id: string) {
  const db = await checkAdmin();
  const { error } = await db.from(table).delete().eq('id', id);
  if (error) throw error;
}
