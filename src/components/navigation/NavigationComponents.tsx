import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ArrowUpRight, ChevronDown, Layers3 } from 'lucide-react';
import { publishedCategories, type PublicCategory } from '../../services/publicCatalogue';

// Both desktop and mobile menus read published categories from the existing catalogue service.
// The menus are mounted when opened, so every opening requests the current Admin-published list.
function useMenuCategories() {
  const [items, setItems] = useState<PublicCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    publishedCategories()
      .then((data) => { if (active) setItems(data); })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : 'Categories could not be loaded.');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const tree = useMemo(() => {
    const byId = new Map(items.map((item) => [item.id, item]));
    const roots = items.filter((item) => !item.parent_id || !byId.has(item.parent_id));
    const children = new Map<string, PublicCategory[]>();
    items.forEach((item) => {
      if (item.parent_id && byId.has(item.parent_id)) {
        const group = children.get(item.parent_id) ?? [];
        group.push(item);
        children.set(item.parent_id, group);
      }
    });
    return { roots, children, byId };
  }, [items]);

  return { ...tree, loading, error };
}

function menuCategoryPath(category: PublicCategory, byId: Map<string, PublicCategory>) {
  if (category.parent_id) {
    const parent = byId.get(category.parent_id);
    if (parent) return `/categories/${encodeURIComponent(parent.slug)}/${encodeURIComponent(category.slug)}`;
  }
  return `/categories/${encodeURIComponent(category.slug)}`;
}

export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const { roots, children, byId, loading, error } = useMenuCategories();

  // Use only Admin-published data. Flatten the visible tree for a clean,
  // four-column text menu while retaining each category's original route.
  const visibleCategories = roots.flatMap((category) => [
    category,
    ...(children.get(category.id) ?? []),
  ]);

  return (
    <div
      id="cx-mega-menu"
      className="cx-mega-menu cx-mega-menu-wide"
      aria-label="Published equipment categories"
    >
      <div className="cx-mega-wide-header">
        <p className="cx-menu-eyebrow !m-0">EXPLORE EQUIPMENT</p>
        <Link
          to="/categories"
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 text-xs font-bold !text-[#07546B] hover:!text-[#FF4F18]"
        >
          View all categories <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="cx-mega-wide-scroll" aria-live="polite">
        {loading ? (
          <p role="status" className="!m-0 py-4 text-sm !text-slate-500">Loading categories…</p>
        ) : error ? (
          <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            Unable to load categories. <Link to="/categories" onClick={onNavigate} className="font-bold underline">Open categories page</Link>
          </div>
        ) : visibleCategories.length === 0 ? (
          <p className="!m-0 py-4 text-sm !text-slate-500">No published categories yet.</p>
        ) : (
          <div className="cx-mega-wide-grid">
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                to={menuCategoryPath(category, byId)}
                onClick={onNavigate}
                className="cx-mega-wide-link"
                title={category.name}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="cx-mega-wide-footer">
        <span>Explore our published medical equipment categories</span>
        <Link to="/products" onClick={onNavigate} className="inline-flex items-center gap-1 font-bold !text-[#07546B] hover:!text-[#FF4F18]">
          <Layers3 size={15} aria-hidden="true" /> All products
        </Link>
      </div>
    </div>
  );
}

export function MobileNavigation({ onNavigate }: { onNavigate: () => void }) {
  const { roots, children, byId, loading, error } = useMenuCategories();
  const [showCategories, setShowCategories] = useState(false);
  const items = [
    ['Products', '/products'], ['Blog', '/blog'],
    ['Case studies', '/case-studies'], ['Resources', '/resources'], ['About', '/about'],
    ['Certificates', '/certifications'], ['Our Expo', '/our-expo'],
    ['Distributor', '/distributor'], ['Download Profile', '/downloads/conxport-company-profile.pdf'],
    ['Contact', '/contact'], ['Quote list', '/quote-list'], ['My account', '/account'],
  ];

  return (
    <nav id="cx-mobile-menu" className="cx-mobile-nav" aria-label="Mobile navigation">
      <NavLink to="/categories" onClick={onNavigate}>
        All Categories <ArrowUpRight size={17} aria-hidden="true" />
      </NavLink>
      <button
        type="button"
        aria-expanded={showCategories}
        aria-controls="cx-mobile-category-list"
        onClick={() => setShowCategories((value) => !value)}
        className="flex w-full items-center justify-between border-b border-[#d9e5ec] bg-transparent px-1 py-4 text-left text-[15px] font-bold !text-[#17323a]"
      >
        Browse Categories <ChevronDown size={18} className={`transition-transform ${showCategories ? 'rotate-180' : ''}`} />
      </button>
      {showCategories && (
        <div id="cx-mobile-category-list" className="max-h-[45vh] overflow-y-auto overscroll-contain bg-[#F1F7FA] px-3 py-2">
          {loading ? (
            <p role="status" className="!m-0 px-2 py-4 text-sm">Loading categories…</p>
          ) : error ? (
            <p role="alert" className="!m-0 px-2 py-4 text-sm">Unable to load categories. Please open All Categories.</p>
          ) : roots.length === 0 ? (
            <p className="!m-0 px-2 py-4 text-sm">No published categories yet.</p>
          ) : roots.map((category) => (
            <div key={category.id} className="border-b border-[#e4eeeb] last:border-0">
              <NavLink
                to={menuCategoryPath(category, byId)}
                onClick={onNavigate}
                className="!flex !items-center !justify-between !py-3 text-sm !font-bold !text-[#18323d]"
              >
                {category.name} <ArrowUpRight size={15} aria-hidden="true" />
              </NavLink>
              {(children.get(category.id) ?? []).map((child) => (
                <NavLink
                  key={child.id}
                  to={menuCategoryPath(child, byId)}
                  onClick={onNavigate}
                  className="!flex !items-center !justify-between !py-2 !pl-5 text-[13px] !text-[#526973]"
                >
                  {child.name} <ArrowUpRight size={13} aria-hidden="true" />
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      )}
      {items.map(([label, to]) => to.endsWith('.pdf')
        ? <a href={to} key={to} download onClick={onNavigate}>{label}<ArrowUpRight size={17} /></a>
        : <NavLink to={to} key={to} onClick={onNavigate}>{label}<ArrowUpRight size={17} aria-hidden="true" /></NavLink>)}
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
