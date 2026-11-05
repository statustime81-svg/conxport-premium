import { useCallback, useEffect, useMemo, useState } from 'react';
import { FolderOpen, ImageIcon, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import CategoryForm from '../../components/admin/categories/CategoryForm';
import {
  listCategories,
  removeCategory,
  type CategoryRecord,
} from '../../services/adminCategories';

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<CategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<CategoryRecord | null | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'main' | 'sub'>('all');

  const refresh = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      setRows(await listCategories());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cannot load categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const visible = useMemo(() => rows.filter((category) => {
    const matchesText = `${category.name} ${category.slug}`.toLowerCase().includes(search.trim().toLowerCase());
    const matchesType = filter === 'all' || (filter === 'main' ? !category.parent_id : Boolean(category.parent_id));
    return matchesText && matchesType;
  }), [rows, search, filter]);

  const mainCount = rows.filter((row) => !row.parent_id).length;
  const subCount = rows.length - mainCount;

  const openEditor = (category: CategoryRecord | null) => {
    setEditing(category);
    window.requestAnimationFrame(() => {
      document.getElementById('category-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  async function remove(category: CategoryRecord) {
    if (!window.confirm(`Delete ${category.name}? Linked products or subcategories can prevent deletion.`)) return;
    try {
      await removeCategory(category.id);
      if (editing?.id === category.id) setEditing(undefined);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <section className="w-full min-w-0 pb-12 font-sans text-[#17333b]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-1 !text-[11px] font-extrabold uppercase tracking-[.16em] !text-[#07546B]">Catalogue / Categories</p>
          <h1 className="!m-0 !font-sans !text-[26px] !font-extrabold !leading-tight !tracking-[-.03em] !text-[#17333b] sm:!text-[30px]">Category management</h1>
          <p className="!mb-0 !mt-2 !text-[13px] !text-slate-500">Manage categories, subcategories and cover images.</p>
        </div>
        <button type="button" onClick={() => openEditor(null)} className="inline-flex shrink-0 items-center gap-2 rounded-xl !bg-[#07546B] px-4 py-2.5 text-[13px] font-bold !text-white shadow-sm transition hover:-translate-y-0.5 hover:!bg-[#053F52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"><Plus size={17} /> Add category</button>
      </div>

      {editing !== undefined && (
        <div className="mb-6 scroll-mt-28" id="category-editor">
          <CategoryForm key={editing?.id ?? 'new'} categories={rows} editing={editing} onCancel={() => setEditing(undefined)} onSaved={() => { setEditing(undefined); void refresh(); }} />
        </div>
      )}

      {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 !text-sm !text-red-700">{error}</p>}

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e0eae8] bg-white p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold text-slate-600">
          <span className="rounded-lg bg-[#E7F5F7] px-3 py-2 !text-[#07546B]">All: {rows.length}</span>
          <span className="rounded-lg bg-slate-50 px-3 py-2">Main: {mainCount}</span>
          <span className="rounded-lg bg-slate-50 px-3 py-2">Subcategories: {subCount}</span>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <label className="relative min-w-0 flex-1 sm:w-[240px] sm:flex-none">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <span className="sr-only">Search categories</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search categories..." className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[13px] text-[#17333b] outline-none focus:border-[#07546B] focus:ring-2 focus:ring-[#07546B]/10" />
          </label>
          <label>
            <span className="sr-only">Filter categories</span>
            <select value={filter} onChange={(event) => setFilter(event.target.value as 'all' | 'main' | 'sub')} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-semibold text-[#17333b] outline-none focus:border-[#07546B]">
              <option value="all">All types</option>
              <option value="main">Main only</option>
              <option value="sub">Subcategories</option>
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <p role="status" className="rounded-xl bg-white p-6 !text-sm !text-slate-500">Loading categories…</p>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-3 xl:grid-cols-2">
          {visible.map((category) => (
            <article key={category.id} className="group flex min-w-0 items-start gap-4 rounded-xl border border-[#e0eae8] bg-white p-3 transition duration-200 hover:border-[#b9d8ce] hover:shadow-[0_8px_25px_rgba(12,66,58,.06)] sm:items-center sm:p-4">
              <div className="flex h-[84px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f1f5f4] sm:h-[104px] sm:w-[112px]">
                {category.image_url ? (
                  <img src={category.image_url} alt={category.name} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon size={25} strokeWidth={1.5} className="text-[#9bb3b7]" aria-label="No category image" />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-[#ecf5f2] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[.05em] text-[#07546B]">{category.parent_id ? 'Subcategory' : 'Main category'}</span>
                  <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${category.is_published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{category.is_published ? 'Published' : 'Draft'}</span>
                </div>
                <div className="min-w-0">
                  <h2 className="!m-0 !font-sans !text-[16px] !font-extrabold !leading-snug !tracking-[-.02em] !text-[#17333b] sm:!text-[18px]">{category.name}</h2>
                  <p className="!m-0 !mt-1 truncate !text-[12px] !text-slate-500" title={`/${category.slug}`}>/{category.slug}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button type="button" onClick={() => openEditor(category)} className="inline-flex items-center gap-1.5 rounded-lg border border-[#cfe0db] bg-white px-3 py-1.5 text-[12px] font-bold !text-[#07546B] transition hover:bg-[#eff8f4]"><Pencil size={13} /> Edit</button>
                  <button type="button" onClick={() => void remove(category)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-white px-3 py-1.5 text-[12px] font-bold !text-red-600 transition hover:bg-red-50"><Trash2 size={13} /> Delete</button>
                </div>
              </div>
            </article>
          ))}
          {visible.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center xl:col-span-2">
              <FolderOpen size={28} className="text-slate-400" />
              <p className="!m-0 !text-sm !font-semibold !text-[#17333b]">{rows.length ? 'No matching categories' : 'No categories yet'}</p>
              <p className="!m-0 !text-xs !text-slate-500">{rows.length ? 'Try another search or filter.' : 'Use Add category to create your first category.'}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
