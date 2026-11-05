import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Boxes, Factory, Settings2,
  Microscope, Headset, Scale, Handshake, Mail, MapPin, Phone, HeartPulse,
  Sparkles, Globe2,
} from 'lucide-react';
import Reveal from '../../components/animations/Reveal';
import { useDocumentMeta } from '../../seo/useDocumentMeta';

const strengths = [
  { number: '01', icon: Boxes, title: 'ConXport Extensive Product Portfolio', description: 'We offer a wide range of laboratory and medical equipment to meet diverse needs. Our product portfolio includes hospital furniture, medical equipment, instruments, apparatus, consumables, reagents, diagnostic tools, and more. We continually update our offerings to keep pace with the latest advancements in technology and industry trends.' },
  { number: '02', icon: Factory, title: 'ConXport Manufacturing Excellence', description: 'As a manufacturer, we have an in-house production facility equipped with state-of-the-art machinery and a skilled workforce. This allows us to control the entire manufacturing process, ensuring superior quality, adherence to industry standards, and timely delivery of products.' },
  { number: '03', icon: Settings2, title: 'ConXport Customization Capabilities', description: 'We understand that each laboratory or healthcare facility may have unique requirements. That’s why we offer customization options to tailor our equipment to specific needs. Our experienced team works closely with clients, providing consultation and expert guidance to design and develop customized solutions that align with their goals.' },
  { number: '04', icon: BadgeCheck, title: 'ConXport Quality Assurance', description: 'Quality is at the core of everything we do. We implement stringent quality control measures at every stage of manufacturing and sourcing. Our products undergo rigorous testing to ensure accuracy, precision, reliability, and compliance with relevant regulatory standards. We are committed to delivering products that meet or exceed our customers’ expectations.' },
  { number: '05', icon: Microscope, title: 'ConXport Research and Development', description: 'We invest in research and development to stay at the forefront of technological advancements in the laboratory and medical equipment industry. Our dedicated R&D team continuously explores new concepts, conducts feasibility studies, and collaborates with experts to develop innovative solutions that address emerging needs.' },
  { number: '06', icon: Headset, title: 'ConXport Service and Support', description: 'We believe in building long-term relationships with our customers. Our commitment to exceptional customer service extends beyond the initial purchase. We provide comprehensive support, including installation, training, maintenance, calibration, and prompt assistance for any technical queries or issues that may arise.' },
  { number: '07', icon: Scale, title: 'ConXport Compliance and Ethical Practices', description: 'We prioritize compliance with regulatory standards and ethical business practices. Our products are manufactured following strict quality assurance guidelines and adhere to relevant industry regulations. We strive to conduct business with integrity, transparency, and a strong sense of corporate responsibility.' },
  { number: '08', icon: Handshake, title: 'ConXport Collaboration and Partnerships', description: 'We foster collaborations and partnerships with leading institutions, research organizations, and healthcare professionals. These collaborations enable us to gain valuable insights, exchange knowledge, and continuously improve our offerings to meet the evolving needs of the industry.' },
];

const sectionLabel = 'text-[11px] font-extrabold uppercase tracking-[0.20em] text-[#07546B]';
const bodyText = 'text-[15px] leading-[1.9] text-[#596e76] sm:text-[16px]';

