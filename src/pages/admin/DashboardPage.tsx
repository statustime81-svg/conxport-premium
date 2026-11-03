import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Boxes, CircleHelp, FileBadge2, Images, LayoutDashboard, Mail, MessageSquareQuote, Package, PlaySquare, Users, Warehouse } from 'lucide-react';
import { requireSupabase } from '../../lib/supabase/client';

const modules = [
  { title: 'Products', description: 'Manage equipment, product images, details and publish status.', path: '/admin/products', icon: Package, group: 'CATALOGUE' },
  { title: 'Categories', description: 'Organise equipment categories and subcategories.', path: '/admin/categories', icon: Boxes, group: 'CATALOGUE' },
  { title: 'Inventory', description: 'Manage warehouse stock and availability.', path: '/admin/inventory', icon: Warehouse, group: 'OPERATIONS' },
  { title: 'Enquiries', description: 'View quotation and equipment enquiries.', path: '/admin/enquiries', icon: Mail, group: 'CRM' },
  { title: 'Contact inbox', description: 'Read and respond to website contact submissions.', path: '/admin/contact-messages', icon: Mail, group: 'CRM' },
  { title: 'Testimonials', description: 'Publish reviews, reviewer names and photographs.', path: '/admin/showcase/testimonial', icon: MessageSquareQuote, group: 'WEBSITE' },
  { title: 'Client logos', description: 'Upload client and institutional logos.', path: '/admin/showcase/client', icon: Users, group: 'WEBSITE' },
  { title: 'Latest products', description: 'Publish products to the latest equipment section.', path: '/admin/products', icon: Package, group: 'WEBSITE' },
  { title: 'FAQ', description: 'Update questions and answers on the homepage.', path: '/admin/showcase/faq', icon: CircleHelp, group: 'WEBSITE' },
  { title: 'Certificates', description: 'Manage certificates and their downloadable documents.', path: '/admin/showcase/certificate', icon: FileBadge2, group: 'WEBSITE' },
  { title: 'Expo gallery', description: 'Manage up to 10 event photographs.', path: '/admin/showcase/expo_photo', icon: Images, group: 'WEBSITE' },
  { title: 'YouTube reviews', description: 'Add embedded review videos to Our Expo.', path: '/admin/showcase/expo_video', icon: PlaySquare, group: 'WEBSITE' },
];
const dataModules = [
  { label: 'Published products', table: 'products', match: ['is_published', true] as const, icon: Package },
  { label: 'Categories', table: 'categories', match: null, icon: Boxes },
  { label: 'Contact messages', table: 'contact_messages', match: null, icon: Mail },
  { label: 'Testimonials', table: 'site_showcase', match: ['kind', 'testimonial'] as const, icon: MessageSquareQuote },
];
export default function DashboardPage() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  useEffect(() => { let active = true; void Promise.all(dataModules.map(async ({table, match, label}) => {
    try { const db = requireSupabase(); let query = db.from(table).select('id', { count: 'exact', head: true });
      if (match) query = query.eq(match[0], match[1]);
      const { count, error } = await query; return [label, error ? null : count] as const;
    } catch { return [label, null] as const; }
  })).then(result => { if (active) setCounts(Object.fromEntries(result)); }); return () => {active = false}; }, []);
  return <div className="cx-dashboard-v2">
    <div className="cx-dashboard-v2__hero">
      <div><span className="cx-dashboard-v2__eyebrow"><LayoutDashboard size={15}/> CONXPORT ADMINISTRATION</span><h2>Website control center</h2><p>Manage your hospital equipment catalogue, website content and customer enquiries from one place.</p></div>
      <Link to="/" className="cx-dashboard-v2__hero-link">View website <ArrowUpRight size={17}/></Link>
    </div>
    <div className="cx-dashboard-v2__stats">{dataModules.map(({label, icon:Icon})=><div className="cx-dashboard-v2__stat" key={label}><div className="cx-dashboard-v2__stat-icon"><Icon size={20}/></div><div><span>{label}</span><strong>{counts[label] === undefined ? '…' : counts[label] === null ? 'N/A' : counts[label]}</strong></div></div>)}</div>
    <div className="cx-dashboard-v2__heading"><div><span className="cx-dashboard-v2__section-label">MODULES</span><h3>Manage your website</h3><p>Open any module to add, edit or publish content.</p></div><span className="cx-dashboard-v2__pill">{modules.length} modules</span></div>
    <div className="cx-dashboard-v2__modules">{modules.map(({title,description,path,icon:Icon,group},i)=><Link to={path} key={title} className="cx-dashboard-v2__module" style={{animationDelay:`${i*35}ms`}}><div className="cx-dashboard-v2__module-top"><div className="cx-dashboard-v2__module-icon"><Icon size={22}/></div><span>{group}</span></div><h4>{title}</h4><p>{description}</p><div className="cx-dashboard-v2__module-footer">Open module <ArrowUpRight size={17}/></div></Link>)}</div>
  </div>;
}
