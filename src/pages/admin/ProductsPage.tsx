import './admin-ui-fix.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, PackagePlus, RefreshCw, Search } from 'lucide-react';
import { deleteAdminProduct, listAdminProducts, type AdminProduct } from '../../services/adminProducts';

export default function ProductsPage() {
  const [items, setItems] = useState<AdminProduct[]>([]);
  const [term, setTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function refresh(search = '') {
    setLoading(true);
    setError('');
    try { setItems(await listAdminProducts(search)); }
    catch (e) { setError(e instanceof Error ? e.message : 'Unable to load products'); }
    finally { setLoading(false); }
  }

  useEffect(() => { void refresh(); }, []);

  async function remove(p: AdminProduct) {
    if (!window.confirm(`Delete ${p.name}? This cannot be undone.`)) return;
    try { await deleteAdminProduct(p.id); await refresh(term); }
    catch (e) { setError(e instanceof Error ? e.message : 'Delete failed'); }
  }

  return (
    <section className="cx-admin-page">
      <div className="cx-admin-page__header">
        <div>
          <p className="cx-overline">CATALOGUE / PRODUCTS</p>
          <h1>Products</h1>
          <p className="cx-admin-page__sub">Manage equipment listings, specifications and publication status.</p>
        </div>
        <Link className="cx-primary" to="/admin/products/new"><PackagePlus size={16} /> Add product <ArrowUpRight size={14}/></Link>
      </div>
      <div className="cx-admin-page__toolbar">
        <form className="cx-admin-page__search" onSubmit={(e) => { e.preventDefault(); void refresh(term); }}>
          <input aria-label="Search products" placeholder="Search product name or SKU" value={term} onChange={(e) => setTerm(e.target.value)} />
          <button type="submit"><Search size={15} /> Search</button>
        </form>
        <button className="cx-admin-page__soft" type="button" onClick={() => void refresh(term)}><RefreshCw size={14} /> Refresh</button>
      </div>
      {error && <p className="cx-admin-alert" role="alert">{error}</p>}
      <div className="cx-admin-page__table-wrap">
        {loading ? <div className="cx-admin-page__empty">Loading products…</div> : items.length === 0 ? <div className="cx-admin-page__empty">No matching products. Add your first product or change the search.</div> :
          <table className="cx-admin-page__table">
            <thead><tr><th>Product</th><th>SKU</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{items.map((p) => <tr key={p.id}>
              <td><strong>{p.name}</strong></td>
              <td>{p.sku}</td>
              <td><span className={`cx-admin-page__pill ${p.is_published ? 'cx-admin-page__pill--live' : ''}`}>{p.is_published ? 'Published' : 'Draft'}</span></td>
              <td><Link to={`/admin/products/${p.id}/edit`}>Edit</Link><button type="button" style={{ marginLeft: 14 }} onClick={() => void remove(p)}>Delete</button></td>
            </tr>)}</tbody>
          </table>}
      </div>
      <p className="cx-admin-page__hint">Showing up to 100 products. Existing search and deletion services are unchanged.</p>
    </section>
  );
}
