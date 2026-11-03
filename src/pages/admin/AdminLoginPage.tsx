import './admin-ui-fix.css';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthFormShell, { buttonStyle, fieldStyle } from '../../components/auth/AuthFormShell';
import { checkAdminMembership, signIn, signOut } from '../../services/auth';

export default function AdminLoginPage() {
  const navigate=useNavigate(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
  async function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setBusy(true);
    try {
      const result=await signIn(email,password);
      if (!result.user || !(await checkAdminMembership(result.user.id))) { await signOut(); throw new Error('This account does not have administrator access.'); }
      navigate('/admin', { replace:true });
    } catch(err) { setError(err instanceof Error ? err.message : 'Unable to sign in.'); }
    finally { setBusy(false); }
  }
  return <AuthFormShell eyebrow="RESTRICTED ACCESS" title="Administrator sign in." description="Authorized ConXport administrators only. New customer accounts cannot access this area.">
    <form onSubmit={submit}>
      <label>Admin email<input required autoComplete="username" type="email" value={email} onChange={e=>setEmail(e.target.value)} style={fieldStyle}/></label>
      <label>Password<input required autoComplete="current-password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={fieldStyle}/></label>
      {error && <p role="alert" style={{ color: '#ffc0b9' }}>{error}</p>}
      <button type="submit" disabled={busy} style={buttonStyle}>{busy?'Verifying…':'Sign in securely'}</button>
    </form>
    <p style={{ marginTop: 22 }}><Link to="/forgot-password" style={{ color: '#47d8c2' }}>Reset password</Link></p>
  </AuthFormShell>;
}
