import { useEffect, useState, type PointerEvent, type ReactNode } from 'react';

import {
  ArrowUpRight,
  Mail,
  MapPin,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

import { ContactMessageForm } from '../../components/public/ContactMessageForm';
import { getGeneralSettings } from '../../services/siteSettings';
import { defaultGeneralSettings, type GeneralSettings } from '../../types/settings';
import { useDocumentMeta } from '../../seo/useDocumentMeta';
import Reveal from '../../components/animations/Reveal';

// The supplied Google Maps coordinates, not an inferred new office location.
const MAP_LAT = 30.339361;
const MAP_LNG = 76.849311;
const MAP_URL = `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=17&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${MAP_LAT}%2C${MAP_LNG}`;

// Existing CMS values win. The fallback only replaces obvious template placeholders.
const verifiedFallback = {
  phone: '+91 98967 11929',
  email: 'trehan.akhil@yahoo.com',
  address: '6342, Nicholson Road, Ambala Cantt, Haryana 133001, India',
};

const isPlaceholderPhone = (phone: string) => !phone.trim() || /90000\s*00000/.test(phone);
const isPlaceholderAddress = (value: string) =>
  !value.trim() || /add your registered business address here/i.test(value);

type ContactCardProps = {
  number: string;
  label: string;
  icon: ReactNode;
  children: ReactNode;
};

/** Lightweight pointer-follow 3D tilt. No external animation dependency. */
function ContactInfoCard({ number, label, icon, children }: ContactCardProps) {
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    event.currentTarget.style.setProperty('--cx-tilt-x', `${(-y * 5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--cx-tilt-y', `${(x * 6).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--cx-glow-x', `${((x + 1) / 2 * 100).toFixed(0)}%`);
    event.currentTarget.style.setProperty('--cx-glow-y', `${((y + 1) / 2 * 100).toFixed(0)}%`);
  };
  const reset = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--cx-tilt-x', '0deg');
    event.currentTarget.style.setProperty('--cx-tilt-y', '0deg');
    event.currentTarget.style.setProperty('--cx-glow-x', '50%');
    event.currentTarget.style.setProperty('--cx-glow-y', '50%');
  };

  return (
    <div className="cx-contact-3d-perspective min-w-0">
      <div
        className="cx-contact-3d-card group relative flex h-full min-h-[245px] flex-col items-center overflow-hidden rounded-[26px] border border-[#E0E9EE] bg-white px-6 py-8 text-center shadow-[0_18px_55px_-40px_rgba(4,60,80,0.28)] sm:px-5 lg:px-7"
        onPointerMove={move}
        onPointerLeave={reset}
      >
        <div aria-hidden="true" className="cx-contact-3d-glow pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-[#F93E02] transition-transform duration-500 group-hover:scale-x-100 group-focus-within:scale-x-100" />
        <span aria-hidden="true" className="absolute right-6 top-6 text-xs font-extrabold tracking-[0.12em] text-[#B3C6CD]">{number}</span>
        <div className="cx-contact-3d-icon relative mb-5 grid h-[62px] w-[62px] place-items-center rounded-[20px] border border-[#DAE7EB] bg-[#F1F7FA] text-[#07546B] shadow-[0_12px_26px_-16px_rgba(4,60,80,0.25)] transition-[background-color,color,box-shadow] duration-300 group-hover:border-[#F93E02]/20 group-hover:bg-[#F93E02] group-hover:text-white group-hover:shadow-[0_16px_35px_-16px_rgba(249,62,2,0.55)]">
          {icon}
        </div>
        <h3 className="relative !mb-3 !font-['Manrope',system-ui,sans-serif] text-[16px] font-extrabold tracking-[-0.025em] !text-[#102D3C] sm:text-[17px]">{label}</h3>
        <div className="relative flex flex-1 flex-col items-center justify-start gap-1 text-[13px] leading-7 text-[#5F7280]">{children}</div>
        <span aria-hidden="true" className="relative mt-5 block h-[3px] w-8 rounded-full bg-[#F93E02] transition-all duration-500 group-hover:w-16" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  useDocumentMeta({
    title: 'Contact ConXport',
    description: 'Contact ConXport about hospital, laboratory and institutional equipment requirements.',
    canonicalPath: '/contact',
  });

  const [settings, setSettings] = useState<GeneralSettings>(defaultGeneralSettings);

  useEffect(() => {
    let active = true;
    void getGeneralSettings()
      .then((value) => { if (active) setSettings(value); })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const phone = isPlaceholderPhone(settings.supportPhone) ? verifiedFallback.phone : settings.supportPhone;
  const email = !settings.supportEmail.trim() || settings.supportEmail === 'info@conxport.com'
    ? verifiedFallback.email : settings.supportEmail;
  const address = isPlaceholderAddress(settings.address)
    ? verifiedFallback.address
    : [settings.address, settings.city, settings.country].filter(Boolean).join(', ');
  const whatsapp = isPlaceholderPhone(settings.whatsapp) ? phone : settings.whatsapp;
  const whatsappDigits = whatsapp.replace(/\D/g, '');

  return (
    <main className="overflow-hidden bg-white font-['Manrope',system-ui,sans-serif] text-[#102D3C]">
      {/* Reference-inspired editorial header, no reference-brand text or imagery. */}
      <section className="relative overflow-hidden bg-white pb-9 pt-16 sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-24">
        <div className="pointer-events-none absolute -top-28 right-0 h-[430px] w-[430px] rounded-full bg-[#E7F5F7]/75 blur-[100px]" aria-hidden="true" />
        <div className="container relative z-10 !max-w-[1300px]">
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E6EDF0] bg-[#F6F9FA] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#07546B]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F93E02]" />
              CONXPORT / CONTACT
            </div>
            <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-14">
              <h1 className="!mb-0 !font-['DM_Serif_Display',Georgia,serif] text-[clamp(3.9rem,9vw,8.2rem)] font-normal leading-[0.97] tracking-[-0.07em] !text-[#102D3C]">
                Contact <span className="!text-[#F93E02]">Us.</span>
              </h1>
              <p className="!mb-0 max-w-[420px] pb-1 text-[15px] leading-[1.9] !text-[#5F7280] sm:text-[17px]">
                Let’s plan your next healthcare procurement project. Share your requirements and our team can guide you on products, documentation and quotations.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Spacious two-column form and hospital-photo composition. */}
      <section className="pb-14 sm:pb-20 lg:pb-24">
        <div className="container !max-w-[1300px]">
          <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-6">
            <Reveal className="min-w-0">
              <div className="h-full rounded-[28px] border border-[#E5EBED] bg-[#F8FAFB] p-5 sm:p-8 lg:p-10 xl:p-12">
                <div className="mb-7 flex flex-wrap items-start justify-between gap-4 sm:mb-9">
                  <div>
                    <p className="!mb-2 text-[10px] font-extrabold uppercase tracking-[0.2em] !text-[#F93E02]">YOUR REQUIREMENT MATTERS</p>
                    <h2 className="!mb-2 !font-['DM_Serif_Display',Georgia,serif] text-[clamp(1.9rem,3.4vw,3.1rem)] font-normal !tracking-[-0.04em] !text-[#102D3C]">
                      Send us a message
                    </h2>
                    <p className="!mb-0 max-w-xl text-sm leading-7 !text-[#5F7280]">
                      Tell us what you need. Our team will review your enquiry and get back to you as soon as possible.
                    </p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#F93E02] shadow-sm"><Sparkles size={19} /></span>
                </div>
                <div className="cx-contact-reference-form">
                  <ContactMessageForm />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="min-w-0">
              <div className="relative h-[340px] overflow-hidden rounded-[28px] bg-[#E7F5F7] sm:h-[460px] lg:h-full lg:min-h-[580px]">
                <img
                  src="/images/why-conxport/healthcare.png"
                  alt="Hospital room and medical equipment"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#042938]/80 via-[#042938]/10 to-transparent" aria-hidden="true" />
                <div className="absolute right-5 top-5 rounded-full border border-white/35 bg-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-white backdrop-blur-md">
                  MEDICAL EQUIPMENT
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-9">
                  <p className="!mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] !text-[#FFA88A]">CONXPORT / HEALTHCARE</p>
                  <h3 className="!mb-0 max-w-md !font-['DM_Serif_Display',Georgia,serif] text-[clamp(1.8rem,3vw,2.9rem)] font-normal leading-[1.12] !text-white">
                    Better equipment decisions start here.
                  </h3>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Interactive 3D contact cards, preserving the actual CMS-backed contact data. */}
          <div className="mt-12 grid gap-5 pb-12 sm:mt-16 sm:grid-cols-3 sm:gap-6 sm:pb-16">
            <ContactInfoCard number="01" label="Call & WhatsApp" icon={<PhoneCall size={25} strokeWidth={1.8} />}>
              <a className="break-words font-semibold text-[#4D6975] transition-colors hover:text-[#F93E02] focus-visible:text-[#F93E02]" href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              {whatsappDigits && (
                <a
                  className="inline-flex items-center gap-1 font-medium text-[#07546B] transition-colors hover:text-[#F93E02] focus-visible:text-[#F93E02]"
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp enquiry <ArrowUpRight size={13} />
                </a>
              )}
            </ContactInfoCard>

            <ContactInfoCard number="02" label="Office & Location" icon={<MapPin size={25} strokeWidth={1.8} />}>
              <p className="!m-0 max-w-[285px] text-center text-[13px] leading-7 !text-[#5F7280]">{address}</p>
              <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 font-medium text-[#07546B] transition-colors hover:text-[#F93E02] focus-visible:text-[#F93E02]">
                Get directions <ArrowUpRight size={13} />
              </a>
            </ContactInfoCard>

            <ContactInfoCard number="03" label="Write to Us" icon={<Mail size={25} strokeWidth={1.8} />}>
              <a href={`mailto:${email}`} className="break-all font-semibold text-[#4D6975] transition-colors hover:text-[#F93E02] focus-visible:text-[#F93E02]">{email}</a>
              <span className="text-[12px] text-[#748993]">Send your equipment enquiry</span>
            </ContactInfoCard>
          </div>

          {/* Location banner takes the place of the travel-specific bottom content. */}
          <Reveal>
            <div className="mt-12 grid overflow-hidden rounded-[30px] bg-[#F6F8F9] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:mt-16">
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <p className="!mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] !text-[#F93E02]">FIND CONXPORT</p>
                <h2 className="!mb-4 !font-['DM_Serif_Display',Georgia,serif] text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] !text-[#102D3C]">
                  Visit us in Ambala Cantt.
                </h2>
                <p className="!mb-6 max-w-md text-[14px] leading-8 !text-[#5F7280]">{address}</p>
                <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F93E02] px-6 py-3.5 text-sm font-bold !text-white transition hover:-translate-y-0.5 hover:bg-[#E43A04]">
                  Get Directions <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="relative h-[320px] min-w-0 sm:h-[390px] lg:h-[460px]">
                <iframe
                  title="ConXport Ambala location on Google Maps"
                  src={MAP_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                  style={{ border: 0 }}
                />
                <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#043C50] shadow-md">
                  <MapPin size={13} className="mr-1 inline text-[#F93E02]" /> ConXport Location
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <style>{`
        .cx-contact-3d-perspective { perspective: 900px; }
        .cx-contact-3d-card {
          --cx-tilt-x: 0deg;
          --cx-tilt-y: 0deg;
          --cx-glow-x: 50%;
          --cx-glow-y: 50%;
          transform: rotateX(var(--cx-tilt-x)) rotateY(var(--cx-tilt-y));
          transform-style: preserve-3d;
          transition: transform .35s cubic-bezier(.2,.75,.2,1),
                      border-color .35s ease, box-shadow .35s ease;
          will-change: transform;
        }
        .cx-contact-3d-card:hover,
        .cx-contact-3d-card:focus-within {
          border-color: rgba(249,62,2,.32);
          box-shadow: 0 30px 65px -33px rgba(4,60,80,.3),
                      0 15px 35px -25px rgba(249,62,2,.28);
        }
        .cx-contact-3d-glow {
          opacity: 0;
          background: radial-gradient(250px circle at var(--cx-glow-x) var(--cx-glow-y), rgba(249,62,2,.085), transparent 75%);
          transition: opacity .4s ease;
        }
        .cx-contact-3d-card:hover .cx-contact-3d-glow,
        .cx-contact-3d-card:focus-within .cx-contact-3d-glow { opacity: 1; }
        .cx-contact-3d-icon { transform: translateZ(24px); }
        @media (prefers-reduced-motion: reduce) {
          .cx-contact-3d-card { transform: none !important; transition: none !important; will-change: auto; }
          .cx-contact-3d-icon { transform: none !important; }
          .cx-contact-3d-glow { display: none; }
        }
        .cx-contact-reference-form input,
        .cx-contact-reference-form textarea {
          background: #fff;
          border: 1px solid #dce6eb;
          border-radius: 12px;
          min-height: 48px;
          box-shadow: none;
        }
        .cx-contact-reference-form textarea { min-height: 148px; resize: vertical; }
        .cx-contact-reference-form input:focus,
        .cx-contact-reference-form textarea:focus {
          border-color: #F93E02;
          box-shadow: 0 0 0 3px rgba(249,62,2,.08);
        }
        .cx-contact-reference-form button[type="submit"] {
          background: #F93E02;
          border-radius: 999px;
          color: white;
          min-height: 48px;
          padding-inline: 30px;
          transition: background .2s ease,transform .2s ease;
        }
        .cx-contact-reference-form button[type="submit"]:hover {
          background: #E43A04;
          transform: translateY(-2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .cx-contact-reference-form button[type="submit"] { transition: none; }
          .cx-contact-reference-form button[type="submit"]:hover { transform: none; }
        }
      `}</style>
    </main>
  );
}
