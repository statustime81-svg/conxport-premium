
import { ArrowRight, MoveUpRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import Reveal from '../animations/Reveal';
import Parallax from '../animations/Parallax';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function HeroSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="conxport-hero-title"
      className="
        relative isolate overflow-hidden
        min-h-[min(880px,100svh)]
        text-[#102D3C]
        bg-white
      "
    >
      {/* Top accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px]
                   bg-[linear-gradient(90deg,#07546B_0%,#1a8a76_50%,#07546B_100%)]"
      />

      {/* Soft teal wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[28%] -left-[14%] z-0
                   h-[68vw] w-[68vw]
                   bg-[radial-gradient(circle,rgba(13,92,79,0.07),transparent_60%)]"
      />

      {/* Faint grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.30]
                   bg-[linear-gradient(#102D3C_1px,transparent_1px),linear-gradient(90deg,#102D3C_1px,transparent_1px)]
                   bg-[size:56px_56px]
                   [mask-image:radial-gradient(ellipse_60%_50%_at_80%_30%,#000_20%,transparent_75%)]"
      />

      <div
        className="
          relative z-10 mx-auto
          w-[min(1480px,calc(100%-48px))]
          grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))]
          items-center
          gap-[clamp(32px,4vw,72px)]
          pt-[clamp(40px,5.5vw,84px)]
          pb-[clamp(48px,6vw,96px)]
        "
      >
        {/* LEFT SIDE CONTENT */}
        <div className="relative max-w-[860px]">
          <Reveal>
            <div
              className="
                mb-6 inline-flex items-center gap-2.5 rounded-full
                border border-[#07546B]/20 bg-[#07546B]/[0.04]
                px-4 py-2
              "
            >
              <ShieldCheck
                size={14}
                className="text-[#07546B]"
                strokeWidth={2.4}
              />
              <span
                className="text-[11px] font-bold uppercase
                           tracking-[0.20em] text-[#07546B]"
              >
                Trusted by 200+ hospitals
              </span>
            </div>
          </Reveal>

          {/* Main Headline */}
          <Reveal delay={0.08}>
            <h1
              id="conxport-hero-title"
              className="
                m-0 text-[clamp(3.75rem,9.5vw,10.5rem)]
                font-extrabold leading-[0.9] tracking-[-0.055em]
                text-[#102D3C] font-['Manrope',system-ui,sans-serif]
              "
            >
              Medical
              <br />
              equipment,
              <br />
              <span className="text-[#07546B]">
                delivered.
              </span>
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.14}>
            <p
              className="
                mt-6 mb-8 max-w-[640px]
                text-[clamp(1.1rem,1.7vw,1.4rem)] font-normal
                leading-[1.65] text-[#4a5560]
              "
            >
              Hospital-grade equipment for ICUs, operation theatres,
              laboratories and diagnostics — sourced, certified and delivered
              with quote-based pricing for institutions.
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="
                  group inline-flex items-center gap-3
                  rounded-full bg-[#D84312] px-9 py-5
                  text-base font-bold tracking-[-0.01em] text-white
                  shadow-[0_20px_50px_-15px_rgba(13,92,79,0.55)]
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:bg-[#0a4a40]
                  hover:shadow-[0_24px_56px_-15px_rgba(13,92,79,0.7)]
                "
              >
                Browse Catalogue
                <ArrowRight
                  size={20}
                  strokeWidth={2.6}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="
                  group inline-flex items-center gap-3
                  rounded-full border-2 border-[#102D3C]/15
                  bg-white px-9 py-5
                  text-base font-bold tracking-[-0.01em] text-[#102D3C]
                  transition-colors duration-300
                  hover:border-[#102D3C]/40 hover:bg-[#f7f8f9]
                "
              >
                Get a Quote
                <MoveUpRight
                  size={19}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </Reveal>

          {/* Trust Strip */}
          <Reveal delay={0.28}>
            <div
              className="
                mt-10 grid grid-cols-2 gap-x-8 gap-y-5
                border-t border-[#102D3C]/10 pt-7
                sm:grid-cols-4
              "
            >
              {[
                ['ISO 13485', 'Quality certified'],
                ['CDSCO', 'Registered supplier'],
                ['500+', 'Equipment lines'],
                ['24h', 'Quote turnaround'],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="text-lg font-extrabold tracking-[-0.02em] text-[#102D3C]">
                    {value}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7a8590]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT SIDE 3D IMAGE */}
        <Parallax distance={reduceMotion ? 0 : 40}>
          <div
            className="
              relative overflow-hidden rounded-[28px]
              h-[min(62vw,620px)] min-h-[420px] max-h-[680px]
              border border-[#102D3C]/[0.06]
              bg-[radial-gradient(circle_at_50%_55%,rgba(13,92,79,0.10),rgba(247,248,249,0.9)_70%)]
              shadow-[0_40px_100px_-40px_rgba(15,20,25,0.18)]
            "
          >
            {/* NEW MEDICAL EQUIPMENT PNG */}
            <img
              src="/images/medical-hero.png"
              alt="3D illustration of modern hospital and medical equipment"
              className="
                absolute inset-0
                h-full w-full
                object-contain
                p-3
                drop-shadow-[0_24px_40px_rgba(13,92,79,0.16)]
                transition-transform duration-700
                hover:scale-[1.03]
              "
              loading="eager"
              fetchPriority="high"
            />

            {/* Live Badge */}
            <div
              className="
                absolute left-6 top-6 inline-flex items-center gap-2
                rounded-full border border-[#07546B]/20 bg-white/90
                px-4 py-2 backdrop-blur-md
                shadow-[0_8px_24px_-8px_rgba(15,20,25,0.12)]
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#07546B] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#07546B]" />
              </span>

              <span
                className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#07546B]"
              >
                Live catalogue
              </span>
            </div>

            {/* Bottom Caption */}
            <span
              className="
                absolute bottom-[22px] left-[26px]
                text-[10px] font-semibold uppercase
                tracking-[0.20em] text-[#7a8590]
              "
            >
              AI-generated medical equipment illustration
            </span>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
