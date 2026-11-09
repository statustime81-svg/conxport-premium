import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArrowUpRight, PackageSearch } from 'lucide-react';
import SearchBar from '../../components/navigation/SearchBar';
import {
  publishedCategories,
  publishedProducts,
  type PublicCategory,
  type PublicProduct,
} from '../../services/publicCatalogue';

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get('q') ?? '').trim();
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    Promise.all([publishedProducts(), publishedCategories()])
      .then(([productRows, categoryRows]) => {
        if (!mounted) return;
        setProducts(productRows);
        setCategories(categoryRows);
      })
      .catch((reason: unknown) => {
        if (mounted) setError(reason instanceof Error ? reason.message : 'Unable to load catalogue.');
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const matches = useMemo(() => {
    if (!query) return [];
    const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const categoryNames = new Map(categories.map((c) => [c.id, c.name]));
    return products.filter((product) => {
      const searchable = [
        product.name,
        product.sku,
        product.summary ?? '',
        product.primary_category_id ? categoryNames.get(product.primary_category_id) ?? '' : '',
      ].join(' ').toLocaleLowerCase();
      return terms.every((term) => searchable.includes(term));
    });
  }, [products, categories, query]);

  return (
    <main className="min-h-[75vh] bg-[#FFFCF9] text-[#142d33]">
      <section className="bg-[#FFFCF9] px-5 py-12 text-[#043C50] sm:py-16">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] !text-[#D84312]">ConXport catalogue</p>
          <h1 className="mb-3 font-['DM_Serif_Display',Georgia,serif] text-[clamp(3rem,6vw,5.7rem)] font-normal leading-[1.04] tracking-[-.055em] !text-[#043C50]">Search <span className="italic !text-[#D84312]">results.</span></h1>
          <p className="mb-6 !text-[#596670]">Find published hospital and laboratory equipment by name, category or catalogue number.</p>
          <div className="max-w-[820px]"><SearchBar className="!mx-0" /></div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-5 py-10 sm:py-14">
        {loading ? (
          <p role="status" className="text-[#55727a]">Searching published products…</p>
        ) : error ? (
          <div role="alert" className="rounded-2xl border border-red-200 bg-white p-6 text-red-700">Unable to load products: {error}</div>
        ) : !query ? (
          <div className="rounded-2xl border border-[#dce9e8] bg-white p-10 text-center"><PackageSearch className="mx-auto mb-3 text-[#D84312]" size={34}/><h2 className="font-['DM_Serif_Display',Georgia,serif] text-2xl font-normal">Enter a product name to search</h2></div>
        ) : (
          <>
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <h2 className="m-0 font-['DM_Serif_Display',Georgia,serif] text-2xl font-normal text-[#15333b] sm:text-2xl">{matches.length} result{matches.length === 1 ? '' : 's'} for “{query}”</h2>
              <Link to="/products" className="text-sm font-bold text-[#D84312] hover:underline">Browse all products</Link>
            </div>
            {matches.length === 0 ? (
              <div className="rounded-2xl border border-[#dce9e8] bg-white px-6 py-12 text-center">
                <PackageSearch size={40} className="mx-auto mb-4 text-[#D84312]"/>
                <h3 className="font-['DM_Serif_Display',Georgia,serif] text-2xl font-normal">No matching products found</h3>
                <p className="mt-2 !text-[#647982]">Try another product name or catalogue number.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {matches.map((product) => {
                  const category = categories.find((c) => c.id === product.primary_category_id);
                  return (
                    <article key={product.id} className="group flex min-w-0 flex-col rounded-[24px] border border-[#eee0d8] bg-white p-6 shadow-[0_8px_25px_rgba(13,60,65,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#84bdb4] hover:shadow-[0_18px_36px_rgba(13,60,65,0.12)]">
                      <span className="mb-3 text-xs font-extrabold uppercase tracking-wider !text-[#D84312]">{category?.name ?? 'Medical equipment'}</span>
                      <h3 className="mb-2 font-['DM_Serif_Display',Georgia,serif] text-xl font-normal leading-snug text-[#043C50]">{product.name}</h3>
                      <p className="mb-2 text-xs !text-[#71858b]">Cat. no: {product.sku || 'On request'}</p>
                      <p className="mb-5 line-clamp-3 flex-1 text-sm !text-[#5b747d]">{product.summary || 'Product specifications available on request.'}</p>
                      <Link to={`/products/${product.slug}`} className="inline-flex items-center gap-2 border-t border-[#e6eeee] pt-4 text-sm font-extrabold !text-[#D84312]">View product <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
