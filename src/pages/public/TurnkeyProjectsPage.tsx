import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, ClipboardList, DraftingCompass, PackageCheck, ShieldCheck, CheckCircle2, BadgeCheck, Handshake, Headset, TrendingUp, Layers3, ClipboardCheck, ArrowRight } from 'lucide-react';
import { getCmsPublic } from '../../services/cmsPublic';

export type TurnkeyInfo = {
  eyebrow: string; heading: string; intro: string;
  steps: {title:string;description:string}[];
  benefits: {title:string;description:string}[];
  conclusion: string;
  reasons: {title:string;description:string}[];
};
export const defaultTurnkeyInfo:TurnkeyInfo = {
  eyebrow:'Hospital & Medical College Setup',
  heading:'Turnkey Hospital & Medical College Projects',
  intro:'Establishing a hospital or medical college is a complex endeavor that demands extensive planning, specialized knowledge, and seamless coordination. From designing and constructing facilities to equipping and commissioning them, turnkey projects bring the entire process under one coordinated approach.',
  steps:[
    {title:'Needs Assessment',description:'The initial stage involves conducting a thorough needs assessment. This includes determining the size and capacity of the hospital, the range of medical services to be offered, the target patient population, and any specialized requirements based on the facilityâ€™s focus area.'},
    {title:'Design & Construction',description:'Once the requirements are established, the turnkey contractor collaborates with architects, engineers, and healthcare professionals to design the hospital infrastructure. This encompasses layout planning, construction, electrical and mechanical installations, plumbing, and ensuring compliance with building codes and regulations.'},
    {title:'Equipment Procurement & Installation',description:'The turnkey contractor assumes responsibility for procuring and installing all medical equipment required for the hospital. This includes imaging systems, surgical equipment, patient monitoring systems, laboratory equipment, and IT infrastructure. The contractor ensures the seamless integration of these components into the hospitalâ€™s infrastructure.'},
    {title:'Regulatory Compliance & Accreditation',description:'Hospital setup turnkey projects necessitate adherence to various regulatory standards and healthcare accreditation requirements. The contractor ensures compliance with local, national, and international regulations, such as licensing, safety, and infection control standards, and facilitates the process of obtaining necessary certifications and accreditation.'}
  ],
  benefits:[
    {title:'Comprehensive Expertise',description:'Hospital setup turnkey contractors possess specialized knowledge and experience in healthcare infrastructure development. They understand the specific requirements of hospitals, including functionality, workflow optimization, infection control measures, and patient safety protocols.'},
    {title:'Efficient Project Management',description:'By entrusting the entire project to a single contractor, hospital setup turnkey projects benefit from streamlined project management. The contractor oversees all aspects, including design, construction, equipment procurement, regulatory compliance, and technology integration, ensuring a cohesive and efficient workflow.'},
    {title:'Time and Cost Efficiency',description:'Hospital setup turnkey projects minimize the need for clients to individually coordinate with multiple vendors and contractors, reducing project timelines. Turnkey contractors leverage their industry relationships to procure equipment and materials at competitive prices, resulting in cost savings for the client.'},
    {title:'Quality Assurance',description:'Hospital setup turnkey contractors prioritize quality assurance throughout the project. They implement stringent quality control measures, ensure compliance with healthcare regulations and standards, and focus on delivering a hospital infrastructure that meets or exceeds industry benchmarks.'}
  ],
  conclusion:'Hospital setup turnkey projects offer a comprehensive solution for organizations aiming to establish modern, efficient, and fully equipped hospitals. By leveraging the expertise and project management capabilities of turnkey contractors, healthcare organizations can navigate the complexities of hospital setup with ease. The benefits of specialized knowledge, streamlined project execution, time and cost efficiencies, and stringent quality assurance make hospital setup turnkey projects an attractive choice for healthcare organizations seeking to transform their infrastructure and deliver high-quality patient care.',
  reasons:[
    {title:'Expertise',description:'Our team brings extensive expertise and experience to turnkey projects, ensuring that the knowledge and skills necessary to deliver exceptional results are available.'},
    {title:'Comprehensive Solutions',description:'We offer end-to-end solutions, taking care of all aspects of the project from design to execution, providing a seamless and hassle-free experience.'},
    {title:'Commitment to Quality',description:'Quality is our top priority. We adhere to stringent quality control measures, ensuring that the final deliverables meet or exceed your expectations.'},
    {title:'Customer Satisfaction',description:'We value our customers and prioritize their satisfaction. We listen to your needs, provide open communication, and work closely with you to ensure your vision is realized.'},
    {title:'Continued Support',description:'Our commitment does not end with project completion. We offer ongoing support and maintenance to ensure the long-term success and smooth operation of the implemented solution.'}
  ]
};
export function parseTurnkeyInfo(body:string):TurnkeyInfo {
  try {
    const x=JSON.parse(body) as Partial<TurnkeyInfo>;
    if(!x || typeof x!=='object' || Array.isArray(x)) return defaultTurnkeyInfo;
    const mergeList=(source:unknown,defaults:{title:string;description:string}[])=>defaults.map((d,i)=>{
      const item=Array.isArray(source)?source[i]:undefined;
      return {title:typeof item?.title==='string'?item.title:d.title,description:typeof item?.description==='string'?item.description:d.description};
    });
    return {eyebrow:typeof x.eyebrow==='string'?x.eyebrow:defaultTurnkeyInfo.eyebrow,heading:typeof x.heading==='string'?x.heading:defaultTurnkeyInfo.heading,intro:typeof x.intro==='string'?x.intro:defaultTurnkeyInfo.intro,steps:mergeList(x.steps,defaultTurnkeyInfo.steps),benefits:mergeList(x.benefits,defaultTurnkeyInfo.benefits),conclusion:typeof x.conclusion==='string'?x.conclusion:defaultTurnkeyInfo.conclusion,reasons:mergeList(x.reasons,defaultTurnkeyInfo.reasons)};
  } catch {return defaultTurnkeyInfo;}
}
const processIcons = [ClipboardList, DraftingCompass, PackageCheck, ShieldCheck];
const benefitIcons = [Layers3, TrendingUp, ClipboardCheck, BadgeCheck];
const reasonIcons = [BadgeCheck, Layers3, ShieldCheck, Handshake, Headset];

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="!mb-0 inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.22em] !text-[#D84312]">
      <span className="h-[2px] w-7 rounded-full bg-[#D84312]" />
      {children}
    </p>
  );
}

