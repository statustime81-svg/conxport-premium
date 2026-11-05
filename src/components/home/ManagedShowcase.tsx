import { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router';

import { createPortal } from 'react-dom';


import {
  ArrowUpRight,
  Download,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  X,
  FileText,
  ZoomIn,
  ZoomOut,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minus,
  Plus,
} from 'lucide-react';

import { getShowcase, safeImage, youtubeEmbed, type ShowcaseItem, type ShowcaseKind } from '../../services/showcase';

import StackedTestimonials from './StackedTestimonials';

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

  return <StackedTestimonials items={items} />;

}



export function ManagedFaq() {

  const items = useShowcase('faq');

  const questions = items.length

    ? items.map(x => ({ id: x.id, title: x.title, body: x.body }))

    : fallbackFaq.map(([title, body], i) => ({ id: String(i), title, body }));



  return (

    <section className="cx-faq-section relative isolate overflow-hidden bg-[#F1F7FA] py-[clamp(80px,9vw,130px)]" id="faq" aria-labelledby="cx-faq-heading">

      <div className="container relative z-10 !max-w-[1440px]">

        {/* Centered heading, matching ConXport typography and brand palette. */}

        <header className="mx-auto mb-12 max-w-[940px] text-center sm:mb-16">

          <p className="!mb-0 font-['Manrope',system-ui,sans-serif] text-[11px] font-extrabold uppercase tracking-[0.2em] !text-[#07546B]">

            Frequently asked questions

          </p>

          <h2 id="cx-faq-heading" className="!mb-0 mt-4 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.8rem,5.5vw,5.4rem)] font-normal leading-[1.05] tracking-[-0.055em] !text-[#102D3C]">

            How can we <span className="!text-[#07546B]">help you?</span>

          </h2>

          <p className="!mb-0 mx-auto mt-5 max-w-[680px] font-['Manrope',system-ui,sans-serif] text-[clamp(15px,1.35vw,18px)] leading-[1.8] !text-[#596670]">

            Find clear answers about our product catalogue, quotations and documentation.

          </p>

        </header>



        {/* Bigger FAQ accordion on the left, bigger existing image on the right. */}

        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1.13fr)_minmax(0,0.87fr)] lg:gap-12 xl:gap-16">

          <div className="flex min-w-0 flex-col justify-center">

            <div className="space-y-4 sm:space-y-5">

              {questions.map((x, index) => (

                <details

                  key={x.id}

                  className="cx-faq-item group overflow-hidden rounded-[20px] border border-[#d9e5ec] bg-white shadow-[0_12px_32px_-24px_rgba(7,84,107,0.3)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#9bc7d1] hover:shadow-[0_20px_44px_-28px_rgba(7,84,107,0.35)] open:border-[#91c2ce]"

                  style={{ animationDelay: `${Math.min(index, 9) * 85}ms` }}

                >

                  <summary className="flex min-h-[78px] cursor-pointer list-none items-center justify-between gap-5 px-6 py-6 font-['Manrope',system-ui,sans-serif] text-[15px] font-bold leading-[1.6] !text-[#102D3C] marker:hidden sm:min-h-[86px] sm:px-8 sm:text-[16px] [&::-webkit-details-marker]:hidden">

                    <span>{x.title}</span>

                    <span className="cx-faq-arrow grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E7F5F7] !text-[#07546B] transition-all duration-300 group-hover:bg-[#07546B] group-hover:!text-white">

                      <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />

                    </span>

                  </summary>

                  <div className="cx-faq-answer border-t border-[#e5efeb] px-6 pb-7 pt-5 sm:px-8">

                    <p className="!m-0 whitespace-pre-wrap font-['Manrope',system-ui,sans-serif] text-[15px] leading-[1.9] !text-[#596670]">{x.body}</p>

                  </div>

                </details>

              ))}

            </div>



            <div className="mt-8">

              <Link

                to="/contact"

                className="group inline-flex items-center gap-2.5 rounded-full bg-[#07546B] px-7 py-4 font-['Manrope',system-ui,sans-serif] text-sm font-bold !text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#053F52]"

              >

                Ask another question <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

              </Link>

            </div>

          </div>



          {/* Same image and copy as before, now large and on the right. */}

          <div className="relative min-w-0 self-start lg:sticky lg:top-[110px]">

            <div className="relative isolate h-[430px] overflow-hidden rounded-[30px] border border-[#dbe9e5] bg-[#e9f3f0] shadow-[0_30px_75px_-35px_rgba(7,84,107,0.3)] sm:h-[550px] lg:h-[670px]">

              <img

                src="/images/why-conxport/healthcare.png"

                alt="Hospital and healthcare equipment environment"

                loading="lazy"

                decoding="async"

                className="absolute inset-0 h-full w-full object-cover object-center" style={{ transform: 'none', transition: 'none', animation: 'none', pointerEvents: 'none' }} draggable={false}

              />

              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#082e2b]/85 via-[#082e2b]/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">

                <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] !text-white backdrop-blur-md">CONXPORT SUPPORT</span>

                <p className="!mb-0 mt-5 max-w-[420px] font-['Manrope',system-ui,sans-serif] text-[clamp(1.7rem,3vw,2.8rem)] font-extrabold leading-[1.17] tracking-[-0.04em] !text-white">

                  Answers to your equipment questions.

                </p>

                <p className="!mb-0 mt-4 max-w-[410px] text-[14px] leading-[1.8] !text-white/85">

                  Need help choosing equipment or requesting a quotation? Our team can guide you.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}



