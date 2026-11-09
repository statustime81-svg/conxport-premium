import { useEffect, useState, type PointerEvent, type ReactNode } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight, ArrowUpRight, Clock3, Mail, MapPin,
  PhoneCall, ShieldCheck, Sparkles, MessageSquareText,
} from 'lucide-react';
import { ContactMessageForm } from '../../components/public/ContactMessageForm';
import { getGeneralSettings } from '../../services/siteSettings';
import { defaultGeneralSettings, type GeneralSettings } from '../../types/settings';
import { useDocumentMeta } from '../../seo/useDocumentMeta';
import Reveal from '../../components/animations/Reveal';

// Preserve the originally supplied office map and CMS-backed contact details.
const MAP_LAT = 30.339361;
const MAP_LNG = 76.849311;
const MAP_URL = `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=17&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${MAP_LAT}%2C${MAP_LNG}`;
const verifiedFallback = {
  phone: '+91 98967 11929',
  email: 'trehan.akhil@yahoo.com',
  address: '6342, Nicholson Road, Ambala Cantt, Haryana 133001, India',
};
const isPlaceholderPhone = (value: string) => !value.trim() || /90000\s*00000/.test(value);
const isPlaceholderAddress = (value: string) =>
  !value.trim() || /add your registered business address here/i.test(value);

