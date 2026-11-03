import type { ReactNode } from 'react';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  aside?: ReactNode;
  className?: string;
};

export default function SectionHeading({
  eyebrow, title, description, align = 'left', tone = 'dark', aside, className = '',
}: Props) {
  return (
    <div className={`cx-section-heading cx-section-heading--${align} cx-section-heading--${tone} ${className}`.trim()}>
      <div className="cx-section-heading-copy">
        {eyebrow && <p className="cx-section-eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className="cx-section-description">{description}</p>}
      </div>
      {aside && <div className="cx-section-aside">{aside}</div>}
      <style>{`
        .cx-section-heading{display:flex;align-items:end;justify-content:space-between;gap:32px;margin-bottom:48px}
        .cx-section-heading-copy{max-width:850px}
        .cx-section-heading h2{font-family:Manrope,system-ui,sans-serif;font-size:clamp(2.4rem,5.4vw,5.9rem);line-height:1.08;letter-spacing:-.065em;font-weight:800;margin:12px 0 0}
        .cx-section-eyebrow{margin:0;color:#29b8ab;letter-spacing:.19em;text-transform:uppercase;font-size:12px;font-weight:800}
        .cx-section-description{font-size:clamp(15px,1.5vw,18px);line-height:1.85;max-width:680px;margin:24px 0 0;opacity:.78}
        .cx-section-heading--dark{color:#f6fafb}.cx-section-heading--light{color:#13242c}
        .cx-section-heading--center{text-align:center;justify-content:center;flex-direction:column;align-items:center}
        .cx-section-heading--center .cx-section-description{margin-left:auto;margin-right:auto}
        @media(max-width:700px){.cx-section-heading{align-items:start;flex-direction:column;margin-bottom:32px;gap:20px}}
      `}</style>
    </div>
  );
}
