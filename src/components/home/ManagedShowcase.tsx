import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Quote, Download, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { getShowcase, safeImage, youtubeEmbed, type ShowcaseItem, type ShowcaseKind } from '../../services/showcase';
const fallbackFaq=[
 ['How can I find medical equipment?','Browse our equipment categories or search the catalogue by product name.'],
 ['How do I request a quotation?','Open a product page and select Request Quote, or contact our team with your requirements.'],
 ['Are prices shown online?','Prices and availability are confirmed in a quotation based on your requirements.'],
 ['Can I request product documentation?','Yes. Tell us which equipment and documents you need when you submit your enquiry.']
];
export function useShowcase(kind:ShowcaseKind){const [items,setItems]=useState<ShowcaseItem[]>([]);useEffect(()=>{let active=true;getShowcase(kind).then(x=>{if(active)setItems(x)}).catch(()=>{});return()=>{active=false}},[kind]);return items;}
/** Two independently looping client-logo rows. Uses existing Supabase showcase records. */
export function ManagedClients() {
  const items = useShowcase('client');
  if (!items.length) return null;

  const midpoint = Math.ceil(items.length / 2);
  const rows = [items.slice(0, midpoint), items.slice(midpoint)];

  // Repeat short rows so the track is always wider than the screen.
  // Matching duplicate groups make the CSS -50% loop seamless.
  const fillRow = (row: ShowcaseItem[]) => {
    const source = row.length ? row : items;
    return Array.from({ length: Math.max(7, source.length) }, (_, i) => source[i % source.length]);
  };

  return (
    <section className="cx-client-marquee-section bg-white py-12 sm:py-14" aria-label="Our clients">
      <div className="container mb-8 text-center">
        <p className="!m-0 text-xs font-bold uppercase tracking-[0.2em] !text-slate-500">OUR CLIENTS</p>
      </div>
      <div className="cx-client-marquee-rows">
        {rows.map((row, rowIndex) => {
          if (!row.length) return null;
          const logos = fillRow(row);
          return (
            <div key={rowIndex} className="cx-client-marquee-viewport">
              <div className={`cx-client-marquee-track ${rowIndex === 0 ? 'cx-client-marquee-left' : 'cx-client-marquee-right'}`}>
                {[0, 1].map(copy => (
                  <div key={copy} className="cx-client-marquee-group" aria-hidden={copy === 1 ? true : undefined}>
                    {logos.map((x, index) => {
                      const image = safeImage(x.media_url);
                      return (
                        <div key={`${copy}-${index}-${x.id}`} className="cx-client-marquee-card" title={x.title}>
                          {image ? (
                            <img src={image} alt={copy === 0 ? x.title : ''} loading="lazy" decoding="async" />
                          ) : (
                            <span className="text-center text-sm font-bold text-slate-700">{x.title}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ManagedTestimonials() {
  const items = useShowcase('testimonial');
  const viewportRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const moving = items.length > 1;
  // Ensure each repeated carousel group is wider than the viewport, even with only 2 reviews.
  const displayItems = moving ? Array.from({ length: Math.max(5, items.length) }, (_, i) => items[i % items.length]) : items;

  // Three identical sets permit continuous navigation in both directions.
  // Moving the scroll position between identical sets is visually seamless.
  useEffect(() => {
    if (!moving) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const alignMiddle = () => {
      const unit = viewport.scrollWidth / 3;
      if (unit) viewport.scrollLeft = unit;
    };
    const frame = window.requestAnimationFrame(alignMiddle);
    const onResize = () => alignMiddle();
    window.addEventListener('resize', onResize);

    const timer = window.setInterval(() => {
      if (pausedRef.current || !viewport.isConnected) return;
      const card = viewport.querySelector<HTMLElement>('.cx-review-card');
      const group = viewport.querySelector<HTMLElement>('.cx-review-group');
      if (!card || !group) return;
      const gap = parseFloat(getComputedStyle(group).columnGap) || 18;
      viewport.scrollBy({ left: card.getBoundingClientRect().width + gap, behavior: 'smooth' });
    }, 3900);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.clearInterval(timer);
    };
  }, [moving, items.length]);

  const slide = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const card = viewport.querySelector<HTMLElement>('.cx-review-card');
    const group = viewport.querySelector<HTMLElement>('.cx-review-group');
    if (!card || !group) return;
    const gap = parseFloat(getComputedStyle(group).columnGap) || 18;
    viewport.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
  };

  const keepInMiddle = () => {
    const viewport = viewportRef.current;
    if (!viewport || !moving) return;
    const unit = viewport.scrollWidth / 3;
    if (!unit) return;
    // Reset outside the central copy, preserving the same visual position.
    if (viewport.scrollLeft >= unit * 2) viewport.scrollLeft -= unit;
    else if (viewport.scrollLeft <= 0) viewport.scrollLeft += unit;
  };

  return (
    <section className="cx-review-section overflow-hidden bg-white py-14 sm:py-20" id="testimonials">
      <div className="container text-center">
        <p className="!mb-0 text-xs font-extrabold uppercase tracking-[0.2em] !text-[#0d5c4f]">Customer experiences</p>
        <h2 className="!mb-0 mt-3 text-[clamp(2rem,3.4vw,3.5rem)] font-extrabold tracking-[-0.045em] !text-[#152b2b]">What Our Clients Say</h2>
        <p className="!mb-0 mx-auto mt-4 max-w-2xl text-sm leading-7 !text-slate-500">
          Feedback shared by customers and organisations who have worked with ConXport.
        </p>
      </div>

      {items.length ? (
        <>
          <div
            ref={viewportRef}
            className="cx-review-viewport mx-auto mt-9"
            aria-label="Customer testimonials carousel"
            onScroll={keepInMiddle}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
            onFocusCapture={() => { pausedRef.current = true; }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) pausedRef.current = false;
            }}
          >
            <div className="cx-review-track">
              {(moving ? [0, 1, 2] : [0]).map(copy => (
                <div className="cx-review-group" key={copy} aria-hidden={copy !== 1 && moving ? true : undefined}>
                  {displayItems.map((item, index) => (
                    <article key={`${copy}-${index}-${item.id}`} className={`cx-review-card ${index % 3 === 1 ? 'cx-review-card-blue' : 'cx-review-card-grey'}`}>
                      <Quote size={22} className="mb-4 text-[#0d5c4f]/70" aria-hidden="true" />
                      <p className="cx-review-text !mb-0 flex-1 whitespace-pre-wrap text-[14px] leading-[1.8] !text-[#31444a]">{item.body}</p>
                      <div className="mt-6 flex items-center gap-3 border-t border-slate-200/70 pt-4">
                        {safeImage(item.media_url) ? (
                          <img src={safeImage(item.media_url)} alt="" loading="lazy" className="h-11 w-11 shrink-0 rounded-full border-2 border-white object-cover shadow-sm" />
                        ) : (
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#dceee9] text-sm font-extrabold !text-[#0d5c4f]">{item.title.charAt(0) || 'C'}</span>
                        )}
                        <div className="min-w-0 text-left">
                          <p className="!mb-0 truncate text-sm font-extrabold !text-[#1c3036]">{item.title}</p>
                          <p className="!mb-0 mt-0.5 text-[11px] font-semibold !text-[#76868d]">ConXport customer</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {moving && (
            <div className="mt-7 flex items-center justify-center gap-4">
              <button type="button" onClick={() => slide(-1)} aria-label="Previous testimonial" className="cx-review-arrow cx-review-arrow-prev"><ArrowLeft size={20} /></button>
              <button type="button" onClick={() => slide(1)} aria-label="Next testimonial" className="cx-review-arrow cx-review-arrow-next"><ArrowRight size={20} /></button>
            </div>
          )}
        </>
      ) : (
        <p className="mt-8 text-center text-slate-500">Client reviews will appear here when published.</p>
      )}
    </section>
  );
}

export function ManagedFaq() {
  const items = useShowcase('faq');
  const questions = items.length
    ? items.map(x => ({ id: x.id, title: x.title, body: x.body }))
    : fallbackFaq.map(([title, body], i) => ({ id: String(i), title, body }));

  return (
    <section className="cx-faq-section overflow-hidden bg-[#f8fbfa] py-14 sm:py-20" id="faq">
      <div className="container">
        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-12 xl:gap-16">
          {/* Left: fixed editorial image, never pulled from FAQ records. */}
          <div className="cx-faq-image-entrance relative min-w-0">
            <div className="relative isolate overflow-hidden rounded-[28px] border border-[#dbe9e5] bg-[#e9f3f0] shadow-[0_20px_60px_-30px_rgba(13,92,79,0.28)]">
              <img
                src="/images/why-conxport/healthcare.png"
                alt="Hospital and healthcare equipment environment"
                loading="lazy"
                decoding="async"
                className="block h-[270px] w-full object-cover sm:h-[390px] lg:h-[500px] xl:h-[540px]"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#082e2b]/80 via-[#082e2b]/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] !text-white backdrop-blur-md">
                  CONXPORT SUPPORT
                </span>
                <p className="!mb-0 mt-4 max-w-sm text-[clamp(1.4rem,2.8vw,2.3rem)] font-extrabold leading-[1.18] tracking-[-0.04em] !text-white">
                  Answers to your equipment questions.
                </p>
              </div>
            </div>
            <p className="!mb-0 mt-4 text-sm leading-7 !text-slate-500">
              Need help choosing equipment or requesting a quotation? Our team can guide you.
            </p>
          </div>

          {/* Right: all FAQs from existing Supabase showcase records. */}
          <div className="min-w-0">
            <p className="!mb-0 text-xs font-extrabold uppercase tracking-[0.2em] !text-[#0d5c4f]">
              Frequently asked questions
            </p>
            <h2 className="!mb-0 mt-3 text-[clamp(2rem,3.3vw,3.4rem)] font-extrabold leading-[1.13] tracking-[-0.05em] !text-[#102c28]">
              How can we <span className="!text-[#0d7363]">help you?</span>
            </h2>
            <p className="!mb-0 mt-4 max-w-xl text-[15px] leading-7 !text-slate-600">
              Find clear answers about our product catalogue, quotations and documentation.
            </p>
            <div className="mt-8 space-y-3">
              {questions.map((x, index) => (
                <details
                  key={x.id}
                  className="cx-faq-item group overflow-hidden rounded-2xl border border-[#dbe7e4] bg-white shadow-[0_5px_20px_-15px_rgba(13,92,79,0.35)] transition-colors duration-300 hover:border-[#a9d0c5] open:border-[#80b9a9]"
                  style={{ animationDelay: `${Math.min(index, 9) * 85}ms` }}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-bold leading-6 !text-[#15352f] marker:hidden sm:px-6 [&::-webkit-details-marker]:hidden">
                    <span>{x.title}</span>
                    <span className="cx-faq-arrow grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#edf7f3] !text-[#0d5c4f]">
                      <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                    </span>
                  </summary>
                  <div className="cx-faq-answer border-t border-[#e5efeb] px-5 pb-5 pt-4 sm:px-6">
                    <p className="!m-0 whitespace-pre-wrap text-sm leading-7 !text-slate-600 sm:text-[15px]">{x.body}</p>
                  </div>
                </details>
              ))}
            </div>
            <div className="mt-7">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0d5c4f] px-6 py-3.5 text-sm font-bold !text-white transition hover:-translate-y-0.5 hover:bg-[#08483e]"
              >
                Ask another question <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ManagedCertificates(){const items=useShowcase('certificate');return <section className="bg-white py-20"><div className="container"><p className="text-xs font-bold uppercase tracking-widest text-[#0d5c4f]">ConXport credentials</p><h2 className="mt-2 text-3xl font-extrabold text-slate-900">Certificates & documentation</h2><p className="mt-3 max-w-2xl text-slate-600">Browse documents published by our team. Confirm applicable product requirements with us before ordering.</p><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{items.map(x=><article key={x.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">{safeImage(x.media_url) && !/\.pdf(?:[?#]|$)/i.test(x.media_url||'')?<img src={safeImage(x.media_url)} alt={x.title} className="aspect-[4/3] w-full object-contain bg-slate-50 p-3" loading="lazy"/>:<div className="grid aspect-[4/3] place-items-center bg-teal-50"><ShieldCheck size={48} className="text-teal-700"/></div>}<div className="p-5"><h3 className="font-bold text-slate-900">{x.title}</h3><p className="mt-2 text-sm text-slate-600">{x.body}</p>{safeImage(x.media_url)&&<a href={safeImage(x.media_url)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0d5c4f]">View / download <Download size={15}/></a>}</div></article>)}</div>{!items.length&&<p className="mt-8 text-slate-500">No certificates are published yet.</p>}</div></section>}
export function ManagedExpo(){const photos=useShowcase('expo_photo').slice(0,10);const videos=useShowcase('expo_video');return <main className="bg-white"><section className="bg-[#eff7f6] py-20"><div className="container"><p className="text-xs font-extrabold uppercase tracking-widest text-[#0d5c4f]">ConXport events</p><h1 className="mt-3 text-5xl font-black tracking-tight text-slate-900">Our Expo</h1><p className="mt-4 max-w-xl text-slate-600">Highlights from our exhibitions and industry events.</p></div></section><section className="container py-20"><h2 className="text-3xl font-extrabold text-slate-900">Our Expo Gallery</h2><div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">{photos.map(x=><figure key={x.id} className="group overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">{safeImage(x.media_url)?<img src={safeImage(x.media_url)} alt={x.title} loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"/>:<div className="aspect-square"/>}<figcaption className="p-3 text-sm font-semibold text-slate-700">{x.title}</figcaption></figure>)}</div>{!photos.length&&<p className="mt-6 text-slate-500">Expo photos will appear here when added by the admin.</p>}</section><section className="bg-[#f5f8fb] py-20"><div className="container"><h2 className="text-3xl font-extrabold text-slate-900">Our Reviews</h2><div className="mt-8 grid gap-6 md:grid-cols-2">{videos.map(x=>{const src=youtubeEmbed(x.media_url||'');return src?<article key={x.id} className="overflow-hidden rounded-2xl bg-white shadow-sm"><iframe className="aspect-video w-full" src={src} title={x.title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/><h3 className="p-5 font-semibold text-slate-900">{x.title}</h3></article>:null})}</div>{!videos.length&&<p className="mt-6 text-slate-500">YouTube reviews will appear here when published.</p>}</div></section></main>}
