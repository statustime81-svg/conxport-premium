import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Search, Layers3 } from 'lucide-react';
import CategoryTile from '../../components/catalogue/CategoryTile';
import { publishedCategories, type PublicCategory } from '../../services/publicCatalogue';

export default function CategoriesPage() {
  const [items, setItems] = useState<PublicCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let active = true;
    publishedCategories()
      .then(data => { if (active) setItems(data); })
      .catch(err => { if (active) setError(err instanceof Error ? err.message : 'Unable to load categories'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const mainCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(item => !item.parent_id && (
      !q || `${item.name} ${item.description ?? ''}`.toLowerCase().includes(q)
    ));
  }, [items, query]);

  return (
    <main className="min-h-[70vh] bg-[#FFFCF9] text-[#173139]">
      <section className="border-b border-[#e6eded] bg-white py-10 sm:py-14">
        <div className="mx-auto w-[min(1240px,calc(100%-32px))] sm:w-[min(1240px,calc(100%-48px))]">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs text-[#70818a]">
            <Link to="/" className="hover:text-[#07546B]">Home</Link>
            <span>/</span><span className="font-semibold text-[#07546B]">Categories</span>
          </nav>
          <p className="!mb-2 text-xs font-bold uppercase tracking-[0.15em] !text-[#D84312]">CONXPORT CATEGORIES</p>
          <h1 className="!mb-3 !font-['DM_Serif_Display',Georgia,serif] !text-[clamp(2.8rem,5vw,5.2rem)] !font-normal !leading-tight !tracking-[-0.045em] !text-[#043C50] sm:!text-4xl">
            Explore equipment <em className="italic !text-[#D84312]">categories.</em>
          </h1>
          <p className="!mb-0 max-w-2xl !text-base !leading-relaxed !text-[#617681]">
            Browse hospital and laboratory equipment by category to find what you need.
          </p>
        </div>
      </section>

      <section className="mx-auto w-[min(1240px,calc(100%-32px))] py-9 sm:w-[min(1240px,calc(100%-48px))] sm:py-12">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <p className="!m-0 text-sm font-semibold !text-[#516b75]">
            {loading ? 'Loading categories…' : `${mainCategories.length} main ${mainCategories.length === 1 ? 'category' : 'categories'}`}
          </p>
          <label className="relative w-full sm:w-[300px]">
            <span className="sr-only">Search categories</span>
            <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#779099]" />
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search categories"
              className="h-11 w-full rounded-xl border border-[#dbe6e6] bg-white pl-11 pr-4 text-sm text-[#173139] outline-none transition focus:border-[#D84312] focus:ring-2 focus:ring-[#D84312]/10"
            />
          </label>
        </div>
        {error ? (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 !text-red-700">{error}</p>
        ) : loading ? (
          <div role="status" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map(n => <div key={n} className="h-72 animate-pulse rounded-2xl bg-[#e8eeee]" />)}
          </div>
        ) : mainCategories.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mainCategories.map(item => <CategoryTile key={item.id} category={item} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#d4e0df] bg-white px-5 py-14 text-center">
            <Layers3 className="text-[#7c9994]" size={30} />
            <h2 className="!m-0 !font-sans !text-xl !font-bold !text-[#043C50]">{query ? 'No matching categories' : 'No published categories yet'}</h2>
            <p className="!m-0 text-sm !text-[#647780]">{query ? 'Try a different search term.' : 'Published equipment categories will appear here.'}</p>
          </div>
        )}
      </section>
    </main>
  );
}
