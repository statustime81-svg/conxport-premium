import { useState } from 'react';


type Props = {
  src?: string | null;
  alt: string;
  className?: string;
};

/** A readable, compact cover for CMS blog and case-study detail pages. */
export default function CompactArticleCover({ src, alt, className = '' }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;

  return (
    <figure className={`my-6 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white sm:my-8 ${className}`}>
      <div className="flex h-[220px] w-full items-center justify-center bg-[#F1F7FA] p-3 sm:h-[280px] sm:p-5 lg:h-[320px]">
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
          className="block h-full max-h-full w-full max-w-full object-contain"
        />
      </div>
    </figure>
  );
}
