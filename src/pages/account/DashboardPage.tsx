import { Link, useNavigate } from 'react-router';
import { useAuthState } from '../../app/providers';
import { signOut } from '../../services/auth';

export default function DashboardPage() {
  const {session}=useAuthState(); const navigate=useNavigate();
  async function logout() { try { await signOut(); navigate('/login',{replace:true}); } catch { window.alert('Unable to sign out. Please retry.'); } }
  return <section style={{ padding:'2.5rem 0', color:'#f4fbfd' }}>
    <p style={{ color:'#47d8c2', letterSpacing:'.15em', fontSize:12 }}>CUSTOMER PORTAL</p>
    <h1 style={{ fontSize:'clamp(2rem,5vw,3.5rem)' }}>Your account.</h1>
    <p style={{ color:'#b8cbd0' }}>Signed in as {session?.user.email ?? 'Customer'}</p>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:16, marginTop:32 }}>
      {[['Saved equipment','/account/saved-products'],['My enquiries','/account/enquiries'],['Quotation tracking','/account/quotes'],['My profile','/account/profile']].map(([title,to])=><Link key={to} to={to} style={{ background:'#172a31', color:'#e9f5f6', border:'1px solid #36535a', padding:24, borderRadius:14, textDecoration:'none' }}>{title} →</Link>)}
    </div>
    <p style={{ marginTop:28, color:'#afc5ca' }}>Enquiry history and profile details will be connected to live records in later batches.</p>
    <button type="button" onClick={logout} style={{ marginTop:18, padding:'12px 20px', borderRadius:8, background:'#47d8c2', border:0, cursor:'pointer' }}>Sign out</button>
  </section>;
}
