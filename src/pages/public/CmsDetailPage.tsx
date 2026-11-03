import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CmsBody from '../../components/public/cms/CmsBody';
import { getCmsPublic } from '../../services/cmsPublic';
import type { CmsEntry, CmsKind } from '../../types/cms';
import { useDocumentMeta } from '../../seo/useDocumentMeta';
import { articleSchema } from '../../seo/structuredData';

type Props = { kind: CmsKind; slugOverride?: string };

export default function CmsDetailPage({ kind, slugOverride }: Props) {
  const { slug } = useParams();
  const [item, setItem] = useState<CmsEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <section role="status" className="mx-auto max-w-[920px] px-5 py-20 text-slate-600">Loading article…</section>;
  if (error) return <section role="alert" className="mx-auto max-w-[920px] px-5 py-20 text-red-700">{error}</section>;
  if (!item) return <section className="mx-auto max-w-[920px] px-5 py-20 text-slate-600">This content is unavailable.</section>;

  return <CmsBody entry={item} />;
}
