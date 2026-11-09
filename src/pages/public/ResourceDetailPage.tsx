import CmsDetailPage from './CmsDetailPage';

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

export default function ResourceDetailPage() {
  return <div className="cx-option4-resources"><style>{resourceTheme + `.cx-option4-resources article > div > h1 { font-family:'DM Serif Display',Georgia,serif!important; font-weight:400!important; font-size:clamp(2.6rem,5vw,4.6rem)!important; color:#043C50!important; }`}</style><CmsDetailPage kind="resource"/></div>;
}