/** Public certificates gallery: image-focused cards, readable titles and scrollable lightbox. */

export function ManagedCertificates() {

  const items = useShowcase('certificate');

  const [preview, setPreview] = useState<ShowcaseItem | null>(null);

  const [zoom, setZoom] = useState(1);

  const previewScrollRef = useRef<HTMLDivElement>(null);



  const openPreview = (item: ShowcaseItem) => {

    setZoom(1);

    setPreview(item);

  };



  useEffect(() => {

    if (!preview) return;

    // Lock the underlying page, not the scrollable certificate viewer.

    const oldOverflow = document.body.style.overflow;

    const oldHtmlOverflow = document.documentElement.style.overflow;

    const oldPadding = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';

    document.documentElement.style.overflow = 'hidden';

    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (event: KeyboardEvent) => {

      if (event.key === 'Escape') setPreview(null);

    };

    window.addEventListener('keydown', onKeyDown);

    return () => {

      document.body.style.overflow = oldOverflow;

      document.documentElement.style.overflow = oldHtmlOverflow;

      document.body.style.paddingRight = oldPadding;

      window.removeEventListener('keydown', onKeyDown);

    };

  }, [preview]);



  const changeZoom = (direction: -1 | 1) => {

    setZoom(current => Math.max(1, Math.min(3, Math.round((current + direction * 0.25) * 100) / 100)));

  };



  const scrollCertificate = (direction: -1 | 1) => {

    previewScrollRef.current?.scrollBy({ top: direction * 420, behavior: 'smooth' });

  };



  const downloadCertificate = async (item: ShowcaseItem) => {

    const url = safeImage(item.media_url);

    if (!url) return;

    try {

      const response = await fetch(url);

      if (!response.ok) throw new Error('Certificate download unavailable');

      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      const fileUrl = new URL(url, window.location.href);

      const extension = fileUrl.pathname.split('.').pop()?.toLowerCase();

      const ext = ['pdf', 'png', 'jpg', 'jpeg', 'webp'].includes(extension || '') ? extension : (blob.type.includes('pdf') ? 'pdf' : 'png');

      const baseName = item.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'certificate';

      const anchor = document.createElement('a');

      anchor.href = blobUrl;

      anchor.download = `${baseName}.${ext}`;

      document.body.appendChild(anchor);

      anchor.click();

      anchor.remove();

      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

    } catch {

      window.open(url, '_blank', 'noopener,noreferrer');

    }

  };



  const previewUrl = preview ? safeImage(preview.media_url) : '';

  const previewIsPdf = /\.pdf(?:[?#]|$)/i.test(previewUrl);



  return (

    <section className="bg-white py-14 sm:py-20">

      <style>{`

        @keyframes cxCertificateEnter { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }

        @keyframes cxCertificateModal { from { opacity: 0; transform: translateY(26px) scale(.965); } to { opacity: 1; transform: translateY(0) scale(1); } }

        @keyframes cxCertificateBackdrop { from { opacity: 0; } to { opacity: 1; } }

        @keyframes cxCertificateImageReveal { from { opacity: 0; transform: translateY(12px) scale(.975); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .cx-certificate-backdrop { animation: cxCertificateBackdrop .24s ease-out both; }

        .cx-certificate-image { animation: cxCertificateImageReveal .42s cubic-bezier(.2,.7,.1,1) both; }

        .cx-certificate-card { animation: cxCertificateEnter .6s ease-out both; }

        .cx-certificate-modal { animation: cxCertificateModal .22s ease-out both; }

        @media (prefers-reduced-motion: reduce) { .cx-certificate-card, .cx-certificate-modal, .cx-certificate-backdrop, .cx-certificate-image { animation: none !important; } }

      `}</style>

      <div className="container">

        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#07546B]">ConXport credentials</p>

        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Certificates &amp; documentation</h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">Browse documents published by our team. Confirm applicable product requirements with us before ordering.</p>



        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {items.map((item, index) => {

            const url = safeImage(item.media_url);

            const isPdf = /\.pdf(?:[?#]|$)/i.test(url);

            return (

              <article

                key={item.id}

                style={{ animationDelay: `${Math.min(index, 9) * 75}ms` }}

                className="cx-certificate-card group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,.04)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_20px_45px_rgba(15,23,42,.12)]"

              >

                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f7f9fa]">

                  {url ? (

                    <button

                      type="button"

                      onClick={() => openPreview(item)}

                      className="absolute inset-0 flex h-full w-full items-center justify-center p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-teal-600"

                      aria-label={`Open full certificate: ${item.title}`}

                    >

                      {isPdf ? (

                        <span className="flex flex-col items-center gap-2 text-[#07546B]"><FileText size={66} strokeWidth={1.5} /><span className="text-xs font-semibold">View PDF certificate</span></span>

                      ) : (

                        <img src={url} alt={item.title} loading="lazy" decoding="async" className="block h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]" />

                      )}

                    </button>

                  ) : (

                    <div className="flex h-full flex-col items-center justify-center gap-2 text-[#07546B]"><ShieldCheck size={65} strokeWidth={1.5} /><span className="text-xs font-semibold">Certificate document</span></div>

                  )}

                  {url && (

                    <button

                      type="button"

                      onClick={() => void downloadCertificate(item)}

                      aria-label={`Download ${item.title}`}

                      title={`Download ${item.title}`}

                      className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/90 bg-white/95 text-[#07546B] shadow-[0_4px_14px_rgba(0,0,0,.12)] transition-transform duration-200 hover:scale-110 hover:bg-[#07546B] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"

                    ><Download size={19} strokeWidth={2.2} /></button>

                  )}

                </div>

                {/* Name is OUTSIDE the certificate image so it stays readable and never overlaps the document. */}

                <div className="flex min-h-[58px] items-center border-t border-slate-100 bg-white px-4 py-3">

                  <p

                    title={item.title}

                    className="!m-0 w-full min-w-0 !font-sans !text-[14px] !font-semibold !leading-[20px] !tracking-normal !text-slate-800"

                    style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', overflowWrap: 'anywhere' }}

                  >

                    {item.title}

                  </p>

                </div>

              </article>

            );

          })}

        </div>

        {!items.length && <p className="mt-8 text-sm text-slate-500">No certificates are published yet.</p>}

      </div>



      {preview && previewUrl && createPortal(

        <div

          role="dialog"

          aria-modal="true"

          aria-label={`Certificate preview: ${preview.title}`}

          className="cx-certificate-backdrop fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/85 p-2 backdrop-blur-sm sm:p-5"

          onMouseDown={event => { if (event.target === event.currentTarget) setPreview(null); }}

        >

          <div className="cx-certificate-modal flex h-[96dvh] max-h-[96dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:h-[94dvh] sm:max-h-[94dvh]">

            <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-3 py-3 sm:px-5">

              <p className="!m-0 min-w-0 flex-1 !font-sans !text-[14px] !font-semibold !leading-5 !text-slate-900 sm:!text-[15px]">{preview.title}</p>

              <div className="flex shrink-0 items-center gap-1 sm:gap-2">

                {!previewIsPdf && (

                  <>

                    <button type="button" onClick={() => changeZoom(-1)} disabled={zoom <= 1} aria-label="Zoom out" title="Zoom out" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40"><ZoomOut size={17} /></button>

                    <span className="w-10 text-center text-xs font-semibold tabular-nums text-slate-600">{Math.round(zoom * 100)}%</span>

                    <button type="button" onClick={() => changeZoom(1)} disabled={zoom >= 3} aria-label="Zoom in" title="Zoom in" className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40"><ZoomIn size={17} /></button>

                    <button type="button" onClick={() => scrollCertificate(-1)} aria-label="Scroll certificate up" title="Scroll up" className="hidden h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 sm:grid"><ChevronUp size={18} /></button>

                    <button type="button" onClick={() => scrollCertificate(1)} aria-label="Scroll certificate down" title="Scroll down" className="hidden h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 sm:grid"><ChevronDown size={18} /></button>

                  </>

                )}

                <button type="button" onClick={() => void downloadCertificate(preview)} title="Download certificate" aria-label={`Download ${preview.title}`} className="grid h-9 w-9 place-items-center rounded-lg bg-[#07546B] text-white hover:bg-[#053F52]"><Download size={17} /></button>

                <button type="button" onClick={() => setPreview(null)} title="Close preview" aria-label="Close certificate preview" className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"><X size={19} /></button>

              </div>

            </div>

            <div

              key={preview.id}

              ref={previewScrollRef}

              className="min-h-0 flex-1 overflow-auto overscroll-contain bg-[#edf2f4] p-3 sm:p-6"

              style={{ WebkitOverflowScrolling: 'touch' }}

              tabIndex={0}

              aria-label="Scrollable full certificate"

            >

              {previewIsPdf ? (

                <iframe title={preview.title} src={previewUrl} className="h-full min-h-[65vh] w-full rounded-lg border-0 bg-white shadow-sm" />

              ) : (

                <div

                  className={zoom === 1 ? 'flex h-full min-h-[300px] w-full items-center justify-center' : 'flex min-h-full min-w-full items-start justify-center'}

                >

                  <img

                    src={previewUrl}

                    alt={preview.title}

                    draggable={false}

                    className="cx-certificate-image block shrink-0 rounded-md bg-white object-contain shadow-[0_12px_45px_rgba(15,23,42,.16)]"

                    style={zoom === 1

                      ? { width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }

                      : { width: `${Math.round(zoom * 100)}%`, height: 'auto', maxWidth: 'none', maxHeight: 'none' }}

                  />

                </div>

              )}

            </div>

            <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-2 text-center text-xs text-slate-500">

              {previewIsPdf ? 'Scroll inside the document to view all pages.' : 'Full certificate fits in the preview. Zoom in for details, then scroll to explore. Press Esc to close.'}

            </div>

          </div>

        </div>,

        document.body

      )}

    </section>

  );

}





// Expo photos & product demonstrations share the same existing Supabase showcase records.

// All styling is local to this file; no new routes, tables or CSS files are required.

type ExpoPlayer = {

  playVideo: () => void;

  pauseVideo: () => void;

  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;

  mute: () => void;

  unMute: () => void;

  setVolume: (volume: number) => void;

  getVolume: () => number;

  getCurrentTime: () => number;

  getDuration: () => number;

  getPlayerState: () => number;

  destroy: () => void;

};

type ExpoYT = { Player: new (element: HTMLElement, config: {

  videoId: string;

  playerVars: Record<string, number | string>;

  events: {

    onReady: (event: { target: ExpoPlayer }) => void;

    onStateChange: (event: { data: number }) => void;

  };

}) => ExpoPlayer };

type ExpoYTWindow = Window & { YT?: ExpoYT; onYouTubeIframeAPIReady?: () => void };

let expoYTLoading: Promise<ExpoYT> | undefined;

function loadExpoYoutube(): Promise<ExpoYT> {

  if (expoYTLoading) return expoYTLoading;

  expoYTLoading = new Promise<ExpoYT>((resolve, reject) => {

    const w = window as ExpoYTWindow;

    if (w.YT?.Player) { resolve(w.YT); return; }

    const previousReady = w.onYouTubeIframeAPIReady;

    w.onYouTubeIframeAPIReady = () => {

      previousReady?.();

      if (w.YT?.Player) resolve(w.YT);

      else reject(new Error('YouTube player is unavailable'));

    };

    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');

    if (!existing) {

      const script = document.createElement('script');

      script.src = 'https://www.youtube.com/iframe_api';

      script.async = true;

      script.onerror = () => reject(new Error('Unable to load YouTube player'));

      document.head.appendChild(script);

    }

  }).catch(error => { expoYTLoading = undefined; throw error; });

  return expoYTLoading;

}

function expoYoutubeId(url: string | null): string | null {

  if (!url) return null;

  const embed = youtubeEmbed(url);

  if (!embed) return null;

  const match = embed.match(/\/embed\/([a-zA-Z0-9_-]{11})/);

  return match?.[1] || null;

}

function expoTimestamp(seconds: number): string {

  const total = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));

  const minutes = Math.floor(total / 60);

  return `${minutes}:${String(total % 60).padStart(2, '0')}`;

}

function lockExpoBackground(onClose: () => void) {

  const previous = document.body.style.overflow;

  document.body.style.overflow = 'hidden';

  const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };

  window.addEventListener('keydown', handleKey);

  return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', handleKey); };

}



function ExpoVideoViewer({ item, onClose }: { item: ShowcaseItem; onClose: () => void }) {

  const playerNode = useRef<HTMLDivElement>(null);

  const screenNode = useRef<HTMLDivElement>(null);

  const player = useRef<ExpoPlayer | null>(null);

  const [playing, setPlaying] = useState(false);

  const [muted, setMuted] = useState(false);

  const [volume, setVolume] = useState(75);

  const [duration, setDuration] = useState(0);

  const [elapsed, setElapsed] = useState(0);

  const [error, setError] = useState('');

  const id = expoYoutubeId(item.media_url);

  useEffect(() => lockExpoBackground(onClose), [onClose]);

  useEffect(() => {

    let alive = true;

    const createdRef: { current: ExpoPlayer | null } = { current: null };

    if (!id || !playerNode.current) return;

    const node = playerNode.current;

    loadExpoYoutube().then(YT => {

      if (!alive) return;

      const target = document.createElement('div');

      node.replaceChildren(target);

      createdRef.current = new YT.Player(target, {

        videoId: id,

        playerVars: { autoplay: 1, controls: 0, rel: 0, playsinline: 1, origin: window.location.origin },

        events: {

          onReady: event => {

            if (!alive) return;

            player.current = event.target;

            event.target.setVolume(75);

            setDuration(event.target.getDuration() || 0);

            event.target.playVideo();

          },

          onStateChange: event => { if (alive) setPlaying(event.data === 1); },

        },

      });

    }).catch(() => { if (alive) setError('Video could not be loaded.'); });

    return () => { alive = false; player.current = null; try { createdRef.current?.destroy(); } catch { /* player may be uninitialized */ } node.replaceChildren(); };

  }, [id]);

  useEffect(() => {

    const interval = window.setInterval(() => {

      if (!player.current) return;

      try { setElapsed(player.current.getCurrentTime() || 0); setDuration(player.current.getDuration() || 0); } catch { /* unloaded player */ }

    }, 400);

    return () => window.clearInterval(interval);

  }, []);

  const togglePlay = () => { if (!player.current) return; if (playing) player.current.pauseVideo(); else player.current.playVideo(); };

  const toggleMute = () => { if (!player.current) return; if (muted) player.current.unMute(); else player.current.mute(); setMuted(!muted); };

  const adjustVolume = (next: number) => { setVolume(next); player.current?.setVolume(next); if (next > 0 && muted) { player.current?.unMute(); setMuted(false); } };

  return createPortal(

    <div role="dialog" aria-modal="true" aria-label={`Product demonstration: ${item.title}`} className="cx-expo-overlay fixed inset-0 z-[100000] flex items-center justify-center bg-[#03151e]/90 p-3 backdrop-blur-md sm:p-6" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>

      <div className="cx-expo-reveal flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] border border-white/15 bg-[#081f29] text-white shadow-2xl">

        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">

          <span className="text-xs font-bold uppercase tracking-[0.16em] text-teal-200">Product demonstration</span>

          <button type="button" onClick={onClose} aria-label="Close video" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"><X size={19}/></button>

        </div>

        <div className="min-h-0 overflow-y-auto overscroll-contain">

          <div ref={screenNode} className="relative aspect-video bg-black">

            <div ref={playerNode} className="absolute inset-0 [&>iframe]:!h-full [&>iframe]:!w-full"/>

            {error && <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white">{error}</div>}

          </div>

          <div className="border-b border-white/10 bg-[#0a2731] px-4 py-3 sm:px-5">

            <input type="range" aria-label="Seek video" min={0} max={Math.max(duration, 1)} step={0.5} value={Math.min(elapsed, Math.max(duration, 1))} onChange={e => { const next = Number(e.target.value); player.current?.seekTo(next, true); setElapsed(next); }} className="block w-full accent-teal-400"/>

            <div className="mt-2 flex flex-wrap items-center gap-3">

              <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'} className="grid h-9 w-9 place-items-center rounded-lg bg-teal-600 hover:bg-teal-500">{playing ? <Pause size={18}/> : <Play size={18}/>}</button>

              <button type="button" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20">{muted || volume === 0 ? <VolumeX size={18}/> : <Volume2 size={18}/>}</button>

              <button type="button" onClick={() => adjustVolume(Math.max(0, volume - 10))} aria-label="Volume down" className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 hover:bg-white/20"><Minus size={16}/></button>

              <input aria-label="Volume" type="range" min={0} max={100} step={1} value={volume} onChange={e => adjustVolume(Number(e.target.value))} className="w-16 accent-teal-400 sm:w-24"/>

              <button type="button" onClick={() => adjustVolume(Math.min(100, volume + 10))} aria-label="Volume up" className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 hover:bg-white/20"><Plus size={16}/></button>

              <span className="text-xs tabular-nums text-white/70">{expoTimestamp(elapsed)} / {expoTimestamp(duration)}</span>

              <div className="flex-1"/>

              <button type="button" onClick={() => { void screenNode.current?.requestFullscreen?.(); }} aria-label="Fullscreen video" title="Fullscreen" className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20"><Maximize size={18}/></button>

            </div>

          </div>

          <div className="space-y-3 p-5 sm:p-7">

            <h3 className="!m-0 !font-sans !text-xl !font-bold !leading-snug !text-white sm:!text-2xl">{item.title}</h3>

            {item.body && <p className="!m-0 whitespace-pre-wrap text-sm leading-7 !text-slate-300">{item.body}</p>}

          </div>

        </div>

      </div>

    </div>, document.body

  );

}



export function ManagedExpo() {

  const photos = useShowcase('expo_photo');

  const videos = useShowcase('expo_video');

  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  const [activeVideo, setActiveVideo] = useState<ShowcaseItem | null>(null);

  const closePhoto = () => setPhotoIndex(null);

  const closeVideo = () => setActiveVideo(null);

  useEffect(() => {

    if (photoIndex === null) return;

    return lockExpoBackground(closePhoto);

  }, [photoIndex]);

  useEffect(() => {

    if (photoIndex === null) return;

    const onKey = (event: KeyboardEvent) => {

      if (event.key === 'ArrowRight') setPhotoIndex(index => index === null ? null : (index + 1) % photos.length);

      if (event.key === 'ArrowLeft') setPhotoIndex(index => index === null ? null : (index - 1 + photos.length) % photos.length);

    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);

  }, [photoIndex, photos.length]);

  const photo = photoIndex === null ? null : photos[photoIndex];

  return <main className="bg-white">

    <style>{`

      @keyframes cxExpoRise {from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}

      @keyframes cxExpoOverlay {from{opacity:0}to{opacity:1}}

      @keyframes cxExpoReveal {from{opacity:0;transform:translateY(18px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}

      .cx-expo-card{animation:cxExpoRise .65s cubic-bezier(.2,.7,.2,1) both}

      .cx-expo-overlay{animation:cxExpoOverlay .22s ease both}

      .cx-expo-reveal{animation:cxExpoReveal .35s cubic-bezier(.18,.8,.2,1) both}

      @media(prefers-reduced-motion:reduce){.cx-expo-card,.cx-expo-overlay,.cx-expo-reveal{animation:none!important;transition:none!important}}

    `}</style>

    <section className="relative overflow-hidden bg-[#f0f8f6] py-16 sm:py-20">

      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 h-96 w-96 rounded-full bg-[#ccebe5]/60 blur-3xl"/>

      <div className="container relative">

        <p className="!mb-0 text-[11px] font-extrabold uppercase tracking-[.22em] !text-[#0c705e]">ConXport events</p>

        <h1 className="!mb-0 mt-3 font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-.045em] !text-[#101d30]">Our Expo</h1>

        <p className="!mb-0 mt-4 max-w-2xl text-sm leading-7 !text-slate-600 sm:text-base">Explore moments from our exhibitions, product showcases and live equipment demonstrations.</p>

      </div>

    </section>

    <section className="container py-14 sm:py-20" aria-labelledby="expo-gallery-heading">

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">

        <div><p className="!mb-0 text-[11px] font-bold uppercase tracking-[.2em] !text-[#0d7664]">Moments from our events</p><h2 id="expo-gallery-heading" className="!mb-0 mt-2 font-serif text-[clamp(1.9rem,3vw,2.8rem)] !font-bold !text-[#102536]">Our Expo Gallery</h2></div>

        <p className="!mb-0 text-sm !text-slate-500">Select any image to explore</p>

      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-4">

        {photos.map((item, i) => {

          const url = safeImage(item.media_url);

          if (!url) return null;

          return <button key={item.id} type="button" style={{animationDelay:`${Math.min(i, 10)*55}ms`}} onClick={() => setPhotoIndex(i)} aria-label={`View exhibition image ${i+1} of ${photos.length}`} className="cx-expo-card group relative block aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-[#f1f6f7] shadow-[0_8px_28px_-20px_rgba(15,45,55,.3)] transition-all duration-500 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_18px_35px_-18px_rgba(15,45,55,.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">

            <img src={url} alt={`ConXport exhibition photo ${i+1}`} loading={i<4?'eager':'lazy'} decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"/>

            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#062827]/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"/>

            <span className="pointer-events-none absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/95 text-[#07546B] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ZoomIn size={17}/></span>

          </button>;

        })}

      </div>

      {!photos.length && <p className="mt-6 text-sm text-slate-500">Expo photos will appear here when published.</p>}

    </section>

    <section className="bg-[#f3f8fa] py-16 sm:py-20" aria-labelledby="expo-videos-heading">

      <div className="container">

        <div className="mb-9 max-w-3xl"><p className="!mb-0 text-[11px] font-bold uppercase tracking-[.2em] !text-[#0d7664]">See our products in action</p><h2 id="expo-videos-heading" className="!mb-0 mt-2 font-serif text-[clamp(1.9rem,3vw,2.8rem)] !font-bold !text-[#102536]">Product Demonstrations &amp; Tutorials</h2><p className="!mb-0 mt-3 text-sm leading-7 !text-slate-600">Watch product demonstrations, explore features and learn how ConXport equipment works.</p></div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {videos.map((item, i) => {

            const id = expoYoutubeId(item.media_url);

            if (!id) return null;

            return <article key={item.id} style={{animationDelay:`${Math.min(i,10)*50}ms`}} className="cx-expo-card group min-w-0 overflow-hidden rounded-[22px] border border-[#dce6e8] bg-white shadow-[0_12px_35px_-30px_rgba(15,45,60,.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_-30px_rgba(15,45,60,.5)]">

              <button type="button" onClick={() => setActiveVideo(item)} className="relative block aspect-video w-full overflow-hidden bg-[#0c2838] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600" aria-label={`Play product video: ${item.title}`}>

                <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>

                <span className="absolute inset-0 bg-[#031924]/25 transition group-hover:bg-[#031924]/35"/>

                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/90 text-[#0b6355] shadow-xl transition duration-300 group-hover:scale-110 group-hover:bg-white"><Play size={24} fill="currentColor" className="ml-1"/></span>

                <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-black/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">Watch demonstration</span>

              </button>

              <div className="p-5"><h3 className="!m-0 !font-sans !text-base !font-bold !leading-6 !tracking-normal !text-[#142c36]" style={{display:'-webkit-box',WebkitBoxOrient:'vertical',WebkitLineClamp:2,overflow:'hidden'}}>{item.title}</h3><p className="!mb-0 mt-2 text-sm leading-6 !text-slate-500" style={{display:'-webkit-box',WebkitBoxOrient:'vertical',WebkitLineClamp:2,overflow:'hidden'}}>{item.body || 'Watch the full equipment demonstration and learn more about this product.'}</p><button type="button" onClick={() => setActiveVideo(item)} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#07546B] hover:text-[#083c34]">Watch video <ArrowUpRight size={16}/></button></div>

            </article>;

          })}

        </div>

        {!videos.length && <p className="mt-6 text-sm text-slate-500">Product demonstrations will appear here when published.</p>}

      </div>

    </section>

    {photo && photoIndex !== null && createPortal(

      <div role="dialog" aria-modal="true" aria-label={`Expo image ${photoIndex+1} of ${photos.length}`} className="cx-expo-overlay fixed inset-0 z-[100000] flex items-center justify-center bg-[#04141d]/95 p-3 backdrop-blur-lg sm:p-6" onMouseDown={event => {if(event.target===event.currentTarget) closePhoto();}}>

        <div className="cx-expo-reveal relative flex h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#081a24] shadow-2xl">

          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white"><span className="text-xs font-semibold tracking-widest text-white/75">{photoIndex+1} / {photos.length}</span><button type="button" onClick={closePhoto} aria-label="Close photo" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"><X size={19}/></button></div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto p-2 sm:p-5">

            <img key={photo.id} src={safeImage(photo.media_url)} alt={`ConXport exhibition photograph ${photoIndex+1}`} className="cx-expo-reveal block max-h-full max-w-full object-contain"/>

            {photos.length>1 && <><button type="button" onClick={() => setPhotoIndex((photoIndex-1+photos.length)%photos.length)} aria-label="Previous photo" className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80 sm:left-5"><ArrowLeft size={20}/></button><button type="button" onClick={() => setPhotoIndex((photoIndex+1)%photos.length)} aria-label="Next photo" className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80 sm:right-5"><ArrowRight size={20}/></button></>}

          </div>

          <p className="!m-0 shrink-0 border-t border-white/10 px-4 py-3 text-center text-xs !text-white/60">Use ← → keys to browse • Esc to close</p>

        </div>

      </div>, document.body

    )}

    {activeVideo && <ExpoVideoViewer key={activeVideo.id} item={activeVideo} onClose={closeVideo}/>}

  </main>;

}
