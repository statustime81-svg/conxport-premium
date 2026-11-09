import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowUpRight, Layers3, PackageSearch } from 'lucide-react';
import { publishedCategories, publishedProductsByCategory, type PublicCategory, type PublicProduct } from '../../services/publicCatalogue';

export default function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = useParams();
  const [parent, setParent] = useState<PublicCategory | null>(null);
  const [sub, setSub] = useState<PublicCategory | null>(null);
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    setProducts([]);
    async function load() {
      try {
        const cats = await publishedCategories();
        const p = cats.find(c => c.slug === categorySlug) ?? null;
        const s = cats.find(c => c.slug === subcategorySlug && c.parent_id === p?.id) ?? null;
        if (!s) { if (alive) { setParent(null); setSub(null); } return; }
        const rows = await publishedProductsByCategory(s.id);
        if (alive) { setParent(p); setSub(s); setProducts(rows); }
      } catch (e) { if (alive) setError(e instanceof Error ? e.message : 'Subcategory unavailable'); }
      finally { if (alive) setLoading(false); }
    }
    void load();
    return () => { alive = false; };
  }, [categorySlug, subcategorySlug]);

  return (
    <main className="min-h-[65vh] bg-[#FFFCF9] font-['Manrope',system-ui,sans-serif] text-[#043C50]">
      {loading ? <div role="status" className="container py-24 text-[#596670]">Loading products…</div>
      : error ? <div role="alert" className="container py-24 text-red-700">{error}</div>
      : !sub ? <div className="container py-24"><h1 className="font-['DM_Serif_Display',Georgia,serif] text-5xl !text-[#043C50]">Subcategory <em className="!text-[#D84312]">not found.</em></h1><Link to="/categories" className="mt-6 inline-flex text-[#D84312]">Browse categories</Link></div>
      : <>
        <section className="relative overflow-hidden border-b border-[#efe7e1] bg-[#FFFCF9] py-16 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 h-[480px] w-[480px] rounded-full bg-[#FDEBE2]/60 blur-[100px]" />
          <div className="container relative max-w-[1320px]">
            <Link to={`/categories/${parent?.slug}`} className="mb-7 inline-flex items-center gap-2 text-sm font-bold !text-[#D84312] hover:underline"><ArrowLeft size={17}/>{parent?.name ?? 'All categories'}</Link>
            <p className="!mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#D84312]"><Layers3 size={16}/> CONXPORT CATALOGUE</p>
            <h1 className="!mb-0 max-w-5xl font-['DM_Serif_Display',Georgia,serif] text-[clamp(3rem,6vw,5.7rem)] font-normal leading-[1.06] tracking-[-.055em] !text-[#043C50]">Explore <span className="italic !text-[#D84312]">{sub.name}.</span></h1>
            <p className="!mb-0 mt-6 max-w-3xl text-[16px] leading-[1.8] !text-[#596670]">{sub.description ?? 'Explore products in this range.'}</p>
          </div>
        </section>
        <section className="container max-w-[1320px] py-14 sm:py-20">
          <div className="mb-9 flex flex-wrap items-center justify-between gap-4"><h2 className="!m-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2rem,3vw,3rem)] font-normal !text-[#043C50]">Available <em className="!text-[#D84312]">equipment.</em></h2><span className="rounded-full border border-[#f1ded4] bg-white px-4 py-2 text-sm font-semibold text-[#043C50]">{products.length} product{products.length === 1 ? '' : 's'}</span></div>
          {products.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map(p => <article key={p.id} className="group flex min-w-0 flex-col rounded-[25px] border border-[#eadfd8] bg-white p-6 shadow-[0_12px_42px_-32px_rgba(4,60,80,.3)] transition duration-300 hover:-translate-y-1.5 hover:border-[#E5B7A0] hover:shadow-[0_20px_50px_-30px_rgba(4,60,80,.3)]"><div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#FFF1E9] text-[#D84312]"><PackageSearch size={23}/></div><h3 className="!mb-2 font-['DM_Serif_Display',Georgia,serif] text-[24px] font-normal leading-[1.2] !text-[#043C50]">{p.name}</h3><p className="!mb-5 line-clamp-3 flex-1 text-[14px] leading-7 !text-[#596670]">{p.summary}</p><Link to={`/products/${p.slug}`} className="inline-flex items-center gap-2 border-t border-[#f0e4de] pt-4 text-sm font-bold !text-[#D84312]">View product <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></Link></article>)}</div> : <p className="rounded-[25px] border border-[#eadfd8] bg-white px-6 py-14 text-center text-[#596670]">No published products in this subcategory yet.</p>}
        </section>
      </>}
    </main>
  );
}
