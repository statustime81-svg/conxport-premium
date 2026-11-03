import { useState, type FormEvent, type ChangeEvent } from 'react';
import type { CmsInput, CmsKind } from '../../../types/cms';
import { cmsSchema } from '../../../lib/validations/cms';
import CmsKindSelect from './CmsKindSelect';
import CmsPreview from './CmsPreview';
import { uploadCmsImage } from '../../../services/contentMedia';

export const initialCms: CmsInput = {
  kind: 'page',
  slug: '',
  title: '',
  excerpt: '',
  body: '',
  image_url: null,
  external_url: null,
  seo_title: '',
  seo_description: '',
  is_published: false,
};

export default function CmsEditorForm({ initial = initialCms, onSave, saving }: { initial?: CmsInput; onSave: (v: CmsInput) => Promise<void>; saving: boolean }) {
  const [v, setV] = useState<CmsInput>(initial);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  function change<K extends keyof CmsInput>(key: K, value: CmsInput[K]) {
    setV((s) => ({ ...s, [key]: value }));
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const publicUrl = await uploadCmsImage(file);
      change('image_url', publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Image upload failed');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const parsed = cmsSchema.safeParse(v);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid content');
      return;
    }
    setError('');
    try {
      await onSave(parsed.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    }
  }

  const inputFields: Array<{ key: keyof CmsInput; label: string; max?: number }> = [
    { key: 'title', label: 'Title' },
    { key: 'slug', label: 'Slug' },
    { key: 'excerpt', label: 'Excerpt', max: 500 },
    { key: 'external_url', label: 'External URL (optional)' },
    { key: 'seo_title', label: 'SEO title', max: 70 },
    { key: 'seo_description', label: 'SEO description', max: 180 },
  ];

  return (
    <div className="cx-admin-grid">
      <form onSubmit={(e) => void submit(e)} className="cx-form-card cx-form-grid">
        <CmsKindSelect value={v.kind} onChange={(x: CmsKind) => change('kind', x)} />

        {inputFields.map(({ key, label, max }) => (
          <label key={key} className="cx-label">
            <span>{label}</span>
            <input className="cx-input" value={(v[key] as string | null) ?? ''} onChange={(e) => change(key, e.target.value as never)} maxLength={max} />
          </label>
        ))}

        <div className="cx-label">
          <span>Featured image</span>
          <div className="cx-upload-strip">
            <input className="cx-input" placeholder="https://..." value={v.image_url ?? ''} onChange={(e) => change('image_url', e.target.value)} />
            <label className="cx-secondary-button" style={{ cursor: uploading ? 'wait' : 'pointer' }}>
              {uploading ? 'Uploading…' : 'Upload image'}
              <input type="file" accept="image/jpeg,image/png,image/webp" hidden disabled={uploading} onChange={(e) => void handleImageUpload(e)} />
            </label>
          </div>
          <small className="cx-field-note">For now images upload to the existing public bucket. Replace these later with your final real product and content images.</small>
        </div>

        <label className="cx-label">
          <span>Content body</span>
          <textarea rows={14} className="cx-input" value={v.body} onChange={(e) => change('body', e.target.value)} />
        </label>

        <label className="cx-checkbox-row">
          <input type="checkbox" checked={v.is_published} onChange={(e) => change('is_published', e.target.checked)} />
          <span>Publish immediately</span>
        </label>

        {error && <p role="alert" className="cx-error">{error}</p>}

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button disabled={saving || uploading} className="cx-primary" type="submit">{saving ? 'Saving…' : 'Save content'}</button>
        </div>
      </form>

      <div className="cx-form-card">
        <CmsPreview entry={v} />
      </div>
    </div>
  );
}
