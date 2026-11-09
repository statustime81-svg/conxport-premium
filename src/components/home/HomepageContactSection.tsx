import { ArrowUpRight, Mail, MapPin, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router';
import { ContactMessageForm } from '../public/ContactMessageForm';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.3112746637166!2d76.84086457383798!3d30.34210230440963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fb63e00f20c4d%3A0xcedf8bb43a84ff58!2s6342%2C%20Nicholson%20Road%2C%20Punjabi%20Mohalla%2C%20Sadar%20Bazar%2C%20Ambala%20Cantt%2C%20Ambala%2C%20Haryana%20133001!5e0!3m2!1sen!2sin!4v1793877538705!5m2!1sen!2sin';

/** Homepage only. Reuses the original Supabase contact_messages form. */
export default function HomepageContactSection() {
  return (
    <section
      id="home-contact"
      aria-labelledby="home-contact-title"
      className="relative isolate overflow-hidden bg-[#FFFCF9] pb-16 pt-16 font-['Manrope',system-ui,sans-serif] text-[#043C50] sm:pb-24 sm:pt-20"
    >
      <style>{`
        @keyframes cxContactRise {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cx-home-contact-reveal { animation: cxContactRise .85s cubic-bezier(.2,.8,.2,1) both; }
        .cx-home-contact-reveal-delayed { animation-delay: .16s; }
        .cx-home-contact-form input,
        .cx-home-contact-form textarea {
          border-color: #dce6eb;
          background: #fff;
          transition: border-color .25s ease, box-shadow .25s ease;
        }
        .cx-home-contact-form input:focus,
        .cx-home-contact-form textarea:focus {
          border-color: #D84312;
          box-shadow: 0 0 0 4px rgba(216,67,18,.09);
        }
        .cx-home-contact-form button[type="submit"] {
          border-radius: 999px;
          background: #D84312;
          color: white;
          padding: 13px 30px;
          transition: transform .25s ease, background-color .25s ease, box-shadow .25s ease;
        }
        .cx-home-contact-form button[type="submit"]:hover:not(:disabled) {
          background: #043C50;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -16px rgba(4,60,80,.55);
        }
        @media (prefers-reduced-motion: reduce) {
          .cx-home-contact-reveal { animation: none; }
          .cx-home-contact-form button[type="submit"] { transition: none; }
          .cx-home-contact-form button[type="submit"]:hover { transform: none; }
        }
      `}</style>

      <div aria-hidden="true" className="pointer-events-none absolute -left-36 top-0 h-[480px] w-[480px] rounded-full bg-[#FCE8DD]/35 blur-[100px]" />
      <div className="relative z-10 mx-auto w-[min(1440px,calc(100%-40px))]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-16">
          <div className="cx-home-contact-reveal flex min-w-0 flex-col lg:h-full">
            <p className="!mb-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#D84312]">
              <MessageSquareText size={17} aria-hidden="true" /> CONTACT CONXPORT
            </p>
            <h2
              id="home-contact-title"
              className="!mb-6 !font-['DM_Serif_Display',Georgia,serif] !text-[clamp(3.2rem,5.2vw,6rem)] !font-normal !leading-[1.04] !tracking-[-.055em] !text-[#043C50]"
            >
              Have an equipment
              <span className="block italic !text-[#D84312]">enquiry?</span>
            </h2>
            <p className="!mb-0 max-w-[550px] !text-[clamp(15px,1.3vw,18px)] !leading-[1.85] !text-[#5F7280]">
              Tell us what equipment or support you need. Share your requirements and our team will review your message and contact you as soon as possible.
            </p>
            <div className="mt-8 flex items-start gap-3 border-t border-[#DFE7E9] pt-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#FCE9E2] text-[#D84312]"><Mail size={19} /></span>
              <p className="!mb-0 pt-1 text-sm !leading-7 !text-[#5F7280]">Your message will be sent securely to the ConXport contact inbox.</p>
            </div>
            <div className="mt-8 min-w-0 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
              <div className="relative h-[290px] min-w-0 overflow-hidden rounded-[26px] border border-[#DCE7EA] bg-[#EAF3F5] shadow-[0_24px_50px_-35px_rgba(4,60,80,.45)] sm:h-[320px] lg:h-full lg:min-h-[250px]">
                <iframe
                  title="ConXport Office Location - Google Maps"
                  src={MAP_EMBED}
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#043C50] shadow-md">
                  <MapPin size={14} className="text-[#D84312]" /> Ambala Cantt, Haryana
                </div>
              </div>
            </div>
          </div>

          <div className="cx-home-contact-reveal cx-home-contact-reveal-delayed min-w-0 rounded-[30px] border border-[#E4E8EA] bg-white p-6 shadow-[0_25px_70px_-48px_rgba(4,60,80,.38)] sm:p-9 lg:p-11">
            <span className="mb-4 inline-flex rounded-full border border-[#D84312]/20 bg-[#FFF4EF] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#D84312]">
              SEND YOUR REQUIREMENTS
            </span>
            <h3 className="!mb-3 !font-['DM_Serif_Display',Georgia,serif] !text-[clamp(2rem,3vw,3.2rem)] !font-normal !tracking-[-.04em] !text-[#043C50]">
              Send us a <em className="!text-[#D84312]">message.</em>
            </h3>
            <p className="!mb-7 !text-sm !leading-7 !text-[#5F7280]">Fill in the details below and we will get back to you.</p>
            <div className="cx-home-contact-form">
              <ContactMessageForm />
            </div>
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#032B3D] via-[#043C50] to-[#07516A] px-7 py-11 sm:px-12 sm:py-12 lg:mt-20 lg:px-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-36 h-80 w-80 rounded-full border border-[#FCA37F]/25" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-24 h-60 w-60 rounded-full border border-[#FCA37F]/20" />
          <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="!mb-3 text-[11px] font-extrabold uppercase tracking-[.18em] !text-[#FFB494]">LET'S WORK TOGETHER</p>
              <h2 className="!mb-3 !font-['DM_Serif_Display',Georgia,serif] !text-[clamp(2.2rem,4vw,4.1rem)] !font-normal !leading-[1.07] !text-white">
                Tell us <em className="!text-[#FFAB86]">what you need.</em>
              </h2>
              <p className="!mb-0 !text-sm !leading-7 !text-[#D5E4EC]">Planning a hospital upgrade or sourcing medical equipment? Share your requirements with our team.</p>
            </div>
            <Link to="/contact" className="group inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#D84312] px-7 py-4 text-sm font-extrabold !text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:!text-[#043C50] md:self-auto">
              Contact ConXport
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
