import { useEffect, useState, type FormEvent } from 'react';
import { ImagePlus, PackageCheck, Save, AlertCircle } from 'lucide-react';
import { adminProductSchema, type AdminProductInput } from '../../../lib/validations/adminProduct';
import { listAdminCategories, saveAdminProduct, type AdminCategory, type AdminProduct } from '../../../services/adminProducts';
import { uploadProductImage } from '../../../services/productMedia';
import CategorySelector from './CategorySelector';
import ProductImageUploader from './ProductImageUploader';

type Props = { product?: AdminProduct | null; onSaved: (id: string) => void };
const field = 'mt-2 block !w-full !min-w-0 rounded-xl border border-slate-200 !bg-white px-4 py-3 text-[14px] !text-slate-800 shadow-sm outline-none transition focus:!border-teal-600 focus:ring-4 focus:ring-teal-600/10 disabled:opacity-60';
const label = 'block min-w-0 text-[13px] font-semibold !text-slate-700';

function blank(): AdminProductInput {
  return { name: '', slug: '', sku: '', summary: '', description: '', primary_category_id: null, is_published: false };
}

export default function ProductForm({ product, onSaved }: Props) {
  const [form, setForm] = useState<AdminProductInput>(() => product ? {
    name: product.name, slug: product.slug, sku: product.sku,
    summary: product.summary ?? '', description: product.description ?? '',
    primary_category_id: product.primary_category_id, is_published: product.is_published,
  } : blank());
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [savedId, setSavedId] = useState<string | undefined>(product?.id);

  useEffect(() => {
    let active = true;
    listAdminCategories().then(value => { if (active) setCategories(value); })
      .catch(e => { if (active) setError(e instanceof Error ? e.message : 'Could not load categories'); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!pendingImage) { setPreviewUrl(''); return; }
    const url = URL.createObjectURL(pendingImage);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingImage]);

  const update = <K extends keyof AdminProductInput>(key: K, value: AdminProductInput[K]) =>
    setForm(current => ({ ...current, [key]: value }));

  function selectImage(file: File | undefined) {
    if (!file) return;
    const valid = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
    if (!valid || file.size === 0 || file.size > 10 * 1024 * 1024) {
      setError('Choose a JPG, PNG or WebP image under 10 MB.');
      return;
    }
    setError('');
    setPendingImage(file);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const validated = adminProductSchema.safeParse(form);
    if (!validated.success) {
      setError(validated.error.issues[0]?.message ?? 'Please check the product information.');
      return;
    }
    setSaving(true);
    try {
      // Save the product first so a new product has a real UUID for its storage path.
      const id = await saveAdminProduct(validated.data, savedId);
      setSavedId(id);
      if (pendingImage) {
        try {
          await uploadProductImage(id, pendingImage);
          setPendingImage(null);
        } catch (imageError) {
          setError(`Product saved, but image upload failed: ${imageError instanceof Error ? imageError.message : 'Unknown error'}. Try Save again to retry the image.`);
          return;
        }
      }
      onSaved(id);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Product could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full min-w-0 space-y-6 pb-10 font-['Manrope',sans-serif]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[.16em] !text-teal-700">Product management</p>
          <h2 className="!m-0 !font-['Manrope',sans-serif] !text-[clamp(1.55rem,2.5vw,2.2rem)] !font-extrabold !tracking-tight !text-slate-900">
            {product ? 'Edit product' : 'Add new product'}
          </h2>
          <p className="!mb-0 mt-2 !text-sm !text-slate-500">Manage product information, images and publication status.</p>
        </div>
        <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ${form.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
          {form.is_published ? 'Published' : 'Draft'}
        </span>
      </div>

      {error && <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"><AlertCircle size={18} className="mt-0.5 shrink-0" />{error}</div>}

      <form onSubmit={e => void submit(e)} className="!block w-full min-w-0 space-y-6" noValidate>
        <section className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,42,50,0.04)] sm:p-7">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700"><PackageCheck size={20} /></div>
            <div><h3 className="!m-0 !text-lg !font-extrabold !text-slate-900">Product details</h3><p className="!m-0 !text-xs !text-slate-500">Basic catalogue information</p></div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            <label className={label}>Product name *
              <input className={field} required maxLength={160} value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Electric ICU Bed" />
            </label>
            <label className={label}>SKU / Model identifier *
              <input className={field} required maxLength={80} value={form.sku} onChange={e => update('sku', e.target.value)} placeholder="e.g. CX-ICU-001" />
            </label>
            <label className={`${label} md:col-span-2`}>URL slug *
              <input className={field} required maxLength={160} value={form.slug} onChange={e => update('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} placeholder="electric-icu-bed" />
            </label>
            <label className={`${label} md:col-span-2`}>Short summary
              <textarea className={`${field} min-h-[100px] resize-y`} rows={3} maxLength={600} value={form.summary} onChange={e => update('summary', e.target.value)} />
            </label>
            <label className={`${label} md:col-span-2`}>Full description
              <textarea className={`${field} min-h-[180px] resize-y`} rows={7} maxLength={10000} value={form.description} onChange={e => update('description', e.target.value)} />
            </label>
            <div className="min-w-0 md:col-span-2 [&_.cx-field]:!block [&_label]:!block [&_select]:!mt-2 [&_select]:!block [&_select]:!w-full [&_select]:!rounded-xl [&_select]:!border [&_select]:!border-slate-200 [&_select]:!bg-white [&_select]:!px-4 [&_select]:!py-3 [&_select]:!text-slate-800">
              <CategorySelector categories={categories} value={form.primary_category_id ?? ''} onChange={value => update('primary_category_id', value || null)} disabled={saving} />
            </div>
          </div>
        </section>

        <section className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,42,50,0.04)] sm:p-7">
          <div className="mb-5 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700"><ImagePlus size={21} /></div><div><h3 className="!m-0 !text-lg !font-extrabold !text-slate-900">Product images</h3><p className="!m-0 !text-xs !text-slate-500">JPG, PNG or WebP, maximum 10 MB per image</p></div></div>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center transition hover:border-teal-400 hover:bg-teal-50/40 sm:p-8">
            {previewUrl ? <img src={previewUrl} alt="Selected product preview" className="max-h-52 w-full object-contain" /> : <ImagePlus size={35} className="text-teal-700" />}
            <span className="text-sm font-bold text-slate-800">{pendingImage ? pendingImage.name : 'Choose product image'}</span>
            <span className="text-xs text-slate-500">{pendingImage ? 'Image will upload when you click Save product' : 'Select an image from your computer'}</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" disabled={saving} className="sr-only" onChange={e => selectImage(e.target.files?.[0])} />
          </label>
          {pendingImage && <button type="button" className="mt-3 text-xs font-bold text-red-600 hover:underline" onClick={() => setPendingImage(null)}>Clear selected image</button>}
          {product?.id && <ProductImageUploader productId={product.id} />}
        </section>

        <section className="rounded-[22px] border border-slate-200 bg-white p-5 sm:p-7">
          <label className="flex cursor-pointer items-center gap-3 !text-slate-900">
            <input type="checkbox" className="!h-5 !w-5 !shrink-0 accent-teal-700" checked={form.is_published} onChange={e => update('is_published', e.target.checked)} disabled={saving} />
            <span className="text-sm font-bold">Publish product on website</span>
          </label>
          <p className="!mb-0 mt-3 !text-xs !leading-6 !text-slate-500">Only published products appear in the public catalogue. Confirm specifications and photos before publishing.</p>
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl !bg-[#07546B] px-6 py-3.5 text-sm font-extrabold !text-white transition hover:!bg-[#053F52] disabled:cursor-not-allowed disabled:opacity-60">
            <Save size={18} />{saving ? 'Saving...' : 'Save product'}
          </button>
        </div>
      </form>
    </div>
  );
}
