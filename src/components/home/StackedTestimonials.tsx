import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote, Sparkles } from 'lucide-react';
import { safeImage, type ShowcaseItem } from '../../services/showcase';

type Props = { items: ShowcaseItem[] };

/** Interactive testimonial deck. Data remains in the existing site_showcase table. */
export default function StackedTestimonials({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const reducedMotion = useReducedMotion();
  const count = items.length;

  useEffect(() => {
    setIndex((value) => (count ? Math.min(value, count - 1) : 0));
  }, [count]);

  const navigate = (step: 1 | -1) => {
    if (count < 2) return;
    setDirection(step);
    setIndex((value) => (value + step + count) % count);
  };

  const current = count ? items[index] : null;
  const next = count > 1 ? items[(index + 1) % count] : null;
  const third = count > 2 ? items[(index + 2) % count] : null;

  return (
    <section id="testimonials" aria-labelledby="cx-testimonials-title" className="relative isolate overflow-hidden bg-[#F1F7FA] py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-44 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(7,84,107,0.10),transparent_68%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-[430px] w-[430px] rounded-full bg-[radial-gradient(circle,rgba(255,79,24,0.055),transparent_70%)]" />

      <div className="container relative z-10 !max-w-[1380px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16 xl:gap-24">
          <div className="max-w-[590px]">
            <div className="mb-7 inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.22em] !text-[#043C50]">
              <span className="h-[2px] w-9 rounded-full bg-[#F93E02]" />
              Customer experiences
            </div>
            <h2 id="cx-testimonials-title" className="!m-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(3.4rem,6vw,6.5rem)] font-normal leading-[0.99] tracking-[-0.055em] !text-[#043C50]">
              What our<br /><span className="italic !text-[#D84312]">clients say.</span>
            </h2>
            <p className="!mb-0 mt-7 max-w-[480px] font-['Manrope',system-ui,sans-serif] text-[15px] leading-[1.9] !text-[#596670] sm:text-[17px]">
              Feedback shared by customers and organisations who have worked with ConXport.
            </p>
            {count > 1 && (
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <div className="flex gap-3">
                  <button type="button" onClick={() => navigate(-1)} aria-label="Previous testimonial" className="grid h-13 w-13 place-items-center rounded-full border border-[#cadde4] bg-white !text-[#043C50] transition-all duration-300 hover:-translate-y-1 hover:!border-[#F93E02] hover:!bg-[#F93E02] hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F93E02]">
                    <ArrowLeft size={20} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => navigate(1)} aria-label="Next testimonial" className="grid h-13 w-13 place-items-center rounded-full bg-[#D84312] !text-white transition-all duration-300 hover:-translate-y-1 hover:!bg-[#F93E02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F93E02]">
                    <ArrowRight size={20} aria-hidden="true" />
                  </button>
                </div>
                <span className="font-['Manrope',system-ui,sans-serif] text-sm font-semibold tabular-nums !text-[#596670]">
                  <strong className="!text-[#043C50]">{String(index + 1).padStart(2, '0')}</strong>
                  <span className="mx-2 text-[#9bb0ba]">/</span>
                  {String(count).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>

          <div className="relative mx-auto w-full max-w-[670px] pb-10 pt-4 sm:px-8 sm:pb-14" aria-label="Customer testimonial cards" onKeyDown={(event) => { if (event.key === 'ArrowRight') { event.preventDefault(); navigate(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(-1); } }}>
            <div className="relative h-[435px] sm:h-[465px]" style={{ perspective: '1300px' }}>
              {count > 2 && third && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-5 h-[95%] rounded-[30px] border border-[#dce9ee] bg-[#cde2ea] opacity-70 shadow-[0_25px_50px_-30px_rgba(7,84,107,0.16)] sm:inset-x-12" style={{ transform: 'translate3d(20px, 28px, -95px) rotate(7deg) scale(.91)', transformOrigin: 'center bottom' }} />
              )}
              {count > 1 && next && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-3 h-[95%] rounded-[30px] border border-[#dce9ee] bg-[#e5f1f5] shadow-[0_30px_60px_-30px_rgba(7,84,107,0.18)] sm:inset-x-7" style={{ transform: 'translate3d(10px, 16px, -40px) rotate(3.5deg) scale(.965)', transformOrigin: 'center bottom' }} />
              )}
              {current ? (
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.article
                    key={current.id}
                    custom={direction}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: direction * 110, rotate: direction * 9, scale: 0.91 }}
                    animate={{ opacity: 1, x: 0, rotate: -1.2, scale: 1 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -150, rotate: direction * -12, scale: 0.92 }}
                    transition={reducedMotion ? { duration: 0.12 } : { type: 'spring', stiffness: 250, damping: 27, mass: 0.95 }}
                    drag={count > 1 && !reducedMotion ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.16}
                    onDragEnd={(_, info) => { if (info.offset.x < -65) navigate(1); else if (info.offset.x > 65) navigate(-1); }}
                    className="absolute inset-x-0 top-0 flex h-[96%] cursor-grab flex-col overflow-hidden rounded-[30px] border border-[#dce9ee] bg-white p-7 shadow-[0_40px_100px_-35px_rgba(7,84,107,0.22)] active:cursor-grabbing sm:p-10 lg:p-11"
                    style={{ touchAction: 'pan-y', transformStyle: 'preserve-3d' }}
                    aria-live="polite"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="grid h-14 w-14 place-items-center rounded-[18px] bg-[#E7F5F7] !text-[#043C50]">
                        <Quote size={27} strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#e2edf1] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] !text-[#043C50]">
                        <Sparkles size={13} aria-hidden="true" /> Client feedback
                      </span>
                    </div>
                    <blockquote className="mt-6 flex-1 overflow-y-auto pr-1 sm:mt-8">
                      <p className="!mb-0 whitespace-pre-wrap font-['DM_Serif_Display',Georgia,serif] text-[clamp(1.55rem,2.4vw,2.15rem)] leading-[1.38] !text-[#043C50]">
                        “{current.body}”
                      </p>
                    </blockquote>
                    <div className="mt-6 flex shrink-0 items-center gap-3 border-t border-[#e2edf1] pt-5">
                      {safeImage(current.media_url) ? (
                        <img src={safeImage(current.media_url)} alt="" loading="lazy" className="h-12 w-12 shrink-0 rounded-full border border-[#e2edf1] object-cover" />
                      ) : (
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#043C50] font-['Manrope',system-ui,sans-serif] text-lg font-bold !text-white">{current.title.charAt(0) || 'C'}</span>
                      )}
                      <div className="min-w-0">
                        <p className="!mb-0 truncate font-['Manrope',system-ui,sans-serif] text-[15px] font-extrabold !text-[#043C50]">{current.title}</p>
                        <p className="!mb-0 mt-1 font-['Manrope',system-ui,sans-serif] text-[12px] !text-[#596670]">ConXport customer</p>
                      </div>
                      <span className="ml-auto hidden text-[11px] font-bold uppercase tracking-[0.12em] !text-[#8ba1aa] sm:block">Customer review</span>
                    </div>
                  </motion.article>
                </AnimatePresence>
              ) : (
                <div className="absolute inset-0 grid place-items-center rounded-[30px] border border-[#dce9ee] bg-white px-8 text-center shadow-sm">
                  <p className="!m-0 font-['Manrope',system-ui,sans-serif] text-sm !text-[#596670]">Client reviews will appear here when published.</p>
                </div>
              )}
            </div>
            {count > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2" aria-label="Select testimonial">
                {items.map((item, dotIndex) => (
                  <button key={item.id} type="button" onClick={() => { setDirection(dotIndex >= index ? 1 : -1); setIndex(dotIndex); }} aria-label={`Show testimonial ${dotIndex + 1}`} aria-current={index === dotIndex ? 'true' : undefined} className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F93E02] ${index === dotIndex ? 'w-8 bg-[#F93E02]' : 'w-2.5 bg-[#b4cbd3] hover:bg-[#043C50]'}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
