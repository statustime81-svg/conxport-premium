import './admin-ui-fix.css';
import { Link } from 'react-router';
export default function MediaPage(){ return <section className="cx-portal"><p className="cx-overline">CONXPORT / MEDIA</p><h1>Product images & media</h1><p>Manage uploads from each product's media screen. Files are stored in the configured Supabase Storage bucket.</p><Link className="cx-primary" to="/admin/products">Choose a product</Link></section> }
