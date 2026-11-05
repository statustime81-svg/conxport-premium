import { useEffect, useState, type FormEvent } from 'react';
import { ImagePlus, Pencil, Trash2 } from 'lucide-react';
import { deleteHomeService, getHomeServices, saveHomeService, type HomeService } from '../../services/homeServices';

export default function HomeServicesAdminPage() {
  const [items, setItems] = useState<HomeService[]>([]);
  const [editing, setEditing] = useState<HomeService | null>(null);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function refresh() {
    setItems(await getHomeServices());
  }

  useEffect(() => {
    let active = true;
    void getHomeServices()
      .then((list) => { if (active) setItems(list); })
      .catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'Could not load services. Run the supplied SQL migration.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!image) { setPreview(editing?.image_url ?? ''); return; }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image, editing]);

  function reset() {
    setEditing(null);
    setTitle('');
    setImage(null);
    setError('');
  }

  function edit(item: HomeService) {
    setEditing(item);
    setTitle(item.title);
    setImage(null);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(''); setNotice(''); setBusy(true);
    try {
      await saveHomeService({ id: editing?.id, title, image: image ?? undefined, currentImage: editing?.image_url });
      await refresh();
      reset();
      setNotice('Service saved. It is now shown on the homepage.');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to save service.');
    } finally { setBusy(false); }
  }

  async function remove(item: HomeService) {
    if (!window.confirm(`Delete service "${item.title}"?`)) return;
    setBusy(true); setError(''); setNotice('');
    try {
      await deleteHomeService(item.id);
      await refresh();
      if (editing?.id === item.id) reset();
      setNotice('Service deleted.');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to delete service.'); }
    finally { setBusy(false); }
  }

  return (
    <section className="mx-auto w-full max-w-[1250px] space-y-7 py-6 font-['Manrope',system-ui,sans-serif]">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.2em] !text-[#07546B]">CONXPORT / CONTENT</p>
        <h1 className="!m-0 font-['DM_Serif_Display',Georgia,serif] text-4xl !text-[#102D3C]">Our Services</h1>
        <p className="mb-0 mt-3 text-sm !text-[#596670]">Only a service image and title are needed. Changes appear automatically on the homepage beneath About Us.</p>
      </header>

      <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(310px,410px)_minmax(0,1fr)]">
        <form onSubmit={(event) => void save(event)} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="!m-0 font-['Manrope',system-ui,sans-serif] text-lg font-extrabold !text-[#102D3C]">{editing ? 'Edit Service' : 'Add Service'}</h2>
          <label className="block text-sm font-semibold !text-[#102D3C]">
            Service Title
            <input required maxLength={120} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Hospital Equipment Supply" className="mt-2 w-full rounded-xl border border-[#d9e5ec] bg-white px-4 py-3 text-[#102D3C] outline-none focus:border-[#07546B]" />
          </label>
          <label className="block cursor-pointer rounded-2xl border border-dashed border-[#9fc4ce] bg-[#F1F7FA] p-4 text-sm font-semibold !text-[#07546B]">
            <span className="flex items-center gap-2"><ImagePlus size={19} /> {editing ? 'Replace Image (optional)' : 'Upload Service Image'}</span>
            <span className="mt-1 block text-xs font-normal text-[#596670]">JPG, PNG or WebP, maximum 10 MB</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" className="mt-3 block w-full min-w-0 text-xs text-[#102D3C] file:mr-3 file:rounded-full file:border-0 file:bg-[#07546B] file:px-3 file:py-2 file:font-bold file:text-white" onChange={(event) => setImage(event.target.files?.[0] ?? null)} />
          </label>
          {preview && <img src={preview} alt="Service preview" className="aspect-[4/3] w-full rounded-xl border border-[#d9e5ec] object-cover" />}
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm !text-red-700">{error}</p>}
          {notice && <p role="status" className="rounded-lg bg-[#E7F5F7] p-3 text-sm !text-[#07546B]">{notice}</p>}
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={busy || !title.trim() || (!image && !editing)} className="rounded-full bg-[#07546B] px-6 py-3 text-sm font-bold !text-white transition-colors hover:bg-[#FF4F18] disabled:cursor-not-allowed disabled:opacity-50">{busy ? 'Saving…' : editing ? 'Update Service' : 'Add Service'}</button>
            {editing && <button type="button" onClick={reset} disabled={busy} className="rounded-full border border-[#d9e5ec] px-5 py-3 text-sm font-bold !text-[#102D3C]">Cancel</button>}
          </div>
        </form>

        <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="mb-5 font-['Manrope',system-ui,sans-serif] text-lg font-extrabold !text-[#102D3C]">Current Services ({items.length})</h2>
          {loading ? <p>Loading services…</p> : items.length === 0 ? <p className="text-sm !text-[#596670]">No services yet. Add your first service using the form.</p> : (
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => <article key={item.id} className="overflow-hidden rounded-2xl border border-[#d9e5ec]">
                <img src={item.image_url} alt={item.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="p-4"><h3 className="!m-0 break-words font-['Manrope',system-ui,sans-serif] text-base font-bold !text-[#102D3C]">{item.title}</h3>
                  <div className="mt-4 flex gap-2"><button type="button" disabled={busy} onClick={() => edit(item)} className="inline-flex items-center gap-2 rounded-full border border-[#d9e5ec] px-3 py-2 text-xs font-bold !text-[#07546B]"><Pencil size={14} /> Edit</button>
                    <button type="button" disabled={busy} onClick={() => void remove(item)} className="inline-flex items-center gap-2 rounded-full border border-red-100 px-3 py-2 text-xs font-bold !text-red-600"><Trash2 size={14} /> Delete</button></div>
                </div>
              </article>)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
