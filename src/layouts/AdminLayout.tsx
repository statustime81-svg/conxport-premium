import '../styles/admin-improvements.css';
import '../styles/admin-premium.css';
import '../styles/admin-compact.css';
import '../styles/admin-v2.css';
import '../styles/admin-structural-fix.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { ChevronRight, ExternalLink, LogOut, Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import { signOut } from '../services/auth';

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  async function logout() {
    try { await signOut(); navigate('/admin/login', { replace: true }); }
    catch { window.alert('Sign out failed. Please retry.'); }
  }
  const currentPage = pathname === '/admin' ? 'Overview' : pathname.split('/').filter(Boolean).slice(1).map((s) => s.replace(/-/g, ' ')).join(' / ');

  return (
    <div className={`cx-admin-shell cx-admin-compact${collapsed ? ' is-collapsed' : ''}`}>
      {mobileOpen && <button type="button" className="cx-admin-overlay" aria-label="Close sidebar" onClick={() => setMobileOpen(false)} />}
      <aside className={`cx-admin-sidebar${mobileOpen ? ' is-open' : ''}`}>
        <div className="cx-admin-brandrow">
          <Link to="/admin" className="cx-admin-logo" title="ConXport Admin">
            <span className="cx-admin-monogram">C</span>
            <span className="cx-admin-brandtext"><b>ConXport</b><small>ADMIN WORKSPACE</small></span>
          </Link>
          <button className="cx-admin-sidecontrol cx-admin-close-mobile" type="button" onClick={() => setMobileOpen(false)} aria-label="Close sidebar"><X size={18} /></button>
          <button className="cx-admin-sidecontrol cx-admin-collapse" type="button" onClick={() => setCollapsed((v) => !v)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <PanelLeftOpen size={18}/> : <PanelLeftClose size={18}/>}</button>
        </div>
        <AdminSidebar collapsed={collapsed} onNavigate={() => setMobileOpen(false)} />
        <div className="cx-admin-sidebar-bottom"><Link to="/" title="View website"><ExternalLink size={17}/><span>View website</span></Link></div>
      </aside>
      <div className="cx-admin-main">
        <header className="cx-admin-top">
          <div className="cx-admin-top-left">
            <button type="button" className="cx-admin-mobile-menu" aria-label="Open admin sidebar" onClick={() => setMobileOpen(true)}><Menu size={20}/></button>
            <div className="cx-admin-crumb"><span>ConXport</span><ChevronRight size={14}/><span>Admin</span><ChevronRight size={14}/><strong>{currentPage}</strong></div>
            <h1>{pathname === '/admin' ? 'Dashboard' : currentPage}</h1>
          </div>
          <div className="cx-admin-top-actions"><Link to="/" className="cx-admin-website"><ExternalLink size={15}/>View site</Link><button type="button" className="cx-admin-signout" onClick={() => void logout()}><LogOut size={15}/><span>Sign out</span></button></div>
        </header>
        <main className="cx-admin-content"><Outlet /></main>
      </div>
    </div>
  );
}