export default function AboutPage() {
  const [email, setEmail] = useState('');

  useDocumentMeta({
    title: 'About Us | ConXport Medical & Laboratory Equipment',
    description: 'Learn about Contemporary Export Industries (ConXport), our medical equipment portfolio, manufacturing, quality, network and vision.',
    canonicalPath: '/about',
  });

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent('ConXport newsletter subscription request');
    const message = encodeURIComponent(`Please add this email to your newsletter list: ${email}`);
    window.location.href = `mailto:trehan.akhil@yahoo.com?subject=${subject}&body=${message}`;
  }

  return (
    <main className="w-full overflow-hidden bg-white font-['Manrope',system-ui,sans-serif] text-[#102D3C]">
      {/* REFERENCE INSPIRED EDITORIAL HERO - original wording preserved */}
      <section className="relative isolate overflow-hidden bg-[#fbfcfd] pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute right-[-180px] top-[-200px] h-[600px] w-[600px] rounded-full bg-[#e9f4f6]/75 blur-3xl" />
        <div className="container relative z-10 mx-auto grid max-w-[1340px] items-center gap-12 lg:grid-cols-[1.06fr_.94fr] lg:gap-16">
          <Reveal>
            <div>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#d9e6eb] bg-white px-4 py-2.5 shadow-[0_8px_30px_-22px_rgba(7,84,107,.24)]">
                <span className="h-2 w-2 rounded-full bg-[#FF4F18]" />
                <p className="!m-0 text-[10px] font-extrabold uppercase tracking-[.18em] !text-[#07546B]">ABOUT CONTEMPORARY EXPORT INDUSTRIES</p>
              </div>
              <h1 className="!m-0 max-w-[790px] font-['DM_Serif_Display',Georgia,serif] text-[clamp(3rem,5.6vw,6.2rem)] font-normal leading-[1.01] tracking-[-.055em] !text-[#102D3C]">
                Medical equipment.
                <span className="mt-1 block !text-[#07546B]">Built around healthcare.</span>
              </h1>
              <div className="mt-8 max-w-[730px] border-l-[3px] border-[#FF4F18] pl-5 sm:pl-7">
                <p className={`!m-0 ${bodyText}`}>
                  ConXport is a leading supplier and manufacturer of laboratory and medical equipment. With a commitment to innovation, quality, and customer satisfaction, we specialize in providing a comprehensive range of cutting-edge equipment and solutions to healthcare institutions, research laboratories, and educational facilities.
                </p>
                <p className={`!mb-0 mt-4 ${bodyText}`}>
                  With a deep understanding of the unique needs and challenges of the healthcare industry, we strive to deliver products that enhance patient comfort, support healthcare professionals, and contribute to the overall efficiency of healthcare environments.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link to="/products" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#07546B] px-6 py-3 text-sm font-extrabold !text-white shadow-[0_14px_32px_-15px_rgba(7,84,107,.65)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#053F52]">Explore Products <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
                <Link to="/contact" className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-[#d4e1e6] bg-white px-6 py-3 text-sm font-extrabold !text-[#07546B] transition-all duration-300 hover:-translate-y-1 hover:border-[#07546B]">Contact Us <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative mx-auto w-full max-w-[625px] lg:ml-auto">
              <div aria-hidden="true" className="absolute -left-5 -top-5 h-32 w-32 rounded-[26px] border border-[#d5e9ee] bg-[#eaf5f8] sm:-left-7 sm:-top-7" />
              <div className="relative overflow-hidden rounded-[30px] rounded-bl-[76px] border border-[#dce8ec] bg-[#e9f3f0] shadow-[0_40px_100px_-55px_rgba(6,53,75,.5)]">
                <img src="/images/why-conxport/healthcare.png" alt="Hospital healthcare equipment and facility" className="block h-[360px] w-full object-cover sm:h-[470px] lg:h-[550px]" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061f2d]/45 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/90 px-4 py-2.5 text-[11px] font-bold text-[#07546B] shadow-lg backdrop-blur-md sm:text-[12px]">
                    <HeartPulse size={17} /> Contemporary Export Industries · Medical & Laboratory Equipment
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute -bottom-5 -right-4 h-24 w-24 rounded-[24px] border border-[#f9c8b7] bg-[#fff0e9] sm:-bottom-7 sm:-right-7" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* EIGHT ORIGINAL STRENGTHS IN PREMIUM BENTO-LIKE CARDS */}
      <section className="relative bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="about-strengths-title">
        <div className="container mx-auto max-w-[1330px]">
          <Reveal>
            <div className="mx-auto max-w-[870px] text-center">
              <p className={sectionLabel}>WHY CONXPORT</p>
              <h2 id="about-strengths-title" className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.7rem,4.5vw,4.6rem)] font-normal leading-[1.08] tracking-[-.04em] !text-[#102D3C]">What sets our company apart</h2>
              <p className={`mx-auto mt-4 max-w-[720px] ${bodyText}`}>Explore our portfolio, manufacturing, customisation, quality approach, service, research and partnerships.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {strengths.map(({ number, icon: Icon, title, description }, index) => (
              <Reveal key={number} delay={(index % 4) * 0.065} className="h-full">
                <article className="group relative flex h-full min-h-[335px] flex-col overflow-hidden rounded-[26px] border border-[#e0e9ed] bg-[#f8fbfc] p-6 shadow-[0_10px_35px_-28px_rgba(7,84,107,.25)] transition-all duration-500 hover:-translate-y-2 hover:border-[#b4d4dd] hover:bg-white hover:shadow-[0_28px_60px_-32px_rgba(7,84,107,.36)] sm:p-7">
                  <div aria-hidden="true" className="pointer-events-none absolute right-[-34px] top-[-44px] h-36 w-36 rounded-full border border-[#dcecef] transition-transform duration-500 group-hover:scale-[1.25]" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[17px] bg-[#e6f3f6] text-[#07546B] transition-all duration-300 group-hover:bg-[#07546B] group-hover:text-white"><Icon size={25} strokeWidth={1.7} /></div>
                    <span className="font-['DM_Serif_Display',Georgia,serif] text-[29px] text-[#aac1c9]">{number}</span>
                  </div>
                  <h3 className="relative !mb-0 mt-7 !font-sans text-[17px] font-extrabold leading-[1.45] tracking-[-.035em] !text-[#102D3C] sm:text-[18px]">{title}</h3>
                  <p className="relative !mb-0 mt-3 flex-1 text-[13px] leading-[1.85] !text-[#61747c]">{description}</p>
                  <div className="relative mt-6 h-[2px] w-12 bg-[#FF4F18] transition-all duration-500 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The product portfolio tag-grid section was intentionally removed per reference. */}

      {/* DISTRIBUTION AND VISION - ORIGINAL FACTS AND COPY */}
      <section className="bg-[#f5f9fa] py-20 sm:py-24 lg:py-28">
        <div className="container mx-auto grid max-w-[1330px] items-center gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="relative max-w-[620px]">
              <div className="overflow-hidden rounded-[30px] rounded-tr-[84px] border border-[#dae7eb] bg-white shadow-[0_32px_80px_-50px_rgba(7,84,107,.4)]">
                <img src="/images/why-conxport/sourcing.png" loading="lazy" alt="Medical equipment sourcing and supply" className="block h-[350px] w-full object-cover sm:h-[470px] lg:h-[540px]" />
              </div>
              <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-[19px] border border-[#e1e9ed] bg-white px-5 py-4 shadow-[0_18px_50px_-22px_rgba(7,84,107,.22)] sm:right-8">
                <Globe2 size={24} className="text-[#07546B]" />
                <span className="text-[12px] font-bold text-[#102D3C]">CONXPORT NETWORK</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="lg:py-4">
              <p className={sectionLabel}>CONXPORT NETWORK</p>
              <h2 className="mt-4 max-w-[710px] font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.7rem,4.3vw,4.8rem)] font-normal leading-[1.06] tracking-[-.04em] !text-[#102D3C]">Supporting healthcare across borders.</h2>
              <p className={`mt-6 ${bodyText}`}>ConXport is currently exporting medical equipment and hospital furniture around the world with a long list of satisfied clients. We export medical equipment and hospital furniture on an OEM brands basis. ConXport has a worldwide network for distribution of medical scientific and hospital furniture.</p>
              <Link to="/distributor-network" className="group mt-6 inline-flex items-center gap-2 border-b-2 border-[#FF4F18] pb-2 text-sm font-bold !text-[#07546B]">View Distributor Network <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
              <div className="mt-9 rounded-[25px] border border-[#dce9ec] bg-white p-6 shadow-[0_18px_50px_-38px_rgba(7,84,107,.28)] sm:p-8">
                <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f3f6] text-[#07546B]"><Sparkles size={20} /></span><p className={`!m-0 ${sectionLabel}`}>OUR VISION</p></div>
                <h3 className="mt-5 !font-sans text-[23px] font-extrabold leading-[1.4] tracking-[-.035em] !text-[#102D3C]">Empowering laboratories and healthcare facilities</h3>
                <p className={`!mb-0 mt-3 ${bodyText}`}>At Contemporary Export Industries our mission is to empower laboratories and healthcare facilities with reliable, technologically advanced equipment that enables accurate diagnoses, research advancements, and improved patient outcomes. We are dedicated to being a trusted partner, delivering high-quality products, personalized service, and innovative solutions that contribute to the advancement of science and healthcare.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT INFO - SAME INFORMATION, NEW CARD UI */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container mx-auto max-w-[1330px]">
          <Reveal>
            <div className="mb-9 text-center"><p className={sectionLabel}>GET IN TOUCH</p><h2 className="mt-4 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.5rem,4vw,4.2rem)] font-normal tracking-[-.04em] !text-[#102D3C]">Contemporary Export Industries</h2></div>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-[24px] border border-[#dde8ec] bg-[#f8fbfc] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-30px_rgba(7,84,107,.22)] sm:p-7"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#e8f3f7] text-[#07546B]"><MapPin size={22}/></div><p className="!m-0 text-xs font-extrabold uppercase tracking-wider !text-[#07546B]">Address</p><p className="mt-3 text-sm leading-7 text-[#4e666e]">6342, Nicholson Road, Ambala Cantt, Haryana 133001, India</p></div>
              <div className="rounded-[24px] border border-[#dde8ec] bg-[#f8fbfc] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-30px_rgba(7,84,107,.22)] sm:p-7"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#e8f3f7] text-[#07546B]"><Phone size={22}/></div><p className="!m-0 text-xs font-extrabold uppercase tracking-wider !text-[#07546B]">Phone</p><a href="tel:+919896711929" className="mt-3 block text-sm !text-[#304b52] hover:underline">+91 98967 11929</a><a href="tel:+919729999965" className="mt-2 block text-sm !text-[#304b52] hover:underline">+91 97299 99965</a></div>
              <div className="rounded-[24px] border border-[#dde8ec] bg-[#f8fbfc] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-30px_rgba(7,84,107,.22)] sm:p-7"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#e8f3f7] text-[#07546B]"><Mail size={22}/></div><p className="!m-0 text-xs font-extrabold uppercase tracking-wider !text-[#07546B]">Email</p><a href="mailto:trehan.akhil@yahoo.com" className="mt-3 block break-all text-sm !text-[#304b52] hover:underline">trehan.akhil@yahoo.com</a><p className="mt-2 text-xs leading-5 text-[#74888b]">Contact details sourced from the supplied distributor document.</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEWSLETTER - original mailto request workflow unchanged */}
      <section className="bg-[#f7fafb] py-14 sm:py-20">
        <div className="container mx-auto max-w-[1330px]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(115deg,#073044,#07546B)] px-6 py-9 sm:px-10 sm:py-11 lg:px-14">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[390px] w-[390px] rounded-full border border-white/15" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-28 h-[310px] w-[310px] rounded-full border border-white/10" />
              <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
                <div className="max-w-[590px]"><p className="!m-0 text-[11px] font-bold uppercase tracking-[.18em] !text-[#b5e6ed]">STAY CONNECTED</p><h2 className="mt-3 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2rem,3.2vw,3.4rem)] font-normal leading-[1.12] !text-white">Get our best deals straight to your inbox!</h2><p className="mt-3 text-sm leading-6 !text-[#c9dfed]">Send us a request to receive company updates and equipment information.</p></div>
                <form onSubmit={subscribe} aria-label="Newsletter enquiry" className="flex w-full max-w-[480px] flex-col gap-2 rounded-2xl border border-white/15 bg-white p-2 shadow-[0_20px_50px_-26px_rgba(0,0,0,.4)] sm:flex-row"><label className="sr-only" htmlFor="conx-about-newsletter">Email address</label><input id="conx-about-newsletter" type="email" required placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} className="min-h-12 min-w-0 flex-1 rounded-xl border-0 bg-white px-4 py-2 text-sm text-[#102b33] outline-none" /><button type="submit" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl !bg-[#FF4F18] px-5 py-3 text-sm font-bold !text-white transition hover:!bg-[#E44310]">Subscribe <ArrowUpRight size={15}/></button></form>
              </div>
            </div>
            <p className="mt-3 !text-xs !text-[#71858a]">Subscription opens an email request; no automated mailing list is connected.</p>
          </Reveal>
        </div>
      </section>

      {/* ORIGINAL CONTACT CTA, STYLED TO MATCH REFERENCE */}
      <section className="bg-white pb-16 pt-12 sm:pb-20 sm:pt-14">
        <div className="container mx-auto max-w-[1330px]">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-7 rounded-[25px] border border-[#e0eaed] bg-[#fafcfd] p-7 sm:p-9 lg:flex-row lg:items-center lg:p-11">
              <div><p className={sectionLabel}>NEED ASSISTANCE?</p><h2 className="mt-3 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.1rem,3.3vw,3.4rem)] font-normal tracking-[-.04em] !text-[#102D3C]">Have a medical equipment requirement?</h2><p className={`!mb-0 mt-3 ${bodyText}`}>Share your requirements and our team can discuss the next steps.</p></div>
              <Link to="/contact" className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#07546B] px-7 py-4 text-sm font-extrabold !text-white transition duration-300 hover:-translate-y-1 hover:bg-[#053F52]">Contact ConXport <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
