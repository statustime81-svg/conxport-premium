import { NavLink, Outlet } from 'react-router';

const accountNav = [
  { to: '/account', label: 'Overview', end: true },
  { to: '/account/profile', label: 'My Profile' },
  { to: '/account/saved-products', label: 'Saved Products' },
  { to: '/account/enquiries', label: 'My Enquiries' },
  { to: '/account/quotes', label: 'Quote Tracking' },
];

export default function AccountLayout() {
  return (
    <div className="site-shell">
      <header className="site-header container"><NavLink to="/" className="brand">CONXPORT</NavLink><span>Customer Account</span></header>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem', paddingBlock: '2rem' }}>
        <nav aria-label="Account navigation" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {accountNav.map((item) => <NavLink key={item.to} to={item.to} end={item.end} style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400 })}>{item.label}</NavLink>)}
        </nav>
        <main id="main-content"><Outlet /></main>
      </div>
    </div>
  );
}
