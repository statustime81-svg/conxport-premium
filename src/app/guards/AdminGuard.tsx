import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { supabase, useAuthState } from '../providers';

type Authorization = 'checking' | 'allowed' | 'denied';

export default function AdminGuard() {
  const { configured, loading, session } = useAuthState();
  const [authorization, setAuthorization] = useState<Authorization>('checking');

  useEffect(() => {
    let active = true;
    if (loading || !configured || !session || !supabase) return;
    const client = supabase;
    const userId = session.user.id;
    client.from('admin_users').select('user_id').eq('user_id', userId).maybeSingle()
      .then(({ data, error }) => {
        if (active) setAuthorization(!error && data ? 'allowed' : 'denied');
      }, () => { if (active) setAuthorization('denied'); });
    return () => { active = false; };
  }, [configured, loading, session]);

  if (!configured) return <p role="alert">Admin authentication requires Supabase configuration.</p>;
  if (loading) return <p role="status">Checking your session…</p>;
  if (!session) return <Navigate to="/admin/login" replace />;
  if (authorization === 'checking') return <p role="status">Verifying administrator access…</p>;
  if (authorization === 'denied') return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}
