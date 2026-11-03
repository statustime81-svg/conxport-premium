import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import type { Session, SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** No client is instantiated until public Supabase configuration is provided. */
export const supabase: SupabaseClient | null = url && anonKey
  ? createClient(url, anonKey, { auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true } })
  : null;

type AuthState = { session: Session | null; loading: boolean; configured: boolean };
const AuthContext = createContext<AuthState>({ session: null, loading: true, configured: false });

export function useAuthState(): AuthState {
  return useContext(AuthContext);
}

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false } },
  }));
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    const client = supabase;
    client.auth.getSession().then(({ data }) => {
      if (active) { setSession(data.session); setLoading(false); }
    }).catch(() => { if (active) setLoading(false); });
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (active) { setSession(nextSession); setLoading(false); }
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  const auth = useMemo<AuthState>(() => ({
    session, loading: Boolean(supabase) && loading, configured: Boolean(supabase),
  }), [session, loading]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    </QueryClientProvider>
  );
}
