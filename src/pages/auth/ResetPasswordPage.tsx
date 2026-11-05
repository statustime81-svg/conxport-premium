import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import AuthFormShell, { buttonStyle, fieldStyle } from '../../components/auth/AuthFormShell';
import { updatePassword } from '../../services/auth';
import { useAuthState } from '../../app/providers';

export default function ResetPasswordPage() {
  const { session, loading } = useAuthState();
  const [password,setPassword]=useState(''); const [confirm,setConfirm]=useState(''); const [busy,setBusy]=useState(false); const [success,setSuccess]=useState(false); const [error,setError]=useState('');
  async function submit(e:FormEvent<HTMLFormElement>) { e.preventDefault(); setError(''); if(password.length<12 || password!==confirm) { setError('Use matching passwords with at least 12 characters.'); return; } setBusy(true); try { await updatePassword(password); setSuccess(true); } catch(err) { setError(err instanceof Error ? err.message : 'Could not update password.'); } finally { setBusy(false); } }
  return <AuthFormShell eyebrow="SECURE PASSWORD UPDATE" title="Choose a new password." description="Use the recovery link from your email to activate a recovery session.">
    {loading ? <p role="status">Checking recovery session…</p> : success ? <p role="status">Password updated. <Link to="/login" style={{ color: '#FF6A35' }}>Sign in</Link></p> : !session ? <p role="alert">No active recovery session. Open the link in your recovery email, or <Link to="/forgot-password" style={{ color: '#FF6A35' }}>request another link</Link>.</p> : <form onSubmit={submit}>
      <label>New password<input type="password" required minLength={12} autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} style={fieldStyle}/></label>
      <label>Confirm password<input type="password" required minLength={12} autoComplete="new-password" value={confirm} onChange={e=>setConfirm(e.target.value)} style={fieldStyle}/></label>
      {error && <p role="alert" style={{ color: '#ffc0b9' }}>{error}</p>}
      <button type="submit" disabled={busy} style={buttonStyle}>{busy ? 'Updating…' : 'Update password'}</button>
    </form>}
  </AuthFormShell>;
}