type DetailCardProps = {
  number: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
};
function DetailCard({ number, title, icon, children }: DetailCardProps) {
  function move(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - .5;
    const dy = (event.clientY - rect.top) / rect.height - .5;
    event.currentTarget.style.setProperty('--cx-contact-rotate-x', `${(-dy * 7).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--cx-contact-rotate-y', `${(dx * 8).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--cx-contact-pointer-x', `${(dx + .5) * 100}%`);
    event.currentTarget.style.setProperty('--cx-contact-pointer-y', `${(dy + .5) * 100}%`);
  }
  function reset(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty('--cx-contact-rotate-x', '0deg');
    event.currentTarget.style.setProperty('--cx-contact-rotate-y', '0deg');
  }
  return (
    <article className="group [perspective:1100px]">
      <div
        onPointerMove={move}
        onPointerLeave={reset}
        className="cx-contact-detail relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[26px] border border-[#E3E9EB] bg-white p-7 shadow-[0_20px_60px_-48px_rgba(4,60,80,.35)] sm:p-8"
      >
        <div className="cx-contact-detail-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative flex items-start justify-between gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-[18px] bg-[#FFF0E9] text-[#D84312] transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:bg-[#D84312] group-hover:text-white">{icon}</span>
          <span className="text-[12px] font-extrabold tracking-[.15em] text-[#9CB0BA]">{number} / 03</span>
        </div>
        <h3 className="relative !mb-3 mt-7 !font-['DM_Serif_Display',Georgia,serif] text-[clamp(1.65rem,2vw,2.05rem)] font-normal !text-[#043C50]">{title}</h3>
        <div className="relative flex flex-1 flex-col items-start gap-2 text-sm leading-7 text-[#576D78]">{children}</div>
        <div className="relative mt-7 h-[3px] w-10 rounded-full bg-[#D84312] transition-all duration-500 group-hover:w-full" />
      </div>
    </article>
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
      .then(value => { if (active) setSettings(value); })
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
    <main className="cx-contact-redesign overflow-hidden bg-[#FFFCF9] font-['Manrope',system-ui,sans-serif] text-[#043C50]">
      <style>{`
        .cx-contact-redesign .cx-contact-detail {
          --cx-contact-rotate-x:0deg; --cx-contact-rotate-y:0deg;
          --cx-contact-pointer-x:50%; --cx-contact-pointer-y:50%;
          transform:rotateX(var(--cx-contact-rotate-x)) rotateY(var(--cx-contact-rotate-y));
          transition:transform .32s cubic-bezier(.2,.7,.2,1),box-shadow .35s,border-color .35s;
          transform-style:preserve-3d;
        }
        .cx-contact-redesign .cx-contact-detail:hover,
        .cx-contact-redesign .cx-contact-detail:focus-within {
          border-color:rgba(216,67,18,.35);
          box-shadow:0 35px 75px -40px rgba(4,60,80,.38);
        }
        .cx-contact-redesign .cx-contact-detail-glow {
          background:radial-gradient(280px circle at var(--cx-contact-pointer-x) var(--cx-contact-pointer-y),rgba(216,67,18,.08),transparent 75%);
        }
        .cx-contact-redesign .cx-contact-form input,
        .cx-contact-redesign .cx-contact-form textarea {
          background:white; border:1px solid #DDE6E9; border-radius:14px;
          min-height:51px; font-family:'Manrope',system-ui,sans-serif;
          transition:border-color .25s,box-shadow .25s;
        }
        .cx-contact-redesign .cx-contact-form textarea { min-height:155px; resize:vertical; }
        .cx-contact-redesign .cx-contact-form input:focus,
        .cx-contact-redesign .cx-contact-form textarea:focus {
          border-color:#D84312; box-shadow:0 0 0 4px rgba(216,67,18,.08); outline:none;
        }
        .cx-contact-redesign .cx-contact-form button[type='submit'] {
          background:#D84312; color:white; border-radius:999px;
          min-height:52px; padding-inline:32px;
          box-shadow:0 15px 30px -17px rgba(216,67,18,.6);
          transition:transform .25s,background .25s,box-shadow .25s;
        }
        .cx-contact-redesign .cx-contact-form button[type='submit']:hover {
          background:#043C50; transform:translateY(-3px);
          box-shadow:0 20px 35px -16px rgba(4,60,80,.45);
        }
        @media(prefers-reduced-motion:reduce) {
          .cx-contact-redesign .cx-contact-detail { transform:none!important; transition:none!important; }
          .cx-contact-redesign .cx-contact-form button[type='submit'] { transition:none!important; }
          .cx-contact-redesign .cx-contact-form button[type='submit']:hover { transform:none!important; }
        }
      `}</style>

      {/* Hero: editorial typography from approved Option 4, not the Homepage contact section. */}
      <section className="relative isolate overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_20%,rgba(119,206,205,.15),transparent_43%),radial-gradient(ellipse_at_0%_90%,rgba(216,67,18,.06),transparent_42%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[.18] bg-[linear-gradient(90deg,#043C50_1px,transparent_1px),linear-gradient(#043C50_1px,transparent_1px)] bg-[size:62px_62px] [mask-image:radial-gradient(ellipse_50%_65%_at_92%_24%,#000,transparent)]" />
        <div className="container relative z-10 !max-w-[1350px]">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,.92fr)] lg:gap-16">
            <Reveal>
              <div className="max-w-[720px]">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D84312]/20 bg-white/85 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[.18em] !text-[#043C50] shadow-sm">
                  <MessageSquareText size={15} className="text-[#D84312]" /> CONTACT CONXPORT
                </div>
                <h1 className="!m-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(3.8rem,7vw,7.6rem)] font-normal leading-[.98] tracking-[-.06em] !text-[#043C50]">
                  Every question<br />starts a <em className="font-normal !text-[#D84312]">conversation.</em>
                </h1>
                <p className="!mb-0 mt-8 max-w-[610px] text-[clamp(15px,1.35vw,19px)] leading-[1.85] !text-[#596D78]">
                  Let’s plan your next healthcare procurement project. Share your requirements and our team can guide you on products, documentation and quotations.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a href="#contact-form" className="group inline-flex items-center gap-2.5 rounded-full bg-[#D84312] px-7 py-4 text-sm font-extrabold !text-white shadow-[0_18px_35px_-19px_rgba(216,67,18,.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#043C50]">
                    Send an Enquiry <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                  <Link to="/products" className="group inline-flex items-center gap-2.5 rounded-full border border-[#BCCDD4] bg-white px-7 py-4 text-sm font-bold !text-[#043C50] transition-all duration-300 hover:-translate-y-1 hover:border-[#043C50]">
                    Browse Equipment <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#DDE6E9] pt-6 text-[12px] font-bold text-[#5B707B]">
                  <span className="inline-flex items-center gap-2"><ShieldCheck size={18} className="text-[#D84312]" /> Equipment enquiries</span>
                  <span className="inline-flex items-center gap-2"><Clock3 size={18} className="text-[#D84312]" /> Personal assistance</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={.12} className="min-w-0">
              <div className="relative min-h-[350px] sm:min-h-[480px] lg:min-h-[570px]">
                <div className="absolute -right-8 -top-8 h-[80%] w-[80%] rounded-full bg-[#E7F4F4] blur-[70px]" aria-hidden="true" />
                <div className="absolute inset-4 overflow-hidden rounded-[33px] rounded-bl-[100px] border border-white/80 shadow-[0_35px_100px_-48px_rgba(4,60,80,.35)] sm:inset-6">
                  <img src="/images/contact/contect-img.webp" alt="ConXport medical equipment and healthcare environment" className="h-full w-full object-cover" loading="eager" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#062E40]/85 via-[#062E40]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                    <div className="mb-4 h-[3px] w-12 rounded-full bg-[#D84312]" />
                    <p className="!mb-0 max-w-[400px] font-['DM_Serif_Display',Georgia,serif] text-[clamp(1.9rem,3vw,3.2rem)] leading-[1.12] !text-white">Better equipment decisions start here.</p>
                  </div>
                </div>
                <div className="absolute right-0 top-3 hidden rounded-2xl border border-white/80 bg-white/90 px-5 py-4 shadow-[0_18px_45px_-23px_rgba(4,60,80,.25)] backdrop-blur-xl sm:block">
                  <Sparkles size={22} className="text-[#D84312]" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Premium enquiry experience, preserves the actual ContactMessageForm. */}
      <section id="contact-form" className="relative bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="cx-contact-form-title">
        <div className="container !max-w-[1350px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,.76fr)_minmax(0,1.24fr)] lg:gap-16">
            <Reveal className="min-w-0">
              <div className="lg:sticky lg:top-40">
                <p className="!mb-4 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#D84312]">TELL US WHAT YOU NEED</p>
                <h2 id="cx-contact-form-title" className="!mb-5 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.8rem,4.7vw,5.2rem)] font-normal leading-[1.05] !text-[#043C50]">Let’s build <em className="font-normal !text-[#D84312]">better care.</em></h2>
                <p className="max-w-[470px] text-[15px] leading-[1.9] !text-[#596D78]">Tell us what equipment or support you need. Our team will review your message and contact you as soon as possible.</p>
                <div className="mt-9 space-y-4 border-t border-[#DDE6E9] pt-7">
                  <div className="flex gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#FFF0E9] text-[#D84312]"><Mail size={19} /></span><div><strong className="block text-sm text-[#043C50]">Direct enquiry</strong><span className="text-[13px] leading-6 text-[#647984]">Your message goes to the ConXport contact inbox.</span></div></div>
                  <div className="flex gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#FFF0E9] text-[#D84312]"><ShieldCheck size={19} /></span><div><strong className="block text-sm text-[#043C50]">Existing secure form</strong><span className="text-[13px] leading-6 text-[#647984]">Original validation, submission and confirmation are preserved.</span></div></div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={.1} className="min-w-0">
              <div className="relative overflow-hidden rounded-[30px] border border-[#E3EBEE] bg-[#F8FAFB] p-5 shadow-[0_28px_90px_-58px_rgba(4,60,80,.33)] sm:p-9 lg:p-11">
                <div aria-hidden="true" className="absolute right-0 top-0 h-28 w-28 rounded-bl-[100px] bg-[#FFF0E9]" />
                <div className="relative mb-9 flex items-start justify-between gap-4">
                  <div><p className="!mb-2 text-[11px] font-extrabold uppercase tracking-[.18em] !text-[#D84312]">WE ARE LISTENING</p><h3 className="!m-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2rem,3vw,3.2rem)] font-normal !text-[#043C50]">Send us a <em className="font-normal !text-[#D84312]">message.</em></h3></div>
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#F3C9BB] bg-white text-[#D84312]"><ArrowUpRight size={21}/></span>
                </div>
                <div className="cx-contact-form relative"><ContactMessageForm /></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive contact cards with the original CMS-driven phone/address/email. */}
      <section className="bg-[#FFFCF9] py-16 sm:py-20" aria-labelledby="cx-contact-details-title">
        <div className="container !max-w-[1350px]">
          <Reveal><div className="mb-10 max-w-[770px]"><p className="!mb-3 text-[11px] font-extrabold uppercase tracking-[.18em] !text-[#D84312]">GET IN TOUCH</p><h2 id="cx-contact-details-title" className="!m-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.8rem,4.5vw,5rem)] font-normal leading-[1.07] !text-[#043C50]">We’re easy to <em className="font-normal !text-[#D84312]">reach.</em></h2></div></Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <DetailCard number="01" icon={<PhoneCall size={24}/>} title="Call & WhatsApp">
              <a href={`tel:${phone.replace(/\s/g,'')}`} className="font-bold text-[#043C50] transition-colors hover:text-[#D84312]">{phone}</a>
              {whatsappDigits && <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#D84312] hover:underline">WhatsApp enquiry <ArrowUpRight size={15}/></a>}
            </DetailCard>
            <DetailCard number="02" icon={<MapPin size={24}/>} title="Office & Location">
              <p className="!m-0 text-[13px] leading-7 !text-[#5B707B]">{address}</p>
              <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#D84312] hover:underline">Get directions <ArrowUpRight size={15}/></a>
            </DetailCard>
            <DetailCard number="03" icon={<Mail size={24}/>} title="Write to Us">
              <a href={`mailto:${email}`} className="break-all font-bold text-[#043C50] transition-colors hover:text-[#D84312]">{email}</a>
              <span className="text-[13px] text-[#60747D]">Send your equipment enquiry</span>
            </DetailCard>
          </div>
        </div>
      </section>

      {/* Preserve original map coordinates and get-directions target. */}
      <section className="bg-white pb-20 pt-12 sm:pb-24" aria-labelledby="cx-contact-location-title">
        <div className="container !max-w-[1350px]">
          <Reveal>
            <div className="grid overflow-hidden rounded-[32px] border border-[#E0E9EE] bg-[#043C50] shadow-[0_34px_85px_-50px_rgba(4,60,80,.42)] lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
              <div className="relative flex flex-col justify-center overflow-hidden p-8 sm:p-12 lg:p-14">
                <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full border border-white/20" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-[#D84312]/50" />
                <p className="relative !mb-4 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#FFAA8B]">FIND CONXPORT</p>
                <h2 id="cx-contact-location-title" className="relative !mb-5 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.5rem,4.1vw,4.5rem)] font-normal leading-[1.07] !text-white">Visit us in <em className="font-normal !text-[#FF9E7C]">Ambala Cantt.</em></h2>
                <p className="relative !mb-7 max-w-md text-[14px] leading-8 !text-[#D8E8EC]">{address}</p>
                <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="group relative inline-flex w-fit items-center gap-2 rounded-full bg-[#D84312] px-7 py-4 text-sm font-bold !text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:!text-[#043C50]">Get Directions <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
              </div>
              <div className="relative min-h-[350px] lg:min-h-[460px]">
                <iframe title="ConXport Ambala location on Google Maps" src={MAP_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
                <div className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/90 px-4 py-2.5 text-xs font-extrabold text-[#043C50] shadow-lg"><MapPin size={15} className="text-[#D84312]" /> ConXport Location</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
