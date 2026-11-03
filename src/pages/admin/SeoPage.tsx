import './admin-ui-fix.css';
import { useEffect, useState } from 'react';
import type { SeoSettings } from '../../types/settings';
import { defaultSeoSettings } from '../../types/settings';
import { getSeoSettings, saveSiteSettings } from '../../services/siteSettings';

export default function SeoPage() {
  const [form, setForm] = useState<SeoSettings>(defaultSeoSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let live = true;
    void getSeoSettings()
      .then((data) => { if (live) setForm(data); })
      .catch((e) => { if (live) setError(e instanceof Error ? e.message : 'Unable to load SEO settings'); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, []);

  function change<K extends keyof SeoSettings>(key: K, value: SeoSettings[K]) {
    setForm((old) => ({ ...old, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await saveSiteSettings('seo', form);
      setMessage('SEO settings saved successfully.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="container" style={{ paddingBlock: '2rem 4rem' }}>
      <p className="cx-overline">CONXPORT / SEO</p>
      <h1>SEO defaults</h1>
      <p>Set site-wide metadata defaults. Page-level CMS SEO fields can still override these values when needed.</p>

      <div className="cx-form-card" style={{ marginTop: 24 }}>
        {loading ? <p>Loading SEO settings…</p> : (
          <div className="cx-form-grid">
            <label className="cx-label"><span>Site title</span><input className="cx-input" value={form.siteTitle} onChange={(e) => change('siteTitle', e.target.value)} /></label>
            <label className="cx-label"><span>Site URL</span><input className="cx-input" value={form.siteUrl} onChange={(e) => change('siteUrl', e.target.value)} /></label>
            <label className="cx-label" style={{ gridColumn: '1 / -1' }}><span>Site description</span><textarea rows={4} className="cx-input" value={form.siteDescription} onChange={(e) => change('siteDescription', e.target.value)} /></label>
            <label className="cx-label" style={{ gridColumn: '1 / -1' }}><span>Default Open Graph image URL</span><input className="cx-input" value={form.defaultOgImage} onChange={(e) => change('defaultOgImage', e.target.value)} /></label>
            <label className="cx-checkbox-row"><input type="checkbox" checked={form.robotsIndex} onChange={(e) => change('robotsIndex', e.target.checked)} /><span>Allow search engines to index the site</span></label>
            {error && <p role="alert" className="cx-error">{error}</p>}
            {message && <p className="cx-success">{message}</p>}
            <div><button type="button" className="cx-primary" disabled={saving} onClick={() => void save()}>{saving ? 'Saving…' : 'Save SEO settings'}</button></div>
          </div>
        )}
      </div>
    </section>
  );
}
