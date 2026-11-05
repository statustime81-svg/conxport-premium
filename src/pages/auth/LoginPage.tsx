import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import AuthFormShell, { buttonStyle, fieldStyle } from '../../components/auth/AuthFormShell';
import { signIn } from '../../services/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  const destination = from?.startsWith('/') && !from.startsWith('//') ? from : '/account';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setBusy(true);
    try { await signIn(email, password); navigate(destination, { replace: true }); }
    catch (err) { setError(err instanceof Error ? err.message : 'Could not sign in.'); }
    finally { setBusy(false); }
  }
  return <AuthFormShell eyebrow="CUSTOMER ACCESS" title="Welcome back." description="Sign in to view saved equipment and track your quotations.">
    <form onSubmit={submit}>
      <label>Email address<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} style={fieldStyle}/></label>
      <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} style={fieldStyle}/></label>
      {error && <p role="alert" style={{ color: '#ffc0b9' }}>{error}</p>}
      <button type="submit" style={buttonStyle} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
    <p style={{ marginTop: 22 }}><Link to="/forgot-password" style={{ color: '#FF6A35' }}>Forgot password?</Link></p>
    <p>New customer? <Link to="/register" style={{ color: '#FF6A35' }}>Create an account</Link></p>
  </AuthFormShell>;
}
