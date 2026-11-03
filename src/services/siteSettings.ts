import { requireSupabase } from '../lib/supabase/client';
import type { GeneralSettings, SeoSettings, SiteSettingKey } from '../types/settings';
import { defaultGeneralSettings, defaultSeoSettings } from '../types/settings';

async function adminClient() {
  const db = requireSupabase();
  const { data: auth, error } = await db.auth.getUser();
  if (error || !auth.user) throw new Error('Administrator sign-in required.');
  const result = await db.rpc('is_conxport_admin');
  if (result.error || result.data !== true) throw new Error('Administrator access required.');
  return { db, userId: auth.user.id };
}

function mergeGeneral(value: unknown): GeneralSettings {
  return { ...defaultGeneralSettings, ...(typeof value === 'object' && value ? value as Partial<GeneralSettings> : {}) };
}

function mergeSeo(value: unknown): SeoSettings {
  return { ...defaultSeoSettings, ...(typeof value === 'object' && value ? value as Partial<SeoSettings> : {}) };
}

export async function getGeneralSettings(): Promise<GeneralSettings> {
  const db = requireSupabase();
  const { data, error } = await db.from('site_settings').select('value').eq('key', 'general').maybeSingle();
  if (error && !/site_settings/.test(error.message)) throw error;
  return mergeGeneral(data?.value);
}

export async function getSeoSettings(): Promise<SeoSettings> {
  const db = requireSupabase();
  const { data, error } = await db.from('site_settings').select('value').eq('key', 'seo').maybeSingle();
  if (error && !/site_settings/.test(error.message)) throw error;
  return mergeSeo(data?.value);
}

export async function saveSiteSettings(key: SiteSettingKey, value: GeneralSettings | SeoSettings) {
  const { db, userId } = await adminClient();
  const { error } = await db.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString(), updated_by: userId });
  if (error) throw error;
}
