import { Link, NavLink } from 'react-router';
import { ArrowUpRight, Boxes, FileText, FlaskConical, HeartPulse, Microscope } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const links: { label: string; to: string; icon: LucideIcon; description: string }[] = [
  { label: 'All Equipment', to: '/products', icon: Boxes, description: 'Explore the full medical equipment catalogue' },
  { label: 'Browse Categories', to: '/categories', icon: Microscope, description: 'Navigate by equipment type and function' },
  { label: 'Hospital Procurement', to: '/contact', icon: HeartPulse, description: 'Talk to us about institutional requirements' },
  { label: 'Laboratory Systems', to: '/resources', icon: FlaskConical, description: 'Guides and supporting materials' },
  { label: 'Insights & Articles', to: '/blog', icon: FileText, description: 'Editorial content and updates' },
];

export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div id="cx-mega-menu" className="cx-mega-menu" aria-label="Equipment menu">
      <p className="cx-menu-eyebrow">DISCOVER CONXPORT</p>
      <div className="cx-mega-grid">
        {links.map(({ label, to, icon: Icon, description }) => (
          <Link to={to} key={label} className="cx-mega-item" onClick={onNavigate}>
            <Icon size={21} aria-hidden="true" />
            <span><strong>{label}</strong><small>{description}</small></span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        ))}
      </div>
      <div className="cx-mega-bottom">Premium healthcare sourcing experience for hospitals, laboratories and distributors.</div>
    </div>
  );
}

export function MobileNavigation({ onNavigate }: { onNavigate: () => void }) {
  const items = [
    ['Products', '/products'], ['Categories', '/categories'], ['Blog', '/blog'],
    ['Case studies', '/case-studies'], ['Resources', '/resources'], ['About', '/about'],
    ['Certificates', '/certifications'], ['Our Expo', '/our-expo'], ['Download Profile', '/downloads/conxport-company-profile.pdf'], ['Contact', '/contact'], ['Quote list', '/quote-list'], ['My account', '/account'],
  ];
  return (
    <nav id="cx-mobile-menu" className="cx-mobile-nav" aria-label="Mobile navigation">
      {items.map(([label, to]) => to.endsWith('.pdf') ? <a href={to} key={to} download onClick={onNavigate}>{label}<ArrowUpRight size={17} /></a> : <NavLink to={to} key={to} onClick={onNavigate}>{label}<ArrowUpRight size={17} aria-hidden="true" /></NavLink>)}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="cx-footer">
      <div className="container cx-footer-top">
        <div>
          <Link className="cx-footer-brand" to="/">CONXPORT<span>.</span></Link>
          <p>Premium medical equipment sourcing for hospitals, laboratories and institutional buyers. Replace temporary visuals with your own final photography anytime.</p>
        </div>
        <div><strong>Catalogue</strong><Link to="/products">Products</Link><Link to="/categories">Categories</Link><Link to="/resources">Resources</Link></div>
        <div><strong>Company</strong><Link to="/about">About us</Link><Link to="/blog">Insights</Link><Link to="/case-studies">Case studies</Link><Link to="/contact">Contact</Link><Link to="/our-expo">Our Expo</Link><Link to="/certifications">Certificates</Link><a href="/downloads/conxport-company-profile.pdf" download>Download Profile</a></div>
        <div><strong>Support</strong><Link to="/faq">FAQs</Link><Link to="/privacy-policy">Privacy policy</Link><Link to="/terms-and-conditions">Terms</Link><Link to="/cookie-policy">Cookies</Link></div>
      </div>
      <div className="container cx-footer-bottom"><span>© {new Date().getFullYear()} ConXport. All rights reserved.</span><span>India & international enquiries</span></div>
    </footer>
  );
}
