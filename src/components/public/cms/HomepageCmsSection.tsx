import { useEffect, useState } from 'react';
import { getHomepageBlock } from '../../../services/cmsHomepage';
import type { CmsEntry } from '../../../types/cms';

/** Original CMS fetch, slug and body preserved; styling is homepage-only. */
export default function HomepageCmsSection({ slug }: { slug: string }) {
  const [data, setData] = useState<CmsEntry | null>(null);
  useEffect(() => {
    let alive = true;
    void getHomepageBlock(slug).then((entry) => {
      if (alive) setData(entry);
    }).catch(() => {});
    return () => { alive = false; };
  }, [slug]);
  if (!data) return null;
  return (
    <section className="cx-home-cms relative overflow-hidden bg-white py-20 sm:py-24" aria-label="ConXport homepage information">
      <div className="container relative z-10 !max-w-[1380px]">
        <p className="!mb-5 inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#D84312]">
          <span aria-hidden="true" className="h-[2px] w-8 bg-[#D84312]" /> CONXPORT
        </p>
        <h2 className="!mb-5 max-w-5xl font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.8rem,5vw,5.6rem)] font-normal leading-[1.08] tracking-[-.05em] !text-[#043C50]">{data.title}</h2>
        <p className="!mb-5 max-w-3xl font-['Manrope',system-ui,sans-serif] text-[16px] leading-[1.85] !text-[#5F7280]">{data.excerpt}</p>
        <div className="max-w-5xl whitespace-pre-wrap font-['Manrope',system-ui,sans-serif] text-[15px] leading-[1.9] text-[#5F7280]">{data.body}</div>
      </div>
    </section>
  );
}
