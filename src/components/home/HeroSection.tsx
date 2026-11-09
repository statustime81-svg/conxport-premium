import { useEffect, useRef, useState } from 'react';
import { ArrowRight, MoveUpRight, ShieldCheck, Award, Layers3, Clock3, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router';
import Reveal from '../animations/Reveal';
import Parallax from '../animations/Parallax';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/** Accessible one-time count-up when a metric enters the viewport. */
function CountUp({ end, suffix = '', duration = 1600 }: { end: number; suffix?: string; duration?: number }) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    if (reduceMotion) {
      setValue(end);
      return;
    }

    let frame = 0;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const startedAt = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(Math.round(end * eased));
        if (progress < 1) frame = window.requestAnimationFrame(animate);
      };
      frame = window.requestAnimationFrame(animate);
    };

    if (typeof IntersectionObserver === 'undefined') {
      start();
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [duration, end, reduceMotion]);

  return (
    <span ref={elementRef} aria-label={`${end.toLocaleString('en-IN')}${suffix}`} className="tabular-nums">
      <span aria-hidden="true">{value.toLocaleString('en-IN')}{suffix}</span>
    </span>
  );
}

const metrics = [
  { icon: Award, prefix: 'ISO ', end: 13485, suffix: '', label: 'Quality certified' },
  { icon: BadgeCheck, label: 'Registered supplier', value: 'CDSCO' },
  { icon: Layers3, end: 500, suffix: '+', label: 'Equipment lines' },
  { icon: Clock3, end: 24, suffix: 'h', label: 'Quote turnaround' },
];

export default function HeroSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="conxport-hero-title"
      className="relative isolate overflow-hidden bg-[#FFFCF9] text-[#102D3C]"
    >
      <style>{`
        @keyframes cxHeroOrbit { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes cxHeroShine { 0%, 100% { opacity: .3; transform: scale(.94); } 50% { opacity: .65; transform: scale(1.06); } }
        .cx-hero-orbit { animation: cxHeroOrbit 30s linear infinite; }
        .cx-hero-glow { animation: cxHeroShine 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cx-hero-orbit, .cx-hero-glow { animation: none !important; }
        }
      `}</style>

      {/* Soft editorial background, without an image card or border. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_39%,rgba(108,220,211,.14),transparent_40%),radial-gradient(ellipse_at_5%_10%,rgba(255,107,49,.07),transparent_42%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[.2] bg-[linear-gradient(135deg,transparent_48%,rgba(4,60,80,.09)_49%,transparent_50%)] bg-[size:92px_92px] [mask-image:linear-gradient(to_right,transparent_30%,black)]" />

      <div className="relative z-10 mx-auto w-[min(1480px,calc(100%-36px))] sm:w-[min(1480px,calc(100%-64px))]">
        <div className="grid items-center gap-8 pb-9 pt-12 md:gap-6 lg:min-h-[620px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:py-14 xl:min-h-[720px]">
          <div className="relative z-20 max-w-[710px]">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D84312]/25 bg-white/75 px-4 py-2 shadow-[0_5px_20px_rgba(216,67,18,.06)] backdrop-blur-sm">
                <ShieldCheck size={15} strokeWidth={2.2} className="text-[#D84312]" />
                <span className="font-['Manrope',system-ui,sans-serif] text-[10px] font-extrabold uppercase tracking-[.17em] !text-[#123848] sm:text-[11px]">
                  Trusted hospital equipment partner
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 id="conxport-hero-title" className="!m-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(3.2rem,5.5vw,6.6rem)] font-normal leading-[1.04] tracking-[-.055em] !text-[#043C50]">
                Advanced hospital equipment
                <span className="mt-1 block italic !text-[#D84312]">for better patient outcomes.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="!mb-0 mt-7 max-w-[620px] font-['Manrope',system-ui,sans-serif] text-[clamp(15px,1.25vw,19px)] leading-[1.8] !text-[#51636D]">
                Hospital-grade equipment for ICUs, operation theatres, laboratories and diagnostics, sourced and delivered with quote-based pricing for institutions.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link to="/products" className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full !bg-[#D84312] px-6 py-3.5 font-['Manrope',system-ui,sans-serif] text-[13px] font-extrabold !text-white shadow-[0_14px_30px_-13px_rgba(216,67,18,.6)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:!bg-[#B9320A] hover:shadow-[0_19px_38px_-12px_rgba(216,67,18,.6)] sm:px-8 sm:text-[15px]">
                  Browse Equipment Catalogue
                  <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link to="/contact" className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-[#043C50]/25 bg-white/85 px-6 py-3.5 font-['Manrope',system-ui,sans-serif] text-[13px] font-extrabold !text-[#043C50] shadow-[0_8px_25px_-18px_rgba(4,60,80,.3)] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[#043C50] hover:bg-white sm:px-8 sm:text-[15px]">
                  Request a Quote
                  <MoveUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Free-floating PNG. No rounded box, card, background, border or caption. */}
          <div className="relative isolate flex min-h-[360px] w-full items-center justify-center sm:min-h-[460px] lg:min-h-[560px]">
            <div aria-hidden="true" className="cx-hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[65%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(17,192,183,.2),rgba(17,192,183,.04)_52%,transparent_72%)] blur-2xl" />
            <div aria-hidden="true" className="cx-hero-orbit pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[72%] w-[82%] rounded-full border border-[#37B6AE]/20 [transform:translate(-50%,-50%)]" />
            <Parallax distance={reduceMotion ? 0 : 24}>
              <img
                src="/images/medical-hero.png"
                alt="3D illustration of advanced hospital medical equipment"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                draggable={false}
                className="relative z-10 block h-auto max-h-[650px] w-full select-none object-contain drop-shadow-[0_35px_35px_rgba(4,60,80,.14)] transition-transform duration-700 ease-out hover:scale-[1.025]"
              />
            </Parallax>
          </div>
        </div>

        {/* Animated trust strip remains below hero, not inside an image card. */}
        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 gap-y-7 border-t border-[#043C50]/10 py-7 sm:py-9 lg:grid-cols-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className={`flex min-w-0 items-center gap-3 px-2 sm:gap-4 sm:px-5 ${index !== 0 ? 'lg:border-l lg:border-[#043C50]/10' : ''}`}>
                  <Icon size={29} strokeWidth={1.7} className="shrink-0 text-[#D84312] sm:h-9 sm:w-9" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="whitespace-nowrap font-['Manrope',system-ui,sans-serif] text-[clamp(17px,1.8vw,25px)] font-extrabold leading-none tracking-[-.04em] !text-[#043C50]">
                      {metric.value ?? <>{metric.prefix}<CountUp end={metric.end!} suffix={metric.suffix} duration={1600 + index * 120} /></>}
                    </div>
                    <p className="!mb-0 mt-2 font-['Manrope',system-ui,sans-serif] text-[9px] font-bold uppercase tracking-[.12em] !text-[#768792] sm:text-[10px]">{metric.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
