/** Share the single initialized Supabase client used by AuthProvider. */
import { supabase } from '../../app/providers';
export { supabase };
export function requireSupabase() {
  if (!supabase) throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  return supabase;
}
