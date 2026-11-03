import './admin-ui-fix.css';
import { useEffect, useState } from 'react';
import type { GeneralSettings } from '../../types/settings';
import { defaultGeneralSettings } from '../../types/settings';
import { getGeneralSettings, saveSiteSettings } from '../../services/siteSettings';

export default function SettingsPage() {
  const [form, setForm] = useState<GeneralSettings>(defaultGeneralSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let live = true;
    void getGeneralSettings()
      .then((data) => { if (live) setForm(data); })
      .catch((e) => { if (live) setError(e instanceof Error ? e.message : 'Unable to load settings'); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, []);

  function change<K extends keyof GeneralSettings>(key: K, value: GeneralSettings[K]) {
    setForm((old) => ({ ...old, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await saveSiteSettings('general', form);
      setMessage('General settings saved successfully.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="container" style={{ paddingBlock: '2rem 4rem' }}>
      <p className="cx-overline">CONXPORT / SETTINGS</p>
      <h1>General settings</h1>
      <p>Update business contact details that power the public contact page and admin references.</p>

      <div className="cx-form-card" style={{ marginTop: 24 }}>
        {loading ? <p>Loading settings…</p> : (
          <div className="cx-form-grid">
            {([
              ['companyName', 'Company name'],
              ['tagline', 'Tagline'],
              ['supportEmail', 'Support email'],
              ['supportPhone', 'Support phone'],
              ['whatsapp', 'WhatsApp number'],
              ['address', 'Address'],
              ['city', 'City'],
              ['country', 'Country'],
            ] as const).map(([key, label]) => (
              <label className="cx-label" key={key}>
                <span>{label}</span>
                <input className="cx-input" value={form[key]} onChange={(e) => change(key, e.target.value)} />
              </label>
            ))}

            {error && <p role="alert" className="cx-error">{error}</p>}
            {message && <p className="cx-success">{message}</p>}

            <div>
              <button type="button" className="cx-primary" disabled={saving} onClick={() => void save()}>{saving ? 'Saving…' : 'Save settings'}</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
