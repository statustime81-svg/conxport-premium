import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import CmsShell from './CmsShell';
import CmsTable from './CmsTable';
import CmsSummary from './CmsSummary';
import CmsNotice from './CmsNotice';
import { listCmsAdmin, removeCmsEntry } from '../../../services/cmsAdmin';
import type { CmsEntry, CmsKind } from '../../../types/cms';

export default function CmsCollectionPage({ kind, title, description }: { kind?: CmsKind; title: string; description: string }) {
  const [items, setItems] = useState<CmsEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setBusy(true);
    try {
      setItems(await listCmsAdmin(kind));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Load failed');
    } finally {
      setBusy(false);
    }
  }, [kind]);

  useEffect(() => { void load(); }, [load]);

  async function remove(id: string) {
    if (!window.confirm('Delete this content permanently?')) return;
    try {
      await removeCmsEntry(id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    }
  }

  const rows = useMemo(() => items, [items]);

  return (
    <CmsShell title={title} description={description}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/admin/content/new" className="cx-primary">Create content</Link>
        <Link to="/admin/content" className="cx-secondary-button">View all content</Link>
      </div>
      <CmsNotice error={error} loading={busy} />
      <CmsSummary items={items} />
      <CmsTable rows={rows} onDelete={(id) => void remove(id)} />
    </CmsShell>
  );
}