export default function TurnkeyProjectsPage() {
  const [info, setInfo] = useState<TurnkeyInfo>(defaultTurnkeyInfo);

  useEffect(() => {
    let alive = true;
    void getCmsPublic('case_study', 'turnkey-projects')
      .then(entry => {
        if (alive && entry) setInfo(parseTurnkeyInfo(entry.body));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return (
    <main className="bg-white font-['Manrope',system-ui,sans-serif] text-[#102D3C]">
      <style>{`
        @keyframes tkFadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        .tk-enter { animation:tkFadeUp .75s cubic-bezier(.19,1,.22,1) both; }
        .tk-elevate { transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s ease,border-color .35s ease; }
        .tk-elevate:hover { transform:translateY(-6px); box-shadow:0 30px 70px -38px rgba(4,60,80,.35); border-color:rgba(249,62,2,.32); }
        @media (prefers-reduced-motion:reduce) { .tk-enter { animation:none!important; } .tk-elevate,.tk-elevate:hover { transition:none!important; transform:none!important; } }
      `}</style>

      {/* HERO: same CMS heading and introduction */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(120deg,#f7fafb_0%,#e9f2f5_58%,#fdf4f0_100%)] py-16 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-[440px] w-[440px] rounded-full bg-[#D84312]/[.055] blur-3xl" />
        <div className="container relative grid min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)] lg:gap-16">
          <div className="tk-enter max-w-[790px]">
            <SectionEyebrow>{info.eyebrow}</SectionEyebrow>
            <h1 className="!mb-0 mt-6 max-w-[850px] font-['DM_Serif_Display',Georgia,serif] text-[clamp(3rem,5.3vw,5.65rem)] font-normal leading-[1.06] tracking-[-0.045em] !text-[#043C50]">
              {info.heading.toLowerCase().includes('projects') ? <>{info.heading.slice(0, info.heading.toLowerCase().lastIndexOf('projects'))}<em className="font-normal italic !text-[#D84312]">{info.heading.slice(info.heading.toLowerCase().lastIndexOf('projects'))}</em></> : <>{info.heading} <em className="italic !text-[#D84312]">solutions.</em></>}
            </h1>
            <p className="!mb-0 mt-6 max-w-[720px] text-[15px] leading-[1.95] !text-[#5F7280] sm:text-[17px]">
              {info.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#D84312] px-7 py-3 text-[13px] font-extrabold !text-white shadow-[0_14px_38px_-16px_rgba(249,62,2,.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#de3905]">
                Discuss Your Project <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <a href="#our-process" className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#cddce2] bg-white px-7 py-3 text-[13px] font-extrabold !text-[#043C50] transition-all duration-300 hover:-translate-y-1 hover:border-[#F93E02]/50">
                Explore Our Process <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#d7e4e9] pt-6">
              {['Planning', 'Procurement', 'Execution', 'Support'].map(label => (
                <span key={label} className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#48616b]">
                  <CheckCircle2 size={15} className="text-[#F93E02]" />{label}
                </span>
              ))}
            </div>
          </div>

          {/* Premium photographic hero: the old circular illustration is removed. */}
          <div
            className="tk-enter relative mx-auto w-full max-w-[560px]"
            style={{ animationDelay: '120ms' }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 -right-4 left-5 top-5 rounded-[34px] bg-[#D84312]/10"
            />
            <figure className="relative m-0 overflow-hidden rounded-[30px] border-[6px] border-white bg-[#e7f1f3] shadow-[0_30px_85px_-32px_rgba(4,60,80,.35)]">
              <img
                src="/images/turnkey/turnkey-modern-hospital-infrastructure.webp"
                alt="Modern hospital room equipped with patient bed and medical equipment"
                loading="eager"
                decoding="async"
                className="block h-[340px] w-full object-cover object-center sm:h-[450px] lg:h-[525px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#032B3D]/80 via-[#032B3D]/5 to-transparent"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-white backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D84312]" />
                  CONXPORT / TURNKEY PROJECTS
                </span>
                <p className="!mb-0 mt-4 max-w-[380px] font-['Manrope',system-ui,sans-serif] text-[clamp(1.3rem,2.1vw,1.9rem)] font-extrabold leading-[1.3] !text-white">
                  Hospital infrastructure, thoughtfully equipped.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="our-process" className="scroll-mt-20 py-20 sm:py-24 lg:py-28">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-[860px]">
              <SectionEyebrow>How it works</SectionEyebrow>
              <h2 className="!mb-0 mt-5 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.5rem,4.6vw,4.3rem)] font-normal leading-[1.1] tracking-[-.045em] !text-[#043C50]">Key Components of <em className="italic !text-[#D84312]">Turnkey Projects</em></h2>
              <p className="!mb-0 mt-5 max-w-[680px] text-[15px] leading-8 !text-[#5F7280]">A coordinated approach from needs assessment through equipment installation and compliance.</p>
            </div>
            <span className="w-fit rounded-full border border-[#d8e7eb] px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#5f7280]">Four key stages</span>
          </div>
          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:gap-6">
            {info.steps.map((step, i) => {
              const Icon = processIcons[i] ?? ClipboardList;
              return (
                <article key={i} className="tk-elevate tk-enter group relative min-w-0 overflow-hidden rounded-[28px] border border-[#deeaee] bg-white p-6 shadow-[0_14px_45px_-35px_rgba(4,60,80,.22)] sm:p-8 lg:p-9" style={{animationDelay:`${i*75}ms`}}>
                  <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#D84312]/[.035] transition-transform duration-500 group-hover:scale-125" />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="grid h-[60px] w-[60px] place-items-center rounded-[18px] border border-[#dce9ef] bg-[#eef6f8] text-[#043C50] transition-colors duration-300 group-hover:border-[#F93E02]/25 group-hover:bg-[#fff0eb] group-hover:text-[#F93E02]"><Icon size={27} strokeWidth={1.7}/></span>
                    <span className="font-['DM_Serif_Display',Georgia,serif] text-[52px] leading-none text-[#dce9ef]">0{i+1}</span>
                  </div>
                  <h3 className="relative !mb-0 mt-8 !font-sans text-[20px] font-extrabold tracking-[-.03em] !text-[#043C50] sm:text-[23px]">{step.title}</h3>
                  <p className="relative !mb-0 mt-4 whitespace-pre-wrap text-[14px] leading-[1.9] !text-[#607580] sm:text-[15px]">{step.description}</p>
                  <div className="relative mt-8 h-[3px] w-12 rounded-full bg-[#D84312] transition-all duration-500 group-hover:w-24" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#f2f7f9] py-20 sm:py-24 lg:py-28">
        <div className="container">
          <div className="mx-auto max-w-[900px] text-center">
            <p className="!mb-0 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#D84312]">The Advantages</p>
            <h2 className="!mb-0 mt-5 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.5rem,4.6vw,4.3rem)] font-normal leading-[1.08] tracking-[-.045em] !text-[#043C50]">Benefits of Hospital Setup <em className="italic !text-[#D84312]">Turnkey Projects</em></h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {info.benefits.map((benefit, i) => {
              const Icon = benefitIcons[i] ?? BadgeCheck;
              return (
                <article key={i} className="tk-elevate tk-enter group flex min-w-0 flex-col rounded-[26px] border border-[#dfebf0] bg-white p-6 shadow-[0_14px_50px_-35px_rgba(4,60,80,.22)] lg:p-7" style={{animationDelay:`${i*75}ms`}}>
                  <div className="flex items-start justify-between gap-3"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#eaf3f6] text-[#043C50] transition-colors duration-300 group-hover:bg-[#ffede6] group-hover:text-[#F93E02]"><Icon size={24} strokeWidth={1.8}/></span><span className="text-xs font-extrabold text-[#c4d6df]">0{i+1}</span></div>
                  <h3 className="!mb-0 mt-7 !font-sans text-[18px] font-extrabold leading-snug !text-[#043C50]">{benefit.title}</h3>
                  <p className="!mb-0 mt-4 flex-1 text-[13px] leading-[1.9] !text-[#5f7280] sm:text-[14px]">{benefit.description}</p>
                  <div className="mt-7 h-[3px] w-12 rounded-full bg-[#D84312] transition-all duration-500 group-hover:w-20"/>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CONXPORT */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="container grid items-start gap-12 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <SectionEyebrow>Why choose us</SectionEyebrow>
            <h2 className="!mb-0 mt-5 max-w-[550px] font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.4rem,4.1vw,4.1rem)] font-normal leading-[1.1] tracking-[-.04em] !text-[#043C50]">A dependable partner for your <em className="italic !text-[#D84312]">healthcare project.</em></h2>
            <div className="relative mt-8 overflow-hidden rounded-[26px] bg-[linear-gradient(125deg,#043C50_0%,#07546B_100%)] p-7 shadow-[0_26px_65px_-35px_rgba(4,60,80,.46)] sm:p-9">
              <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/15" />
              <CheckCircle2 size={31} className="text-[#ff9a79]" />
              <p className="relative !mb-0 mt-6 max-w-sm text-[17px] font-extrabold leading-[1.65] !text-white">Planning, procurement, execution and ongoing support.</p>
              <div className="mt-7 h-[3px] w-16 rounded-full bg-[#D84312]" />
            </div>
          </div>
          <div className="grid gap-4">
            {info.reasons.map((reason, i) => {
              const Icon = reasonIcons[i] ?? BadgeCheck;
              return (
                <article key={i} className="tk-elevate group flex min-w-0 gap-5 rounded-[22px] border border-[#deebef] bg-white p-5 shadow-[0_8px_35px_-30px_rgba(4,60,80,.2)] sm:p-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[15px] bg-[#ecf5f7] text-[#043C50] transition-colors duration-300 group-hover:bg-[#fff0eb] group-hover:text-[#F93E02]"><Icon size={22} strokeWidth={1.8}/></span>
                  <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-4"><h3 className="!m-0 !font-sans text-[16px] font-extrabold !text-[#043C50] sm:text-[18px]">{reason.title}</h3><span className="text-[11px] font-extrabold text-[#b0c8d1]">0{i+1}</span></div><p className="!mb-0 mt-2 text-[14px] leading-[1.85] !text-[#5f7280]">{reason.description}</p></div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="container mt-14"><div className="rounded-[26px] border border-[#d9e8ed] bg-[#f4f8fa] p-7 sm:p-10 lg:p-12"><SectionEyebrow>Conclusion</SectionEyebrow><p className="!mb-0 mt-5 text-[15px] leading-[1.95] !text-[#4d6976] sm:text-[16px]">{info.conclusion}</p></div></div>
      </section>

      {/* CONTACT CTA: original contact route preserved, no invented form */}
      <section className="relative isolate overflow-hidden bg-[#043C50] py-14 sm:py-17">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-[#F93E02]/30" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-16 h-48 w-48 rounded-full border border-white/10" />
        <div className="container relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-[830px]">
            <p className="!mb-0 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#ff9e7b]">Start your project</p>
            <h2 className="!mb-0 mt-3 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.1rem,3.4vw,3.5rem)] font-normal leading-tight !text-white">Planning a hospital or <em className="italic !text-[#FFAD91]">medical college setup?</em></h2>
            <p className="!mb-0 mt-3 text-[15px] leading-7 !text-[#d7e7ec]">Tell our team about your infrastructure and equipment requirements.</p>
          </div>
          <Link to="/contact" className="group inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#D84312] px-7 py-3 text-[13px] font-extrabold !text-white shadow-[0_15px_35px_-15px_rgba(249,62,2,.5)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#dc3907]">Contact Our Team <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
        </div>
      </section>
    </main>
  );
}

