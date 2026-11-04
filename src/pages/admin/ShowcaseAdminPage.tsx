import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { useParams } from 'react-router';
import {
  Check, ExternalLink, Film, Image as ImageIcon, LoaderCircle,
  Pencil, Plus, RotateCcw, Save, Trash2, UploadCloud, X,
} from 'lucide-react';
import { requireSupabase } from '../../lib/supabase/client';
import { safeImage, youtubeEmbed, type ShowcaseItem, type ShowcaseKind } from '../../services/showcase';

const supported: ShowcaseKind[] = ['testimonial', 'client', 'certificate', 'expo_photo', 'expo_video', 'faq'];
const names: Record<ShowcaseKind, string> = {
  testimonial: 'Testimonials',
  client: 'Client logos',
  certificate: 'Certificates',
  expo_photo: 'Expo gallery',
  expo_video: 'Product demonstrations & tutorials',
  faq: 'FAQ',
};

type EditorForm = {
  title: string;
  body: string;
  media_url: string;
  sort_order: number;
  is_published: boolean;
};
const makeEmpty = (): EditorForm => ({ title: '', body: '', media_url: '', sort_order: 0, is_published: true });
const inputClass = 'mt-2 block w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-600/10';

function videoThumbnail(value: string | null): string {
  const embed = youtubeEmbed(value || '');
  const id = embed.match(/\/embed\/([A-Za-z0-9_-]{11})/)?.[1];
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : '';
}

function fileTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
  return (base || 'Expo photo').slice(0, 180);
}

