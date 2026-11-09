import { useEffect, useState, type PointerEvent } from 'react';
import { Sparkles } from 'lucide-react';
import { getHomeServices, type HomeService } from '../../services/homeServices';
import Reveal from '../animations/Reveal';

/**
 * Premium showcase for the existing Admin-managed Home Services.
 * Data contract stays unchanged: image_url and title from home_services.
 */
export default function HomeServicesSection() {
  const [services, setServices] = useState<HomeService[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    void getHomeServices()
      .then((data) => {
        if (active) setServices(data);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const tiltX = (0.5 - y) * 6;
    const tiltY = (x - 0.5) * 7;
    card.style.setProperty('--svc-rotate-x', `${tiltX.toFixed(2)}deg`);
    card.style.setProperty('--svc-rotate-y', `${tiltY.toFixed(2)}deg`);
    card.style.setProperty('--svc-pointer-x', `${(x * 100).toFixed(1)}%`);
    card.style.setProperty('--svc-pointer-y', `${(y * 100).toFixed(1)}%`);
  };

  const resetPointer = (event: PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty('--svc-rotate-x', '0deg');
    card.style.setProperty('--svc-rotate-y', '0deg');
    card.style.setProperty('--svc-pointer-x', '50%');
    card.style.setProperty('--svc-pointer-y', '50%');
  };

  if (error || services.length === 0) return null;

  return (
    <section
      id="our-services"
      aria-labelledby="home-services-heading"
      className="relative isolate overflow-hidden bg-[#FFF9F5] py-16 text-[#043C50] sm:py-20 lg:py-24"
    >
      <style>{`
        .cx-svc-3d-stage { perspective: 1300px; position: relative; }
        /* Hover Reveal: de-emphasize siblings; preserve the card's own 3D tilt. */
        .cx-svc-reveal-shell {
          position: relative;
          height: 100%;
          transition: transform .46s cubic-bezier(.2,.8,.2,1),
                      opacity .4s ease, filter .4s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .cx-svc-reveal-grid:hover .cx-svc-reveal-shell {
            transform: scale(.97);
            opacity: .58;
            filter: blur(2px) saturate(.82);
          }
          .cx-svc-reveal-grid:hover .cx-svc-reveal-shell:hover,
          .cx-svc-reveal-grid:hover .cx-svc-reveal-shell:focus-within {
            transform: scale(1.045);
            opacity: 1;
            filter: none;
            z-index: 4;
          }
          .cx-svc-reveal-grid .cx-svc-3d-stage:hover,
          .cx-svc-reveal-grid .cx-svc-3d-stage:focus-within {
            z-index: 5;
          }
        }
        .cx-svc-reveal-shell:focus-within {
          transform: scale(1.025);
          opacity: 1;
          filter: none;
          z-index: 4;
        }
        .cx-svc-3d-card:focus-visible {
          outline: 3px solid #F93E02;
          outline-offset: 3px;
        }

        .cx-svc-3d-card {
          --svc-rotate-x: 0deg;
          --svc-rotate-y: 0deg;
          --svc-pointer-x: 50%;
          --svc-pointer-y: 50%;
          transform: rotateX(var(--svc-rotate-x)) rotateY(var(--svc-rotate-y));
          transform-style: preserve-3d;
          will-change: transform;
          transition: transform .36s cubic-bezier(.2,.75,.2,1),
                      box-shadow .36s ease, border-color .36s ease;
        }
        .cx-svc-3d-card::before {
          content: '';
          position: absolute;
          z-index: 1;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: radial-gradient(400px circle at var(--svc-pointer-x) var(--svc-pointer-y), rgba(255,255,255,.46), transparent 60%);
          opacity: 0;
          transition: opacity .35s ease;
        }
        .cx-svc-3d-card:hover::before { opacity: 1; }
        .cx-svc-image {
          filter: drop-shadow(0 22px 18px rgba(4,60,80,.13));
          transition: transform .6s cubic-bezier(.2,.8,.2,1), filter .5s ease;
        }
        .cx-svc-3d-card:hover .cx-svc-image {
          transform: translateY(-10px) scale(1.055);
          filter: drop-shadow(0 30px 23px rgba(4,60,80,.21));
        }
        .cx-svc-orbit { transition: transform .65s cubic-bezier(.2,.8,.2,1); }
        .cx-svc-3d-card:hover .cx-svc-orbit { transform: translate(-50%, -50%) scale(1.12) rotate(10deg); }
        @media (hover: none), (pointer: coarse) {
          .cx-svc-3d-card { transform: none !important; will-change: auto; }
          .cx-svc-reveal-shell { transform: none !important; opacity: 1 !important; filter: none !important; }
          .cx-svc-3d-card:hover .cx-svc-image { transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cx-svc-3d-card, .cx-svc-3d-card::before, .cx-svc-image,
          .cx-svc-orbit, .cx-svc-reveal-shell { transition: none !important; animation: none !important; transform: none !important; filter: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div aria-hidden="true" className="pointer-events-none absolute -top-64 right-[-120px] h-[620px] w-[620px] rounded-full bg-[#d3e9ef]/50 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-72 left-[-130px] h-[520px] w-[520px] rounded-full bg-[#fce4dc]/35 blur-3xl" />

      <div className="container relative z-10 !max-w-[1440px]">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
            <div>
              <p className="!mb-4 inline-flex items-center gap-3 font-['Manrope',system-ui,sans-serif] text-[11px] font-extrabold uppercase tracking-[0.22em] !text-[#043C50]">
                <span className="h-[2px] w-8 rounded-full bg-[#D84312]" />
                WHAT WE OFFER
              </p>
              <h2
                id="home-services-heading"
                className="!m-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.8rem,5vw,5.2rem)] font-normal leading-[1.04] tracking-[-0.055em] !text-[#043C50]"
              >
                Our <span className="italic !text-[#D84312]">Services.</span>
              </h2>
              <p className="!mb-0 mt-4 max-w-2xl text-[15px] leading-7 !text-[#617784] sm:text-[16px]">
                Complete equipment solutions for modern healthcare environments.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cfdee4] bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#043C50] shadow-sm">
              <Sparkles size={15} className="text-[#D84312]" />
              OUR EXPERTISE
            </span>
          </div>
        </Reveal>

        <div className="cx-svc-reveal-grid grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={Math.min(index, 5) * 0.07} className="h-full cx-svc-3d-stage">
              <div className="cx-svc-reveal-shell">
              <article
                tabIndex={0}
                aria-label={service.title}
                onPointerMove={handlePointerMove}
                onPointerLeave={resetPointer}
                className="cx-svc-3d-card group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] border border-[#dbe8ef] bg-white shadow-[0_12px_36px_-22px_rgba(5,54,72,.22)] hover:border-[#a7c9d5] hover:shadow-[0_35px_80px_-33px_rgba(4,60,80,.35)]"
              >
                <div className="relative isolate flex aspect-[1.15/1] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_36%,#FFFFFF_0%,#E8F5F8_50%,#DCEBF2_100%)] p-4 sm:p-6">
                  <div aria-hidden="true" className="cx-svc-orbit pointer-events-none absolute left-1/2 top-1/2 h-[69%] w-[69%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c3dfe6]/70" />
                  <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[56%] h-[45%] w-[78%] -translate-x-1/2 rounded-full bg-[#B9D6DF]/25 blur-3xl" />

                  <span className="absolute left-5 top-5 z-10 inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-white/90 bg-white/90 px-2 text-[11px] font-extrabold tracking-[0.06em] text-[#043C50] shadow-[0_8px_22px_-13px_rgba(5,54,72,.4)] backdrop-blur-md">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="absolute right-5 top-5 z-10 inline-flex rounded-full border border-[#b9d9e0]/85 bg-white/65 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#043C50] backdrop-blur-md">
                    CONXPORT
                  </span>

                  <img
                    src={service.image_url}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="cx-svc-image relative z-[2] block h-full max-h-[360px] w-full max-w-full select-none object-contain"
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#a7c4cd]/70 to-transparent" />
                </div>

                <div className="relative z-[2] flex flex-1 items-center gap-4 px-5 py-6 sm:px-7 sm:py-7">
                  <div className="min-w-0">
                    <span className="mb-3 block h-[3px] w-10 rounded-full bg-[#D84312] transition-[width] duration-500 group-hover:w-16" />
                    <p className="!mb-1 text-[10px] font-extrabold uppercase tracking-[0.19em] !text-[#758c96]">
                      MEDICAL EQUIPMENT SOLUTIONS
                    </p>
                    <h3 className="!m-0 font-['Manrope',system-ui,sans-serif] text-[clamp(17px,1.45vw,22px)] font-extrabold leading-[1.35] tracking-[-0.035em] !text-[#043C50]">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
