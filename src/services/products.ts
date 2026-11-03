import { supabase } from '../lib/supabase/client';
import type { CatalogueCategory, CatalogueProduct } from '../lib/supabase/types';

export async function listPublishedCategories(): Promise<CatalogueCategory[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from('categories')
    .select('id,parent_id,name,slug,description,is_published')
    .eq('is_published', true).order('name').limit(100);
  if (error) throw error;
  return (data ?? []) as CatalogueCategory[];
}
export async function listPublishedProducts(page = 1, limit = 24): Promise<CatalogueProduct[]> {
  if (!supabase) return [];
  const safeLimit = Math.max(1, Math.min(100, Math.floor(limit)));
  const safePage = Math.max(1, Math.floor(page));
  const start = (safePage - 1) * safeLimit;
  const { data, error } = await supabase.from('products')
    .select('id,name,slug,sku,summary,description,is_published,primary_category_id,created_at')
    .eq('is_published', true).order('created_at', { ascending: false })
    .range(start, start + safeLimit - 1);
  if (error) throw error;
  return (data ?? []) as CatalogueProduct[];
}
