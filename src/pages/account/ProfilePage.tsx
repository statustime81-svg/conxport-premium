import { useEffect, useState, type FormEvent } from 'react';
import { useAuthState } from '../../app/providers';
import { requireSupabase } from '../../lib/supabase/client';

type Profile = { full_name: string | null; company: string | null };
export default function ProfilePage() {
  const { session } = useAuthState();
  const [profile, setProfile] = useState<Profile>({ full_name: '', company: '' });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (!session?.user.id) return;
    let active = true;
    requireSupabase().from('profiles').select('full_name,company').eq('id', session.user.id).maybeSingle().then(({data,error}) => {
      if (!active) return;
      if (error) setMessage(error.message);
      else if (data) setProfile({ full_name:data.full_name, company:data.company });
    });
    return () => { active = false; };
  }, [session?.user.id]);
  async function save(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session?.user.id) return;
    setBusy(true); setMessage('');
    const { error } = await requireSupabase().from('profiles').upsert({id:session.user.id, full_name:profile.full_name?.trim() || null, company:profile.company?.trim() || null}, { onConflict:'id' });
    setMessage(error ? error.message : 'Profile updated successfully.'); setBusy(false);
  }
  return <section className="cx-portal"><p className="cx-overline">ACCOUNT SETTINGS</p><h1>My profile</h1><p>Manage your business contact information.</p>
    <form className="cx-panel cx-form" onSubmit={save}>
      <label>Full name<input maxLength={120} value={profile.full_name ?? ''} onChange={e=>setProfile(p=>({...p,full_name:e.target.value}))}/></label>
      <label>Company<input maxLength={160} value={profile.company ?? ''} onChange={e=>setProfile(p=>({...p,company:e.target.value}))}/></label>
      <label>Email<input value={session?.user.email ?? ''} disabled /></label>
      <button className="cx-primary" type="submit" disabled={busy}>{busy?'Saving…':'Save changes'}</button>
      {message && <p role="status">{message}</p>}
    </form>
  </section>;
}
