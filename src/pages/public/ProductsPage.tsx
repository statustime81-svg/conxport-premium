import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArrowRight, ChevronRight, Package, Search, X } from 'lucide-react';
import {
  publishedCategories,
  publishedProducts,
  type PublicCategory,
  type PublicProduct,
} from '../../services/publicCatalogue';

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const query = params.get('q') ?? '';
  const categorySlug = params.get('category') ?? '';

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const [nextProducts, nextCategories] = await Promise.all([
          publishedProducts(),
          publishedCategories(),
        ]);
        if (!active) return;
        setProducts(nextProducts);
        setCategories(nextCategories);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Catalogue unavailable');
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, []);

  const selectedCategory = categories.find((item) => item.slug === categorySlug);
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return products.filter((product) => {
      const text = [product.name, product.sku, product.summary ?? '']
        .join(' ').toLocaleLowerCase();
      const matchesText = !term || text.includes(term);
      const matchesCategory = !categorySlug || product.primary_category_id === selectedCategory?.id;
      return matchesText && matchesCategory;
    });
  }, [products, query, categorySlug, selectedCategory?.id]);

  function changeParam(name: 'q' | 'category', value: string) {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      if (value.trim()) next.set(name, value);
      else next.delete(name);
      return next;
    }, { replace: true });
  }

  return (
    <main className="min-h-[75vh] bg-[#FFFCF9] font-['Manrope',system-ui,sans-serif] text-[#043C50]">
      <section className="border-b border-[#f1e5dc] bg-[linear-gradient(115deg,#FFFCF9,#FFF4EC)] py-14 sm:py-14 lg:py-16">
        <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[12px] text-slate-500">
            <Link to="/" className="transition-colors hover:text-[#D84312]">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-semibold text-[#07546B]">Products</span>
          </nav>
          <p className="!mb-2 text-[11px] font-extrabold uppercase tracking-[.16em] !text-[#D84312]">ConXport Catalogue</p>
          <h1 className="!mb-3 !text-[clamp(2.8rem,5.2vw,5.2rem)] !font-normal !leading-[1.07] !tracking-[-.045em] !text-[#043C50]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Medical <span className="italic !text-[#D84312]">equipment.</span></h1>
          <p className="!mb-0 max-w-2xl !text-[15px] !leading-7 !text-[#657780] sm:!text-[16px]">
            Browse available hospital and laboratory equipment. View product details and request a quotation for your requirements.
          </p>
        </div>
      </section>

      <section className="mx-auto w-[min(1280px,calc(100%-40px))] py-8 sm:py-10">
        <div className="mb-7 flex flex-col gap-3 rounded-2xl border border-[#e1e9e8] bg-white p-4 sm:flex-row sm:items-center sm:p-5">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search products</span>
            <Search size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => changeParam('q', event.target.value)}
              placeholder="Search product name or SKU..."
              className="h-12 w-full rounded-xl border border-[#dce6e5] bg-white pl-11 pr-10 text-[14px] text-[#16323a] outline-none transition focus:border-[#D84312] focus:ring-2 focus:ring-[#D84312]/10"
            />
            {query && <button type="button" onClick={() => changeParam('q', '')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-[#D84312]"><X size={16}/></button>}
          </label>
          <label className="w-full shrink-0 sm:w-[240px]">
            <span className="sr-only">Filter by category</span>
            <select
              value={categorySlug}
              onChange={(event) => changeParam('category', event.target.value)}
              className="h-12 w-full rounded-xl border border-[#dce6e5] bg-white px-4 text-[14px] text-[#16323a] outline-none transition focus:border-[#D84312] focus:ring-2 focus:ring-[#D84312]/10"
            >
              <option value="">All categories</option>
              {categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}
            </select>
          </label>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="!m-0 !text-[clamp(1.9rem,3vw,2.7rem)] !font-normal !tracking-[-.025em] !text-[#043C50]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Explore <span className="italic !text-[#D84312]">products.</span></h2>
          {!loading && !error && <p className="!m-0 !text-[13px] !text-slate-500">{filtered.length} product{filtered.length === 1 ? '' : 's'} found</p>}
        </div>

        {loading ? (
          <p role="status" className="rounded-xl border border-[#e1e9e8] bg-white p-8 !text-slate-600">Loading products…</p>
        ) : error ? (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 !text-red-700">{error}</p>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d6e3e1] bg-[#fafcfc] px-6 py-16 text-center">
            <Package size={34} className="mx-auto mb-4 text-[#8aa9a2]" />
            <h3 className="!mb-2 !font-sans !text-[20px] !font-bold !text-[#17323a]">No matching products</h3>
            <p className="!mb-5 !text-[14px] !text-slate-500">Try another product name or choose a different category.</p>
            <button type="button" onClick={() => setParams(new URLSearchParams(), { replace: true })} className="rounded-full bg-[#D84312] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#043C50]">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <article key={product.id} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e3ebea] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#bbd7ce] hover:shadow-[0_15px_35px_rgba(10,58,52,.08)]">
                <Link to={`/products/${product.slug}`} aria-label={`View ${product.name}`} className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#FFF5EF] p-4">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#92aaa8]"><Package size={42} strokeWidth={1.3}/><span className="text-xs">Image coming soon</span></div>
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <p className="!mb-2 truncate text-[11px] font-semibold uppercase tracking-[.07em] !text-[#66837e]">SKU: {product.sku}</p>
                  <h3 className="!mb-2 !text-[20px] !font-normal !leading-snug !tracking-[-.02em] !text-[#043C50]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{product.name}</h3>
                  <p className="!mb-5 line-clamp-3 !text-[13px] !leading-6 !text-[#687a82]">{product.summary || 'Product information is available on request.'}</p>
                  <Link to={`/products/${product.slug}`} className="mt-auto inline-flex items-center gap-2 text-[13px] font-bold text-[#07546B] transition hover:gap-3 hover:text-[#087968]">View product <ArrowRight size={16}/></Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
