import CmsIndexPage from './CmsIndexPage';

const resourceTheme = `
.cx-option4-resources { background:#FFFCF9; font-family:'Manrope',system-ui,sans-serif; }
.cx-option4-resources main { background:#FFFCF9; }
.cx-option4-resources h1, .cx-option4-resources h2 { font-family:'DM Serif Display',Georgia,serif!important; font-weight:400!important; color:#043C50!important; }
.cx-option4-resources main > section:first-child { background:#FFFCF9; border-color:#f0e3dc; }
.cx-option4-resources main > section:first-child h1 { font-size:clamp(3rem,6vw,5.5rem)!important; }
.cx-option4-resources a:hover, .cx-option4-resources a:focus-visible { color:#D84312!important; }
.cx-option4-resources article { border-color:#f0e3dc; border-radius:24px; }
.cx-option4-resources article:hover { border-color:#e5b8a3; }
.cx-option4-resources article img { transition:transform .6s ease; }
.cx-option4-resources article:hover img { transform:scale(1.04); }
.cx-option4-resources article a > span:last-child { color:#D84312!important; }
@media(prefers-reduced-motion:reduce){.cx-option4-resources article img {transition:none!important;transform:none!important}}
`;

export default function ResourcesPage() {
  return <div className="cx-option4-resources">
    <style>{resourceTheme + `.cx-option4-resources main > section:first-child h1 { display:none!important; } .cx-option4-resources main > section:first-child h1 + p {margin-top:14px!important;}`}</style>
    <div className="bg-[#FFFCF9] px-5 pt-14 sm:pt-20"><div className="mx-auto max-w-[1220px]"><p className="!mb-3 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#D84312]">CONXPORT KNOWLEDGE HUB</p><h1 className="!mb-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(3rem,6vw,5.5rem)] font-normal leading-[1.05] tracking-[-.055em] !text-[#043C50]">Explore our <span className="italic !text-[#D84312]">resources.</span></h1></div></div>
    <CmsIndexPage kind="resource" title="Resources"/>
  </div>;
}
