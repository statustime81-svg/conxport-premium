import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import AuthFormShell, { buttonStyle, fieldStyle } from '../../components/auth/AuthFormShell';
import { signUp } from '../../services/auth';

export default function RegisterPage() {
  const [values, setValues] = useState({ name: '', company: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState(''); const [success, setSuccess] = useState(false); const [busy, setBusy] = useState(false);
  const change = (key: keyof typeof values, value: string) => setValues(v => ({ ...v, [key]: value }));
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError('');
    if (values.password.length < 12) { setError('Use a password of at least 12 characters.'); return; }
    if (values.password !== values.confirm) { setError('Passwords do not match.'); return; }
    setBusy(true);
    try { await signUp(values.email, values.password, values.name, values.company); setSuccess(true); }
    catch (err) { setError(err instanceof Error ? err.message : 'Registration failed.'); }
    finally { setBusy(false); }
  }
  return <AuthFormShell eyebrow="CUSTOMER REGISTRATION" title="Create an account." description="Save products and manage your business enquiries.">
    {success ? <p role="status">Registration submitted. Check your email to confirm your account, if email verification is enabled. <Link to="/login" style={{ color: '#FF6A35' }}>Sign in</Link></p> :
      <form onSubmit={submit}>
        {([['name','Full name','name'],['company','Company / Institution','organization'],['email','Business email','email'],['password','Password (12+ characters)','new-password'],['confirm','Confirm password','new-password']] as const).map(([key,label,auto]) => <label key={key} style={{ display: 'block' }}>{label}<input type={key === 'password' || key === 'confirm' ? 'password' : key === 'email' ? 'email' : 'text'} autoComplete={auto} required minLength={key === 'password' || key === 'confirm' ? 12 : undefined} value={values[key]} onChange={e=>change(key,e.target.value)} style={fieldStyle}/></label>)}
        {error && <p role="alert" style={{ color: '#ffc0b9' }}>{error}</p>}
        <button style={buttonStyle} disabled={busy} type="submit">{busy ? 'Creating account…' : 'Register'}</button>
      </form>}
    <p style={{ marginTop: 20 }}>Already registered? <Link to="/login" style={{ color: '#FF6A35' }}>Sign in</Link></p>
  </AuthFormShell>;
}
