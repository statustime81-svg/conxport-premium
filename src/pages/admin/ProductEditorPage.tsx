import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';
import ProductForm from '../../components/admin/products/ProductForm';
import { getAdminProduct, type AdminProduct } from '../../services/adminProducts';

export default function ProductEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    let alive = true;
    setLoading(true);
    getAdminProduct(id).then(data => {
      if (!alive) return;
      if (!data) setError('Product not found');
      else setProduct(data);
    }).catch(e => { if (alive) setError(e instanceof Error ? e.message : 'Could not load product'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [id]);

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1280px] space-y-5 px-0 py-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="!m-0 text-[11px] font-extrabold uppercase tracking-[.16em] !text-teal-700">Admin / Products</p></div>
        <Link to="/admin/products" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"><ArrowLeft size={17} /> Back to products</Link>
      </div>
      {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-600">Loading product…</div>
        : error ? <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div>
          : <ProductForm key={product?.id ?? 'new'} product={product} onSaved={() => navigate('/admin/products', { replace: true })} />}
    </section>
  );
}
