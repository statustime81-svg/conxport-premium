import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { ImagePlus, LoaderCircle, Save, Trash2, X } from 'lucide-react';
import { categorySchema } from '../../../lib/validations/adminCategory';
import { saveCategory, uploadCategoryImage, type CategoryRecord } from '../../../services/adminCategories';

type Props = {
  categories: CategoryRecord[];
  editing: CategoryRecord | null;
  onSaved: () => void;
  onCancel: () => void;
};

const field = 'mt-2 block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#17333b] outline-none transition focus:border-[#0d7463] focus:ring-2 focus:ring-[#0d7463]/15';
const label = 'block text-sm font-semibold text-[#233b43]';

export default function CategoryForm({ categories, editing, onSaved, onCancel }: Props) {
  const [name, setName] = useState(editing?.name ?? '');
  const [slug, setSlug] = useState(editing?.slug ?? '');
  const [description, setDescription] = useState(editing?.description ?? '');
  const [parent, setParent] = useState(editing?.parent_id ?? '');
  const [published, setPublished] = useState(editing?.is_published ?? false);
  const [imageUrl, setImageUrl] = useState<string | null>(editing?.image_url ?? null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!imageFile) { setPreview(null); return; }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  function selectImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Upload a JPG, PNG or WebP image.'); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5 MB.'); return;
    }
    setImageFile(file);
    setError('');
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setError('');
    const result = categorySchema.safeParse({ name, slug, description, parent_id: parent || null, is_published: published, image_url: imageUrl });
    if (!result.success) { setError(result.error.issues[0]?.message ?? 'Invalid category'); return; }
    setBusy(true);
    try {
      // Save category first to obtain a stable ID for the storage object.
      const id = await saveCategory(result.data, editing?.id);
      if (imageFile) {
        const url = await uploadCategoryImage(imageFile, id);
        await saveCategory({ ...result.data, image_url: url }, id);
        setImageUrl(url);
        setImageFile(null);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save category');
    } finally { setBusy(false); }
  }

  return (
    <form onSubmit={(e) => void submit(e)} className="w-full min-w-0 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div><h2 className="m-0 !font-sans text-xl font-extrabold !text-[#17333b]">{editing ? 'Edit category' : 'Add new category'}</h2><p className="mb-0 mt-1 !text-sm !text-slate-500">Manage category information and its display image.</p></div>
        <button type="button" onClick={onCancel} disabled={busy} aria-label="Close form" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={20} /></button>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.65fr)]">
        <div className="min-w-0 space-y-5">
          <label className={label}>Category name<input required maxLength={120} className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Hospital Furniture" /></label>
          <label className={label}>URL slug<input required maxLength={120} className={field} value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} placeholder="hospital-furniture" /></label>
          <label className={label}>Description<textarea rows={4} maxLength={1200} className={`${field} resize-y`} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What products belong in this category?" /></label>
          <label className={label}>Parent category<select className={field} value={parent} onChange={(e) => setParent(e.target.value)}><option value="">Top level (main category)</option>{categories.filter((category) => category.id !== editing?.id && !category.parent_id).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
          <label className="flex items-center gap-3 text-sm font-semibold text-[#233b43]"><input type="checkbox" className="h-4 w-4 accent-[#0d5c4f]" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Published on website</label>
        </div>
        <div className="min-w-0">
          <span className={label}>Category image</span>
          <div className="mt-2 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {preview || imageUrl ? <img src={preview || imageUrl || ''} alt="Category preview" className="h-full w-full object-cover" /> : <div className="flex flex-col items-center gap-2 text-slate-400"><ImagePlus size={38} /><span className="text-xs">No image uploaded</span></div>}
          </div>
          <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#eaf5f1] px-4 py-3 text-sm font-bold text-[#0d5c4f] transition hover:bg-[#daeee7]">
            <ImagePlus size={18} /> {imageUrl || preview ? 'Replace image' : 'Upload image'}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={selectImage} disabled={busy} />
          </label>
          {(preview || imageUrl) && <button type="button" disabled={busy} onClick={() => { setImageFile(null); setImageUrl(null); }} className="ml-2 inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-red-600 hover:text-red-700"><Trash2 size={15} /> Remove</button>}
          <p className="mt-3 !text-xs !leading-5 !text-slate-500">JPG, PNG or WebP, maximum 5 MB. Image appears on category cards after publishing.</p>
        </div>
      </div>
      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 !text-sm !text-red-700">{error}</p>}
      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
        <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-[#0d5c4f] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[#08483e] disabled:opacity-60">{busy ? <LoaderCircle size={17} className="animate-spin" /> : <Save size={17} />}{busy ? 'Saving category…' : 'Save category'}</button>
        <button type="button" disabled={busy} onClick={onCancel} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
      </div>
    </form>
  );
}
