import { ArrowUpRight, Mail, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router';
import { ContactMessageForm } from '../public/ContactMessageForm';

/** Uses the same contact_messages form and success modal as /contact. */
export default function HomepageContactSection() {
  return (
    <section id="home-contact" className="bg-white pb-14 pt-8 sm:pb-20 sm:pt-12">
      <div className="mx-auto w-[min(1440px,calc(100%-40px))]">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="pt-1 lg:pt-8">
            <p className="mb-4 flex items-center gap-2 !text-xs font-extrabold uppercase tracking-[.16em] !text-[#07546B]">
              <MessageSquareText size={17} /> Contact us
            </p>
            <h2 className="!mb-5 !font-sans !text-[clamp(2rem,3.6vw,3.4rem)] !font-extrabold !leading-[1.12] !tracking-[-.045em] !text-[#102c35]">
              Have an equipment enquiry?
            </h2>
            <p className="max-w-lg !text-[15px] !leading-8 !text-slate-600">
              Tell us what equipment or support you need. Share your requirements and our team will review your message and contact you as soon as possible.
            </p>
            <div className="mt-7 flex items-start gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600">
              <Mail size={20} className="mt-0.5 shrink-0 text-[#07546B]" />
              <span>Your message will be sent securely to the ConXport contact inbox.</span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#dae8e4] bg-white p-5 shadow-[0_10px_40px_rgba(12,49,47,.055)] sm:p-8">
            <h3 className="!mb-2 !font-sans !text-xl !font-extrabold !text-[#142e36]">Send us a message</h3>
            <p className="!mb-6 !text-sm !text-slate-500">Fill in the details below and we will get back to you.</p>
            <ContactMessageForm />
          </div>
        </div>

        {/* Keep the original closing CTA immediately before the footer. */}
        <div className="relative mt-12 overflow-hidden rounded-[22px] bg-gradient-to-r from-[#0b3834] to-[#0d6857] px-6 py-9 text-white sm:px-10 sm:py-11 lg:mt-16 lg:px-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-40 h-80 w-80 rounded-full border border-white/15" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-28 h-60 w-60 rounded-full border border-white/10" />
          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="!mb-3 !text-[11px] font-extrabold uppercase tracking-[.17em] !text-[#b3e8db]">LET'S WORK TOGETHER</p>
              <h2 className="!mb-3 !font-sans !text-[clamp(1.9rem,3.5vw,3.1rem)] !font-extrabold !leading-tight !tracking-[-.045em] !text-white">Tell us what you need.</h2>
              <p className="!mb-0 !text-sm !leading-7 !text-[#d4eae4]">Planning a hospital upgrade or sourcing medical equipment? Share your requirements with our team.</p>
            </div>
            <Link to="/contact" className="group inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-extrabold !text-[#07546B] transition-transform duration-200 hover:-translate-y-1 md:self-auto">
              Contact ConXport <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
