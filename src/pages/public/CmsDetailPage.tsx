import { useEffect, useState } from 'react';
import BlogDetailPage from './BlogDetailPage';
import { Link, useParams } from 'react-router';
import { ArrowLeft, FileText } from 'lucide-react';
import CmsBody from '../../components/public/cms/CmsBody';
import { getCmsPublic } from '../../services/cmsPublic';
import type { CmsEntry, CmsKind } from '../../types/cms';
import { useDocumentMeta } from '../../seo/useDocumentMeta';
import { articleSchema } from '../../seo/structuredData';

type Props = { kind: CmsKind; slugOverride?: string };

export default function CmsDetailPage({ kind, slugOverride }: Props) {
  if (kind === 'blog' && !slugOverride) return <BlogDetailPage />;
  return <CmsDetailOther kind={kind} slugOverride={slugOverride} />;
}

function CmsDetailOther({ kind, slugOverride }: Props) {
  const { slug } = useParams();
  const [item, setItem] = useState<CmsEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const collectionHref = kind === 'case_study' ? '/case-studies' : kind === 'blog' ? '/blog' : '/resources';

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setItem(null);
    void getCmsPublic(kind, slugOverride ?? slug ?? '')
      .then((result) => { if (active) setItem(result); })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : 'Unable to load content');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [kind, slug, slugOverride]);

  useDocumentMeta(
    item
      ? {
          title: `${item.title} | ConXport`,
          description: item.seo_description || item.excerpt || item.title,
          canonicalPath: kind === 'page'
            ? `/${item.slug}`
            : `/${kind === 'case_study' ? 'case-studies' : kind === 'resource' ? 'resources' : 'blog'}/${item.slug}`,
          type: kind === 'blog' ? 'article' : 'website',
        }
      : {
          title: 'Content | ConXport',
          description: 'ConXport information and resources.',
          noindex: !loading && !item,
        },
    item && kind === 'blog' ? articleSchema(item) : undefined,
  );

  if (loading) return (
    <section role="status" className="min-h-[50vh] bg-[#F1F7FA] px-5 py-20 text-center font-['Manrope',system-ui,sans-serif]">
      <div className="mx-auto h-9 w-9 animate-spin rounded-full border-[3px] border-[#CBDCE4] border-t-[#D84312]" aria-hidden="true" />
      <p className="!mt-4 !text-sm !font-bold !text-[#043C50]">Loading content…</p>
    </section>
  );
  if (error || !item) return (
    <section role={error ? 'alert' : undefined} className="min-h-[50vh] bg-[#F1F7FA] px-5 py-20 text-center font-['Manrope',system-ui,sans-serif]">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#D84312]"><FileText size={30} aria-hidden="true" /></div>
      <h1 className="!m-0 !text-2xl !font-extrabold !text-[#043C50]">{error ? 'Unable to load content' : 'Content unavailable'}</h1>
      <p className="!mx-auto !mt-3 max-w-[530px] !text-sm !leading-relaxed !text-[#59717D]">{error || 'This resource may not be published or may no longer be available.'}</p>
      <Link to={collectionHref} className="mt-6 inline-flex items-center gap-2 rounded-full !bg-[#D84312] px-5 py-3 text-sm font-bold !text-white no-underline hover:!bg-[#043C50]"><ArrowLeft size={16} /> Back to collection</Link>
    </section>
  );

  return <CmsBody entry={item} />;
}
