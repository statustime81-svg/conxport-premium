import { useState, type FormEvent } from 'react';
import AuthFormShell, { buttonStyle, fieldStyle } from '../../components/auth/AuthFormShell';
import { requestPasswordReset } from '../../services/auth';

export default function ForgotPasswordPage() {
  const [email,setEmail]=useState(''); const [busy,setBusy]=useState(false); const [sent,setSent]=useState(false); const [error,setError]=useState('');
  async function submit(e:FormEvent<HTMLFormElement>) { e.preventDefault(); setBusy(true); setError(''); try { await requestPasswordReset(email); setSent(true); } catch(err) { setError(err instanceof Error ? err.message : 'Could not send link.'); } finally { setBusy(false); } }
  return <AuthFormShell eyebrow="ACCOUNT RECOVERY" title="Reset your password." description="Enter your email address to request a secure password reset link.">
    {sent ? <p role="status">If this email is registered, a recovery email will arrive shortly. Check your inbox and spam folder.</p> : <form onSubmit={submit}>
      <label>Business email<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} style={fieldStyle}/></label>
      {error && <p role="alert" style={{ color: '#ffc0b9' }}>{error}</p>}
      <button type="submit" disabled={busy} style={buttonStyle}>{busy ? 'Sending…' : 'Send reset link'}</button>
    </form>}
  </AuthFormShell>;
}
