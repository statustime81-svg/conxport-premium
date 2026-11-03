import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Image as ImageIcon, Plus, X } from 'lucide-react';
import { useDocumentMeta } from '../../seo/useDocumentMeta';
import { productSchema } from '../../seo/structuredData';
import {
  getPublishedProduct,
  publishedProducts,
  type PublicProduct,
  type PublicProductView,
} from '../../services/publicCatalogue';

const QUOTE_KEY = 'conxport-quote-list-v1';

function PhotoGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const current = images[selected];

  useEffect(() => {
    setSelected(0);
    setFullscreen(false);
  }, [images]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreen(false);
      if (event.key === 'ArrowRight') setSelected((value) => (value + 1) % images.length);
      if (event.key === 'ArrowLeft') setSelected((value) => (value - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [fullscreen, images.length]);

  const previous = () => setSelected((value) => (value - 1 + images.length) % images.length);
  const next = () => setSelected((value) => (value + 1) % images.length);

  return (
    <div className="min-w-0">
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white sm:aspect-[5/4]">
        {current ? (
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            aria-label={`Enlarge image of ${name}`}
            className="group flex h-full w-full cursor-zoom-in items-center justify-center !bg-transparent p-5 sm:p-8"
          >
            <img src={current} alt={`${name} photo ${selected + 1}`} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.025]" />
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3 px-8 text-center text-slate-400">
            <ImageIcon size={48} strokeWidth={1.3} />
            <span className="text-sm">Product image not available</span>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-3" aria-label="Product image thumbnails">
          {images.map((src, index) => (
            <button
              type="button"
              key={`${src}-${index}`}
              aria-label={`Show image ${index + 1} of ${name}`}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className={`h-20 w-20 overflow-hidden rounded-lg border bg-white p-1 transition-colors ${selected === index ? 'border-[#0d5c4f] ring-2 ring-[#0d5c4f]/20' : 'border-slate-200 hover:border-[#0d5c4f]/60'}`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
      {fullscreen && current && (
        <div role="dialog" aria-modal="true" aria-label={`${name} image viewer`} className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 p-4 sm:p-10" onClick={() => setFullscreen(false)}>
          <button type="button" aria-label="Close image viewer" onClick={() => setFullscreen(false)} className="absolute right-4 top-4 rounded-full bg-white p-2 text-slate-900 sm:right-8 sm:top-8"><X size={24} /></button>
          {images.length > 1 && <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); previous(); }} className="absolute left-3 rounded-full bg-white/90 p-2 text-slate-900 sm:left-7"><ChevronLeft size={24}/></button>}
          <img src={current} alt={`${name} enlarged photo ${selected + 1}`} onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-[85vw] object-contain" />
          {images.length > 1 && <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 rounded-full bg-white/90 p-2 text-slate-900 sm:right-7"><ChevronRight size={24}/></button>}
          {images.length > 1 && <span className="absolute bottom-4 text-sm text-white/80">{selected + 1} / {images.length}</span>}
        </div>
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  const { productSlug } = useParams();
  const [view, setView] = useState<PublicProductView | null>(null);
  const [related, setRelated] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quoteError, setQuoteError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setQuoteError('');
    setView(null);
    setRelated([]);
    setAdded(false);

    async function load() {
      try {
        if (!productSlug) return;
        const result = await getPublishedProduct(productSlug);
        if (!active) return;
        setView(result);
        if (!result) return;
        try {
          const saved: unknown = JSON.parse(localStorage.getItem(QUOTE_KEY) ?? '[]');
          if (active && Array.isArray(saved)) setAdded(saved.includes(result.product.slug));
        } catch { /* A blocked localStorage must not hide a product. */ }
        try {
          const all = await publishedProducts();
          if (active) setRelated(all.filter((item) => item.id !== result.product.id && item.primary_category_id === result.product.primary_category_id).slice(0, 4));
        } catch { /* Related product errors must not hide the product. */ }
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Unable to load this product.');
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [productSlug]);

  useDocumentMeta(
    view ? {
      title: `${view.product.name} | ConXport`,
      description: view.product.summary ?? 'Explore this equipment and request a quotation.',
      canonicalPath: `/products/${view.product.slug}`,
      type: 'product',
    } : {
      title: 'Product Catalogue | ConXport',
      description: 'Product availability and details from ConXport.',
      noindex: !loading && !view,
    },
    view ? productSchema({
      name: view.product.name,
      slug: view.product.slug,
      description: view.product.description,
      sku: view.product.sku,
    }, view.images[0]) : undefined,
  );

  function addToQuote() {
    if (!view) return;
    setQuoteError('');
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(QUOTE_KEY) ?? '[]');
      const existing = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
      localStorage.setItem(QUOTE_KEY, JSON.stringify([...new Set([...existing, view.product.slug])]));
      window.dispatchEvent(new Event('conxport-quote-list-change'));
      setAdded(true);
    } catch {
      setQuoteError('Quote list could not be saved in this browser. Please try again.');
    }
  }

  if (loading) return <main role="status" className="min-h-[60vh] bg-white px-6 py-24 text-center text-slate-600">Loading product details…</main>;

  if (!view) return (
    <main className="mx-auto min-h-[60vh] max-w-6xl bg-white px-5 py-20">
      <h1 className="!mb-3 !font-sans !text-3xl !font-bold !text-slate-900">{error ? 'Unable to load product' : 'Product not found'}</h1>
      <p role={error ? 'alert' : undefined} className="!text-slate-600">{error || 'This product is unavailable or not published.'}</p>
      <Link to="/products" className="mt-6 inline-flex items-center gap-2 font-semibold !text-[#0d5c4f] hover:underline"><ArrowLeft size={17}/> Back to catalogue</Link>
    </main>
  );

  const { product, images, category } = view;
  const overview = product.description?.trim() || product.summary?.trim() || 'Detailed product information is available on request.';

  return (
    <main className="min-h-screen bg-white font-sans !text-[#172b34]">
      <div className="mx-auto w-full max-w-[1280px] px-4 pb-20 pt-7 sm:px-7 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-[13px] !text-slate-500">
          <Link to="/" className="hover:!text-[#0d5c4f]">Home</Link><ChevronRight size={14}/>
          <Link to="/products" className="hover:!text-[#0d5c4f]">Products</Link><ChevronRight size={14}/>
          <span className="break-words font-medium !text-[#203b42]">{product.name}</span>
        </nav>

        <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <section aria-label={`${product.name} photos`} className="min-w-0">
            <PhotoGallery key={product.id} images={images} name={product.name}/>
          </section>
          <section aria-labelledby="product-name" className="min-w-0 lg:pt-2">
            <p className="!mb-3 !text-sm font-bold uppercase tracking-[0.08em] !text-[#0d7464]">{category?.name ?? 'Medical equipment'}</p>
            <h1 id="product-name" className="!mb-4 !font-sans !text-[clamp(2rem,3.3vw,3rem)] !font-extrabold !leading-[1.17] !tracking-[-0.035em] !text-[#142b34]">{product.name}</h1>
            {product.summary && <p className="!mb-5 text-[16px] !leading-8 !text-slate-600">{product.summary}</p>}
            <dl className="mb-7 grid gap-4 border-y border-slate-200 py-5 text-[14px] sm:grid-cols-2">
              <div><dt className="mb-1 font-semibold !text-slate-500">SKU / Model</dt><dd className="m-0 break-words font-semibold !text-[#18313b]">{product.sku}</dd></div>
              <div><dt className="mb-1 font-semibold !text-slate-500">Category</dt><dd className="m-0 font-semibold !text-[#18313b]">{category?.name ?? 'Medical equipment'}</dd></div>
            </dl>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={addToQuote} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg !bg-[#0d5c4f] px-5 text-sm font-bold !text-white transition-colors hover:!bg-[#08483e]">{added ? <Check size={18}/> : <Plus size={18}/>} {added ? 'Added to quote list' : 'Add to quote list'}</button>
              <Link to="/request-quote" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-bold !text-[#163740] transition-colors hover:bg-slate-50">Request quotation <ArrowRight size={17}/></Link>
            </div>
            {quoteError && <p role="alert" className="!mt-4 !text-sm !text-red-700">{quoteError}</p>}
            <p className="!mt-6 text-[13px] !leading-6 !text-slate-500">Please confirm technical specifications, warranty, certifications, pricing and availability with ConXport before ordering.</p>
          </section>
        </div>

        <section aria-labelledby="overview-title" className="mt-12 border-t border-slate-200 pt-9 sm:mt-14">
          <h2 id="overview-title" className="!mb-5 !font-sans !text-[26px] !font-bold !tracking-tight !text-[#142b34]">Product overview</h2>
          <p className="max-w-[1000px] whitespace-pre-line break-words text-[16px] !leading-[1.9] !text-[#4e626c]">{overview}</p>
        </section>

        {related.length > 0 && <section aria-labelledby="related-title" className="mt-12 border-t border-slate-200 pt-9">
          <h2 id="related-title" className="!mb-5 !font-sans !text-[24px] !font-bold !text-[#142b34]">Related products</h2>
          <ul className="grid gap-x-12 sm:grid-cols-2">{related.map((item) => <li key={item.id} className="border-b border-slate-100 py-4"><Link to={`/products/${item.slug}`} className="group flex items-center justify-between gap-3 !text-[#18313b] hover:!text-[#0d5c4f]"><span className="min-w-0"><span className="block break-words text-[15px] font-semibold">{item.name}</span><span className="mt-1 block break-all text-xs !text-slate-500">{item.sku}</span></span><ArrowRight size={17} className="shrink-0 text-[#0d5c4f] transition-transform group-hover:translate-x-1"/></Link></li>)}</ul>
        </section>}

        <div className="mt-12 border-t border-slate-200 pt-7"><Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold !text-[#0d5c4f] hover:underline"><ArrowLeft size={17}/> Back to all products</Link></div>
      </div>
    </main>
  );
}
