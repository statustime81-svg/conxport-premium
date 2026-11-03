import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import {
  deleteProductImage, listProductImages, productPublicImageUrl,
  uploadProductImage, type ProductImage,
} from '../../../services/productMedia';

export default function ProductImageUploader({ productId }: { productId: string }) {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    try {
      setImages((await listProductImages(productId)).filter(item => item.media_type === 'image'));
      setError('');
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to load images'); }
  }, [productId]);

  useEffect(() => { void refresh(); }, [refresh]);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try { await uploadProductImage(productId, file); await refresh(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Upload failed'); }
    finally { setBusy(false); event.target.value = ''; }
  }

  async function remove(image: ProductImage) {
    if (!window.confirm('Permanently delete this product image?')) return;
    setBusy(true);
    try { await deleteProductImage(image); await refresh(); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not delete image'); }
    finally { setBusy(false); }
  }

  return (
    <div className="mt-7 border-t border-slate-100 pt-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h4 className="!m-0 !text-sm !font-extrabold !text-slate-800">Saved images ({images.length})</h4>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-800 hover:bg-teal-100">
          <ImagePlus size={16} /> Add another image
          <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={e => void upload(e)} />
        </label>
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {images.length === 0 ? <p className="!m-0 text-sm !text-slate-500">No images uploaded yet.</p> : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((item, index) => (
            <figure key={item.id} className="!m-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <img src={productPublicImageUrl(item.storage_path)} alt={`Product image ${index + 1}`} loading="lazy" className="aspect-square w-full bg-slate-50 object-contain p-2" />
              <figcaption className="flex items-center justify-between border-t border-slate-100 p-2">
                <span className="text-[11px] font-semibold text-slate-500">{index === 0 ? 'Primary image' : `Image ${index + 1}`}</span>
                <button type="button" disabled={busy} onClick={() => void remove(item)} className="rounded-md p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50" aria-label={`Delete image ${index + 1}`}><Trash2 size={15} /></button>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
