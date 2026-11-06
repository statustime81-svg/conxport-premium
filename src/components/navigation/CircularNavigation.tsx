import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, NavLink } from 'react-router';
import {
  ArrowUpRight, Award, BookOpen, Building2, ChevronDown, Download,
  FolderHeart, Grid2X2, Home, Mail, Network, PackageSearch, ShieldCheck,
  UserRound, X,
  type LucideIcon,
} from 'lucide-react';
import { publishedCategories, type PublicCategory } from '../../services/publicCatalogue';
import './circular-navigation.css';

type NavItem = { name: string; icon: LucideIcon; href: string };
const items: NavItem[] = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'About', icon: Building2, href: '/about' },
  { name: 'Categories', icon: Grid2X2, href: '/categories' },
  { name: 'Insights', icon: BookOpen, href: '/blog' },
  { name: 'Our Expo', icon: Award, href: '/our-expo' },
  { name: 'Certificates', icon: ShieldCheck, href: '/certifications' },
  { name: 'Distributor', icon: Network, href: '/distributor' },
  { name: 'Turnkey Projects', icon: FolderHeart, href: '/turnkey-projects' },
  { name: 'Contact', icon: Mail, href: '/contact' },
];
const secondary = [
  { name: 'All Products', href: '/products', icon: PackageSearch },
  { name: 'Case Studies', href: '/case-studies', icon: BookOpen },
  { name: 'Resources', href: '/resources', icon: BookOpen },
  { name: 'My Account', href: '/account', icon: UserRound },
  { name: 'Quote List', href: '/quote-list', icon: ArrowUpRight },
];

export default function CircularNavigation({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const reducedMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(false);

  useEffect(() => {
    if (!isOpen) { setCategoriesOpen(false); return; }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const root = document.getElementById('cx-circular-navigation');
        if (!root) return;
        const focusable = Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', keyDown);
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', keyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !categoriesOpen) return;
    let active = true;
    setCategoriesLoading(true);
    setCategoriesError(false);
    publishedCategories()
      .then(list => { if (active) setCategories(list); })
      .catch(() => { if (active) setCategoriesError(true); })
      .finally(() => { if (active) setCategoriesLoading(false); });
    return () => { active = false; };
  }, [isOpen, categoriesOpen]);

  const byId = new Map(categories.map(category => [category.id, category]));
  const categoryPath = (category: PublicCategory) => {
    const parent = category.parent_id ? byId.get(category.parent_id) : undefined;
    return parent
      ? `/categories/${encodeURIComponent(parent.slug)}/${encodeURIComponent(category.slug)}`
      : `/categories/${encodeURIComponent(category.slug)}`;
  };
  const closeMenu = () => { setCategoriesOpen(false); onClose(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="cx-circular-navigation"
          className="cx-circle-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="ConXport navigation"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
        >
          <button type="button" className="cx-circle-backdrop" aria-label="Close navigation" onClick={closeMenu} tabIndex={-1} />
          <div className="cx-circle-scroll">
            <motion.div className="cx-circle-content"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.78, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.84, y: 15 }}
              transition={{ duration: reducedMotion ? 0 : 0.52, type: reducedMotion ? 'tween' : 'spring', stiffness: 150, damping: 22 }}
            >
              <div className="cx-circle-orbit">
                <div className="cx-circle-ring cx-circle-ring-outer" aria-hidden="true" />
                <div className="cx-circle-ring cx-circle-ring-inner" aria-hidden="true" />
                <button ref={closeRef} type="button" aria-label="Close menu" className="cx-circle-close" onClick={closeMenu}><X size={23}/></button>
                <div className="cx-circle-center" aria-hidden="true">
                  <span className="cx-circle-center-kicker">EXPLORE</span>
                  <span>CON<span className="cx-orange">X</span>PORT</span>
                </div>
                {items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      className="cx-circle-node"
                      style={{ '--cx-index': index, '--cx-total': items.length } as CSSProperties}
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.45 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: reducedMotion ? 0 : 0.1 + index * 0.035, duration: 0.3 }}
                    >
                      <NavLink to={item.href} end={item.href === '/'} onClick={closeMenu}
                        className={({ isActive }) => `cx-circle-link ${isActive ? 'cx-circle-link-active' : ''}`}
                        aria-label={item.name}
                      >
                        <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
                        <span>{item.name}</span>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>
              <div className="cx-circle-bottom">
                <div className="cx-circle-quicklinks" aria-label="Additional links">
                  {secondary.map(link => {
                    const Icon = link.icon;
                    return <Link key={link.href} to={link.href} onClick={closeMenu} className="cx-circle-secondary"><Icon size={15}/>{link.name}</Link>;
                  })}
                  <a href="/downloads/conxport-company-profile.pdf" download="ConXport-Company-Profile.pdf" className="cx-circle-secondary" onClick={closeMenu}><Download size={15}/> Download Profile</a>
                </div>
                <button type="button" className="cx-circle-category-toggle" onClick={() => setCategoriesOpen(v => !v)} aria-expanded={categoriesOpen} aria-controls="cx-circle-categories">
                  Browse published equipment categories <ChevronDown size={17} className={categoriesOpen ? 'rotate-180' : ''}/>
                </button>
                {categoriesOpen && (
                  <div id="cx-circle-categories" className="cx-circle-categories">
                    {categoriesLoading ? <p>Loading categories…</p>
                      : categoriesError ? <p>Could not load categories. <Link to="/categories" onClick={closeMenu}>Open all categories</Link></p>
                      : categories.length === 0 ? <p>No published categories yet.</p>
                      : categories.map(category => <Link key={category.id} to={categoryPath(category)} onClick={closeMenu}>{category.name}</Link>)}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
