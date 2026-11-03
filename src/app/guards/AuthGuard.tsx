import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthState } from '../providers';

export default function AuthGuard() {
  const { configured, loading, session } = useAuthState();
  const location = useLocation();

  if (!configured) {
    return <p role="alert">Customer login is not configured yet. Add Supabase environment variables in the backend setup phase.</p>;
  }
  if (loading) return <p role="status">Checking your session…</p>;
  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
