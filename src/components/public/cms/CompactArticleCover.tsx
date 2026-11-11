import { useEffect, useState } from 'react';

type Props = { src?: string | null; alt: string; className?: string };

/** Compact, brand-matched cover for CMS article and resource pages. */
export default function CompactArticleCover({ src, alt, className = '' }: Props) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);
  if (!src || failed) return null;

  return (
    <figure className={`my-6 w-full overflow-hidden rounded-2xl border border-[#E0EAEE] bg-[#F1F7FA] p-3 sm:my-8 sm:p-5 ${className}`}>
      <div className="flex h-[220px] w-full items-center justify-center sm:h-[300px] lg:h-[340px]">
        <img src={src} alt={alt} loading="eager" decoding="async" onError={() => setFailed(true)} className="block h-full max-h-full w-full max-w-full object-contain" />
      </div>
    </figure>
  );
}
