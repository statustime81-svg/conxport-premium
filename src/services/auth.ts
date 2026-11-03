import { requireSupabase } from '../lib/supabase/client';

export function getAuthRedirect() {
  return `${window.location.origin}/reset-password`;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await requireSupabase().auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw new Error(error.message);
  return data;
}

export async function signUp(email: string, password: string, fullName: string, company: string) {
  const { data, error } = await requireSupabase().auth.signUp({
    email: email.trim(), password,
    options: { data: { full_name: fullName.trim(), company: company.trim() }, emailRedirectTo: `${window.location.origin}/login` },
  });
  if (error) throw new Error(error.message);
  // Registration must not grant administrator privileges.
  return data;
}

export async function requestPasswordReset(email: string) {
  const { error } = await requireSupabase().auth.resetPasswordForEmail(email.trim(), { redirectTo: getAuthRedirect() });
  if (error) throw new Error(error.message);
}

export async function updatePassword(password: string) {
  const { error } = await requireSupabase().auth.updateUser({ password });
  if (error) throw new Error(error.message);
}

export async function signOut() {
  const { error } = await requireSupabase().auth.signOut();
  if (error) throw new Error(error.message);
}

export async function checkAdminMembership(userId: string): Promise<boolean> {
  const { data, error } = await requireSupabase().from('admin_users').select('user_id').eq('user_id', userId).maybeSingle();
  if (error) throw new Error(error.message);
  return Boolean(data);
}
