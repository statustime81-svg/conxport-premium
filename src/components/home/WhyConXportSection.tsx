import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, CheckCircle2, MoveUpRight } from 'lucide-react';
import Reveal from '../animations/Reveal';

/** The original WHY CONXPORT messages and image assets, kept unchanged. */
const benefits = [
  {
    number: '01',
    image: '/images/why-conxport/healthcare.png',
    title: 'Built for healthcare',
    description:
      'A professional equipment discovery experience for hospitals, diagnostic centres, laboratories and healthcare institutions.',
  },
  {
    number: '02',
    image: '/images/why-conxport/sourcing.png',
    title: 'Simplified sourcing',
    description:
      'Explore medical equipment categories, compare available information and communicate your procurement requirements.',
  },
  {
    number: '03',
    image: '/images/why-conxport/clarity.png',
    title: 'Clarity at every step',
    description:
      'Request specifications, product documentation and quotations to support more informed equipment decisions.',
  },
] as const;

export default function WhyConXportSection() {
  const [active, setActive] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    node.style.setProperty('--why-mx', `${Math.round(x * 100)}%`);
    node.style.setProperty('--why-my', `${Math.round(y * 100)}%`);
    node.style.setProperty('--why-rx', `${((0.5 - y) * 3.2).toFixed(2)}deg`);
    node.style.setProperty('--why-ry', `${((x - 0.5) * 3.2).toFixed(2)}deg`);
    node.style.setProperty('--why-image-x', `${((x - 0.5) * -13).toFixed(1)}px`);
    node.style.setProperty('--why-image-y', `${((y - 0.5) * -9).toFixed(1)}px`);
  }

  function resetPointer(event: PointerEvent<HTMLElement>) {
    const node = event.currentTarget;
    node.style.setProperty('--why-rx', '0deg');
    node.style.setProperty('--why-ry', '0deg');
    node.style.setProperty('--why-image-x', '0px');
    node.style.setProperty('--why-image-y', '0px');
  }

  return (
    <section id="why-conxport" aria-labelledby="why-conxport-heading" className="cx-why-cinema relative isolate overflow-hidden bg-white pb-16 pt-12 text-[#043C50] sm:pb-24 sm:pt-20">
      <style>{`
        .cx-why-cinema .cx-why-stage { display:flex; gap:14px; height:clamp(440px,46vw,600px); perspective:1600px; }
        .cx-why-cinema .cx-why-panel { --why-rx:0deg; --why-ry:0deg; --why-image-x:0px; --why-image-y:0px; --why-mx:50%; --why-my:50%; flex:1 1 0%; min-width:0; position:relative; isolation:isolate; overflow:hidden; border-radius:29px; transform:perspective(1400px) rotateX(var(--why-rx)) rotateY(var(--why-ry)); transition:flex-grow .82s cubic-bezier(.2,.78,.2,1), transform .35s ease, box-shadow .5s ease, opacity .5s ease, border-color .4s ease; border:1px solid rgba(190,220,230,.72); box-shadow:0 22px 60px -37px rgba(4,60,80,.5); outline-offset:5px; cursor:default; }
        .cx-why-cinema .cx-why-stage[data-active] .cx-why-panel { flex-grow:.82; }
        .cx-why-cinema .cx-why-stage .cx-why-panel[data-selected='true'] { flex-grow:2.2; z-index:3; box-shadow:0 35px 85px -26px rgba(4,60,80,.48); }
        .cx-why-cinema .cx-why-panel img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transform:translate3d(var(--why-image-x),var(--why-image-y),0) scale(1.10); transition:transform .7s cubic-bezier(.2,.78,.2,1), filter .65s; }
        .cx-why-cinema .cx-why-panel[data-selected='true'] img { transform:translate3d(var(--why-image-x),var(--why-image-y),0) scale(1.17); }
        .cx-why-cinema .cx-why-panel::before { content:''; position:absolute; z-index:1; inset:0; background:linear-gradient(180deg,rgba(3,31,44,.11) 0%,rgba(3,31,44,.22) 28%,rgba(3,31,44,.7) 69%,rgba(3,31,44,.98) 100%); pointer-events:none; }
        .cx-why-cinema .cx-why-panel::after { content:''; position:absolute; z-index:2; inset:0; pointer-events:none; background:radial-gradient(ellipse 340px 280px at var(--why-mx) var(--why-my),rgba(255,255,255,.19),transparent 80%); opacity:0; transition:opacity .45s ease; }
        .cx-why-cinema .cx-why-panel[data-selected='true']::after { opacity:1; }
        .cx-why-cinema .cx-why-copy { position:absolute; z-index:3; bottom:0; left:0; width:100%; padding:clamp(20px,3vw,42px); color:#fff; }
        .cx-why-cinema .cx-why-desc { display:grid; grid-template-rows:0fr; opacity:.3; transition:grid-template-rows .65s cubic-bezier(.2,.8,.2,1),opacity .5s ease; }
        .cx-why-cinema .cx-why-desc > div { min-height:0; overflow:hidden; }
        .cx-why-cinema .cx-why-panel[data-selected='true'] .cx-why-desc, .cx-why-cinema .cx-why-stage:not([data-active]) .cx-why-desc { grid-template-rows:1fr; opacity:1; }
        .cx-why-cinema .cx-why-title { font-family:'DM Serif Display',Georgia,serif; font-weight:400; font-size:clamp(27px,2.9vw,42px); line-height:1.08; letter-spacing:-.035em; color:white!important; text-wrap:balance; }
        .cx-why-cinema .cx-why-num { position:absolute; z-index:4; top:24px; left:24px; font-family:'Manrope',sans-serif; font-size:12px; font-weight:800; letter-spacing:.12em; color:white; border:1px solid rgba(255,255,255,.5); background:rgba(4,60,80,.27); backdrop-filter:blur(14px); padding:12px 15px; border-radius:999px; }
        .cx-why-cinema .cx-why-indicator { position:absolute; z-index:4; top:24px; right:24px; display:grid; place-items:center; width:42px; height:42px; border-radius:50%; background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.35); color:white; backdrop-filter:blur(12px); transform:rotate(0deg); transition:background .4s,transform .5s; }
        .cx-why-cinema .cx-why-panel[data-selected='true'] .cx-why-indicator { background:#F93E02; transform:rotate(45deg); }
        .cx-why-cinema .cx-why-entrance { opacity:0; translate:0 65px; filter:blur(9px); }
        .cx-why-cinema .cx-why-stage.is-visible .cx-why-entrance { opacity:1; translate:0 0; filter:blur(0); transition:translate .9s cubic-bezier(.2,.8,.2,1),opacity .8s ease,filter .8s ease; }
        @media(max-width:767px) { .cx-why-cinema .cx-why-stage { display:grid; height:auto; gap:15px; } .cx-why-cinema .cx-why-panel { min-height:360px; transform:none!important; } .cx-why-cinema .cx-why-desc { grid-template-rows:1fr; opacity:1; } .cx-why-cinema .cx-why-title { font-size:32px; } .cx-why-cinema .cx-why-panel img,.cx-why-cinema .cx-why-panel[data-selected='true'] img { transform:none; } }
        @media (prefers-reduced-motion:reduce) { .cx-why-cinema *, .cx-why-cinema *::before,.cx-why-cinema *::after { transition:none!important; animation:none!important; filter:none!important; translate:none!important; transform:none!important; } .cx-why-cinema .cx-why-entrance { opacity:1; } }
      `}</style>
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-[#DCEFF4]/40 blur-[105px]" />
      <div className="container relative z-10 !max-w-[1440px]">
        <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.4fr_.6fr] lg:gap-16">
          <Reveal>
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#043C50]/15 bg-[#edf6f3] px-5 py-2.5">
                <CheckCircle2 size={16} className="text-[#043C50]" />
                <span className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#043C50]">WHY CONXPORT</span>
              </div>
              <h2 id="why-conxport-heading" className="!m-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(3rem,6vw,6.5rem)] font-normal leading-[1.05] tracking-[-.065em] !text-[#043C50]">
                Healthcare procurement<br className="hidden sm:block" />
                <span className="italic !text-[#D84312]"> deserves clarity.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="lg:pb-3">
              <div className="mb-5 h-[3px] w-14 rounded-full bg-[#F93E02]" />
              <p className="!m-0 max-w-[440px] text-[clamp(16px,1.3vw,19px)] leading-[1.85] !text-[#5e6c74]">
                Better equipment decisions begin with better information. We make medical equipment discovery and enquiries more straightforward.
              </p>
            </div>
          </Reveal>
        </div>
        <div
          ref={stageRef}
          className={`cx-why-stage ${visible ? 'is-visible' : ''}`}
          data-active={active !== null ? 'true' : undefined}
          onMouseLeave={() => setActive(null)}
          role="group"
          aria-label="Three reasons to choose ConXport"
        >
          {benefits.map((item, index) => (
            <article
              key={item.number}
              tabIndex={0}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }}
              onPointerMove={onPointerMove}
              onPointerLeave={resetPointer}
              data-selected={active === index ? 'true' : undefined}
              className="cx-why-panel cx-why-entrance group"
              style={{ transitionDelay: visible ? `${index * 85}ms` : '0ms' }}
              aria-label={`${item.title}. ${item.description}`}
            >
              <img src={item.image} alt="" loading="lazy" decoding="async" draggable={false} />
              <span className="cx-why-num">{item.number} / 03</span>
              <span aria-hidden="true" className="cx-why-indicator"><MoveUpRight size={18}/></span>
              <div className="cx-why-copy">
                <span className="mb-4 block h-[3px] w-10 rounded-full bg-[#F93E02] transition-all duration-500 group-hover:w-20" />
                <h3 className="cx-why-title !mb-3">{item.title}</h3>
                <div className="cx-why-desc"><div><p className="!m-0 max-w-[440px] pb-1 font-['Manrope',system-ui,sans-serif] text-[13px] leading-[1.8] !text-white/90 sm:text-[14px]">{item.description}</p></div></div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/products" className="group inline-flex items-center gap-3 text-sm font-extrabold !text-[#D84312] transition-colors duration-300 hover:!text-[#F93E02]">
            Explore our equipment catalogue
            <ArrowUpRight size={19} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
