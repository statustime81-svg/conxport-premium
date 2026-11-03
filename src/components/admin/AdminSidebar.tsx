import { NavLink } from 'react-router';
import { Boxes, FileSearch, FileText, FolderOpen, House, LayoutDashboard, Mail, Package, PackageCheck, Settings, TrendingUp, Truck, Users, Warehouse, BookOpen, Download } from 'lucide-react';

const groups = [
  { title: 'WORKSPACE', items: [
    {label:'Overview', to:'/admin', icon:LayoutDashboard},
    {label:'Products', to:'/admin/products', icon:Package},
    {label:'Categories', to:'/admin/categories', icon:Boxes},
    {label:'Inventory', to:'/admin/inventory', icon:PackageCheck},
    {label:'Warehouses', to:'/admin/warehouses', icon:Warehouse},
    {label:'Stock movements', to:'/admin/stock-movements', icon:Truck},
    {label:'Enquiries', to:'/admin/enquiries', icon:Mail},
    {label:'Customers', to:'/admin/customers', icon:Users},
  ]},
  { title: 'CONTENT', items: [
    {label:'Testimonials', to:'/admin/showcase/testimonial', icon:Users},
    {label:'Client logos', to:'/admin/showcase/client', icon:House},
    {label:'Latest products', to:'/admin/products', icon:Package},
    {label:'FAQ', to:'/admin/showcase/faq', icon:FileText},
    {label:'Certificates', to:'/admin/showcase/certificate', icon:FileText},
    {label:'Expo gallery', to:'/admin/showcase/expo_photo', icon:FolderOpen},
    {label:'YouTube reviews', to:'/admin/showcase/expo_video', icon:BookOpen},
    {label:'Contact inbox', to:'/admin/contact-messages', icon:Mail},
    {label:'Content pages', to:'/admin/pages', icon:FileText},
    {label:'Blog', to:'/admin/blog', icon:BookOpen},
    {label:'Case studies', to:'/admin/case-studies', icon:TrendingUp},
    {label:'Resources', to:'/admin/resources', icon:FolderOpen},
  ]},
  { title: 'SYSTEM', items: [
    {label:'SEO', to:'/admin/seo', icon:FileSearch},
    {label:'Import / Export', to:'/admin/import-export', icon:Download},
    {label:'Settings', to:'/admin/settings', icon:Settings},
  ]},
];
export default function AdminSidebar({ collapsed = false, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  return <nav aria-label="Admin navigation" className="cx-admin-nav">
    {groups.map((group) => <section className="cx-admin-nav-group" key={group.title}>
      <p className="cx-admin-nav-heading">{group.title}</p>
      {group.items.map(({label,to,icon:Icon}) => <NavLink key={to} to={to} end={to === '/admin'} title={collapsed ? label : undefined} onClick={onNavigate} className={({isActive}) => `cx-admin-navlink${isActive ? ' is-active' : ''}`}>
        <Icon size={17} strokeWidth={1.9} aria-hidden="true"/><span>{label}</span>
      </NavLink>)}
    </section>)}
  </nav>;
}