export default function ShowcaseAdminPage() {
  const { kind: raw } = useParams();
  const kind = supported.find(value => value === raw);
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<EditorForm>(makeEmpty);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    setEditing(null);
    setForm(makeEmpty());
    setSelectedName('');
    setNotice('');
    if (!kind) return;
    let active = true;
    void requireSupabase()
      .from('site_showcase')
      .select('*')
      .eq('kind', kind)
      .order('sort_order')
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setNotice(error.message);
        else setItems((data ?? []) as ShowcaseItem[]);
      });
    return () => { active = false; };
  }, [kind]);

  const videoPreview = useMemo(() => videoThumbnail(form.media_url), [form.media_url]);
  const photoPreview = kind === 'expo_photo' ? safeImage(form.media_url) : '';

  if (!kind) return <p className="p-6 text-rose-600">Invalid content category.</p>;

  const isPhoto = kind === 'expo_photo';
  const isVideo = kind === 'expo_video';
  const isFaq = kind === 'faq';

  async function reload() {
    if (!kind) return;
    const { data, error } = await requireSupabase().from('site_showcase').select('*').eq('kind', kind).order('sort_order');
    if (error) throw error;
    setItems((data ?? []) as ShowcaseItem[]);
  }

  function reset() {
    setEditing(null);
    setForm(makeEmpty());
    setSelectedName('');
  }

  function edit(item: ShowcaseItem) {
    setEditing(item.id);
    setForm({
      title: item.title || '',
      body: item.body || '',
      media_url: isFaq ? '' : (item.media_url || ''),
      sort_order: item.sort_order ?? 0,
      is_published: item.is_published,
    });
    setSelectedName('');
    setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function upload(file: File) {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const isPdf = kind === 'certificate' && ext === 'pdf' && file.type === 'application/pdf';
    const isImage = ['png', 'jpg', 'jpeg', 'webp'].includes(ext) && file.type.startsWith('image/');
    if (!isImage && !isPdf) throw new Error('Upload JPG, PNG or WebP. Certificates can also be PDF.');
    if (file.size > 8 * 1024 * 1024) throw new Error('File must be smaller than 8 MB.');
    const db = requireSupabase();
    const path = `showcase/${kind}/${crypto.randomUUID()}.${ext}`;
    const { error } = await db.storage.from('product-public').upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw error;
    return db.storage.from('product-public').getPublicUrl(path).data.publicUrl;
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setBusy(true);
    setNotice('');
    void upload(file)
      .then(url => {
        setSelectedName(file.name);
        setForm(current => ({
          ...current,
          media_url: url,
          title: isPhoto && !editing ? fileTitle(file.name) : current.title,
        }));
        setNotice('Image uploaded. Click Publish to add it to the gallery.');
      })
      .catch(error => setNotice(error instanceof Error ? error.message : String(error)))
      .finally(() => setBusy(false));
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!kind) return;
    setBusy(true);
    setNotice('');
    try {
      if (isPhoto && !safeImage(form.media_url)) throw new Error('Upload an Expo gallery image first.');
      if (isVideo && !youtubeEmbed(form.media_url)) throw new Error('Enter a valid YouTube video URL.');
      if (!isPhoto && !form.title.trim()) throw new Error('Title is required.');

      // Retain an internal title for existing DB schemas where title is NOT NULL.
      // The public Expo Gallery intentionally does not display this title.
      const data = {
        ...form,
        title: isPhoto ? (form.title.trim() || 'Expo photo') : form.title.trim(),
        body: isPhoto ? (editing ? form.body : '') : form.body,
        media_url: isFaq ? '' : form.media_url.trim(),
        kind,
      };
      const db = requireSupabase();
      const result = editing
        ? await db.from('site_showcase').update(data).eq('id', editing)
        : await db.from('site_showcase').insert(data);
      if (result.error) throw result.error;
      reset();
      await reload();
      setNotice('Saved successfully. Published items now appear on the website.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Unable to save.');
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this item permanently?')) return;
    setBusy(true);
    setNotice('');
    try {
      const { error } = await requireSupabase().from('site_showcase').delete().eq('id', id);
      if (error) throw error;
      if (editing === id) reset();
      await reload();
      setNotice('Item deleted.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Unable to delete.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full min-w-0 space-y-7 pb-12">
      <header className="overflow-hidden rounded-[28px] border border-[#dce9e5] bg-gradient-to-br from-white via-white to-[#eaf5f1] p-6 shadow-sm sm:p-8">
        <p className="!m-0 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0d6b5b]">CONXPORT / CONTENT MANAGER</p>
        <h1 className="!mb-0 mt-3 !font-sans !text-[clamp(1.65rem,3vw,2.45rem)] !font-bold !leading-tight !tracking-tight !text-[#112c34]">{names[kind]}</h1>
        <p className="!mb-0 mt-2 max-w-2xl text-sm leading-6 !text-slate-500">
          {isPhoto ? 'Upload exhibition photos and control their display order. No title or description needed.' : isVideo ? 'Manage product demonstration videos from YouTube, with instant thumbnail previews.' : 'Create and manage published content for your website.'}
        </p>
      </header>

      <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(310px,420px)_minmax(0,1fr)]">
        <form onSubmit={event => void save(event)} className="min-w-0 space-y-5 rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_18px_44px_-35px_rgba(15,23,42,.3)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="!m-0 !font-sans !text-lg !font-bold !text-slate-900">{editing ? 'Edit item' : isPhoto ? 'Add expo photo' : isVideo ? 'Add demonstration video' : 'Add content'}</h2>
            {editing && <button type="button" onClick={reset} aria-label="Cancel editing" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={18} /></button>}
          </div>

          {!isPhoto && (
            <>
              <label className="block text-sm font-semibold text-slate-700">
                {isFaq ? 'Question' : kind === 'testimonial' ? 'Reviewer name' : isVideo ? 'Video title' : 'Title'}
                <input required maxLength={200} value={form.title} onChange={event => setForm(current => ({ ...current, title: event.target.value }))} className={inputClass} placeholder={isVideo ? 'e.g. Digital pH Meter Demonstration' : ''} />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                {isFaq ? 'Answer' : kind === 'testimonial' ? 'Review text' : isVideo ? 'Video description' : 'Description'}
                <textarea rows={isVideo ? 5 : 4} maxLength={5000} value={form.body} onChange={event => setForm(current => ({ ...current, body: event.target.value }))} className={`${inputClass} resize-y`} placeholder={isVideo ? 'Describe the equipment, features and how it is used...' : ''} />
              </label>
            </>
          )}

          {isVideo && (
            <>
              <label className="block text-sm font-semibold text-slate-700">
                YouTube video URL
                <input required type="url" value={form.media_url} onChange={event => setForm(current => ({ ...current, media_url: event.target.value }))} placeholder="https://www.youtube.com/watch?v=..." className={inputClass} />
              </label>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
                {videoPreview ? <img src={videoPreview} alt="YouTube video thumbnail preview" className="aspect-video w-full object-cover" /> : <div className="flex aspect-video flex-col items-center justify-center gap-3 text-slate-300"><Film size={36} /><span className="text-xs">Paste a YouTube link to preview its thumbnail</span></div>}
              </div>
            </>
          )}

          {!isVideo && !isFaq && (
            <>
              {!isPhoto && (
                <label className="block text-sm font-semibold text-slate-700">
                  Image / document URL
                  <input type="url" value={form.media_url} onChange={event => setForm(current => ({ ...current, media_url: event.target.value }))} className={inputClass} placeholder="https://..." />
                </label>
              )}
              <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-teal-200 bg-[#f0f9f5] p-7 text-center transition hover:border-teal-500 hover:bg-[#e6f5ef]">
                {busy ? <LoaderCircle className="animate-spin text-[#0d6659]" size={30} /> : <UploadCloud className="text-[#0d6659]" size={30} />}
                <span className="text-sm font-bold text-[#164d44]">{busy ? 'Uploading...' : isPhoto ? 'Upload expo gallery image' : 'Upload image / certificate'}</span>
                <span className="text-xs text-slate-500">JPG, PNG, WebP {kind === 'certificate' ? 'or PDF' : ''} · Max 8 MB</span>
                <input type="file" className="sr-only" accept={kind === 'certificate' ? 'image/png,image/jpeg,image/webp,application/pdf' : 'image/png,image/jpeg,image/webp'} disabled={busy} onChange={handleFile} />
              </label>
              {selectedName && <p className="!m-0 break-all text-xs text-[#0d6659]">Selected: {selectedName}</p>}
              {photoPreview && <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2"><img src={photoPreview} alt="New expo gallery preview" className="max-h-72 w-full rounded-lg object-contain" /></div>}
            </>
          )}

          <label className="block text-sm font-semibold text-slate-700">
            Display order
            <input type="number" value={form.sort_order} onChange={event => setForm(current => ({ ...current, sort_order: Number(event.target.value) }))} className={inputClass} />
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-700">
            <input type="checkbox" checked={form.is_published} onChange={event => setForm(current => ({ ...current, is_published: event.target.checked }))} className="h-4 w-4 accent-[#0d6659]" />
            Published on website
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-[#0d5c4f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#09483e] disabled:opacity-50">
              {busy ? <LoaderCircle className="animate-spin" size={17} /> : <Save size={17} />}{editing ? 'Save changes' : 'Publish'}
            </button>
            <button type="button" onClick={reset} disabled={busy} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"><RotateCcw size={15} /> Clear</button>
          </div>
          {notice && <p role="status" className="!m-0 break-words rounded-xl bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-700">{notice}</p>}
        </form>

        <section className="min-w-0 rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_18px_44px_-35px_rgba(15,23,42,.3)] sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="!m-0 flex items-center gap-2 !font-sans !text-lg !font-bold !text-slate-900"><Plus size={19} /> Existing items <span className="rounded-full bg-[#eaf6f1] px-2.5 py-1 text-xs text-[#0d5c4f]">{items.length}</span></h2>
            <span className="text-xs text-slate-500">Sorted by display order</span>
          </div>
          <div className={isPhoto ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3' : 'space-y-3'}>
            {items.map(item => {
              const photo = safeImage(item.media_url);
              const thumbnail = isVideo ? videoThumbnail(item.media_url) : '';
              return (
                <article key={item.id} className={`min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-teal-200 hover:shadow-md ${isPhoto ? 'flex flex-col' : 'flex flex-wrap items-center gap-4 p-3 sm:p-4'}`}>
                  {isPhoto ? (
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">{photo ? <img src={photo} alt="Expo gallery photo" loading="lazy" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-slate-400"><ImageIcon size={32} /></div>}</div>
                  ) : thumbnail ? (
                    <img src={thumbnail} loading="lazy" alt="Video thumbnail" className="aspect-video w-32 shrink-0 rounded-xl object-cover sm:w-40" />
                  ) : null}
                  <div className={`min-w-0 flex-1 ${isPhoto ? 'p-3' : ''}`}>
                    {!isPhoto && <h3 className="!m-0 break-words !font-sans !text-sm !font-bold !leading-6 !text-[#132f36]">{item.title}</h3>}
                    {!isPhoto && item.body && <p className="!mb-0 mt-1 line-clamp-2 break-words text-xs leading-5 !text-slate-500">{item.body}</p>}
                    <p className="!mb-0 mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                      <span className={item.is_published ? 'text-[#0d6659]' : 'text-amber-600'}>{item.is_published ? <Check size={13} className="mr-1 inline" /> : null}{item.is_published ? 'Published' : 'Draft'}</span>
                      <span>· Order {item.sort_order}</span>
                    </p>
                    <div className={`flex items-center gap-2 ${isPhoto ? 'mt-3' : 'mt-3'}`}>
                      <button type="button" onClick={() => edit(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"><Pencil size={14} /> Edit</button>
                      {isVideo && item.media_url && <a href={item.media_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700"><ExternalLink size={14} /> Link</a>}
                      <button type="button" onClick={() => void remove(item.id)} disabled={busy} aria-label={`Delete item ${item.id}`} className="ml-auto inline-flex items-center justify-center rounded-lg border border-rose-100 p-2 text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </article>
              );
            })}
            {!items.length && <p className="!m-0 col-span-full rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">Nothing here yet. Use the form to publish the first item.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
