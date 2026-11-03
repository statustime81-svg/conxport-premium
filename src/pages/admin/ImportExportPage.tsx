import './admin-ui-fix.css';
import { useState } from 'react';
import { listCategories, saveCategory } from '../../services/adminCategories';
import { listAdminProducts, saveAdminProduct } from '../../services/adminProducts';
import { getCrmEnquiries } from '../../services/crmEnquiries';
import { listRegisteredCustomers } from '../../services/crmCustomers';
import { listCmsAdmin } from '../../services/cmsAdmin';
import { parseCsv, toCsv } from '../../lib/csv';

async function downloadCsv(name: string, rows: Record<string, unknown>[]) {
  const csv = toCsv(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${name}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function ImportExportPage() {
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function resetState() {
    setMessage('');
    setError('');
  }

  async function exportData(kind: 'products' | 'categories' | 'enquiries' | 'customers' | 'content') {
    resetState();
    setBusy(kind);
    try {
      if (kind === 'products') {
        await downloadCsv('conxport-products', await listAdminProducts());
      } else if (kind === 'categories') {
        await downloadCsv('conxport-categories', await listCategories());
      } else if (kind === 'enquiries') {
        await downloadCsv('conxport-enquiries', await getCrmEnquiries());
      } else if (kind === 'customers') {
        await downloadCsv('conxport-customers', await listRegisteredCustomers());
      } else {
        await downloadCsv('conxport-content', await listCmsAdmin());
      }
      setMessage(`${kind} exported successfully.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : `Export failed for ${kind}`);
    } finally {
      setBusy('');
    }
  }

  async function importCategories(file: File) {
    resetState();
    setBusy('import-categories');
    try {
      const existing = await listCategories();
      const [headers, ...rows] = parseCsv(await file.text());
      const index = Object.fromEntries(headers.map((header, i) => [header.trim(), i]));
      let count = 0;
      for (const row of rows) {
        const slug = row[index.slug] ?? '';
        if (!slug) continue;
        const existingCategory = existing.find((item) => item.slug === slug);
        await saveCategory({
          name: row[index.name] ?? '',
          slug,
          description: row[index.description] ?? '',
          parent_id: row[index.parent_id] || null,
          is_published: String(row[index.is_published] ?? '').toLowerCase() === 'true',
        }, existingCategory?.id);
        count += 1;
      }
      setMessage(`${count} categories imported or updated successfully.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Category import failed');
    } finally {
      setBusy('');
    }
  }

  async function importProducts(file: File) {
    resetState();
    setBusy('import-products');
    try {
      const [existing, categories] = await Promise.all([listAdminProducts(), listCategories()]);
      const [headers, ...rows] = parseCsv(await file.text());
      const index = Object.fromEntries(headers.map((header, i) => [header.trim(), i]));
      let count = 0;
      for (const row of rows) {
        const sku = row[index.sku] ?? '';
        if (!sku) continue;
        const slug = row[index.slug] ?? '';
        const categoryValue = row[index.primary_category_id] || row[index.primary_category_slug] || '';
        const categoryId = categories.find((item) => item.id === categoryValue || item.slug === categoryValue)?.id ?? null;
        const existingProduct = existing.find((item) => item.sku === sku || item.slug === slug);
        await saveAdminProduct({
          name: row[index.name] ?? '',
          slug,
          sku,
          summary: row[index.summary] ?? '',
          description: row[index.description] ?? '',
          primary_category_id: categoryId,
          is_published: String(row[index.is_published] ?? '').toLowerCase() === 'true',
        }, existingProduct?.id);
        count += 1;
      }
      setMessage(`${count} products imported or updated successfully.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Product import failed');
    } finally {
      setBusy('');
    }
  }

  async function handleUpload(kind: 'categories' | 'products', fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    if (kind === 'categories') await importCategories(file);
    if (kind === 'products') await importProducts(file);
  }

  return (
    <section className="container" style={{ paddingBlock: '2rem 4rem' }}>
      <p className="cx-overline">CONXPORT / IMPORT & EXPORT</p>
      <h1>Data exchange</h1>
      <p>Export catalogue, CRM and content records to CSV. Import categories and products by CSV for faster data setup.</p>

      <div className="cx-admin-grid" style={{ marginTop: 24 }}>
        <div className="cx-form-card">
          <h2>Export data</h2>
          <div className="cx-stack-list">
            {[
              ['products', 'Export products'],
              ['categories', 'Export categories'],
              ['enquiries', 'Export enquiries'],
              ['customers', 'Export customers'],
              ['content', 'Export content'],
            ].map(([key, label]) => (
              <button key={key} type="button" className="cx-secondary-button" disabled={busy !== ''} onClick={() => void exportData(key as never)}>
                {busy === key ? 'Working…' : label}
              </button>
            ))}
          </div>
        </div>

        <div className="cx-form-card">
          <h2>Import data</h2>
          <div className="cx-stack-list">
            <label className="cx-label">
              <span>Import categories CSV</span>
              <input type="file" accept=".csv,text/csv" className="cx-input" onChange={(e) => void handleUpload('categories', e.target.files)} />
            </label>
            <label className="cx-label">
              <span>Import products CSV</span>
              <input type="file" accept=".csv,text/csv" className="cx-input" onChange={(e) => void handleUpload('products', e.target.files)} />
            </label>
            <small className="cx-field-note">Category CSV headers: name, slug, description, parent_id, is_published. Product CSV headers: name, slug, sku, summary, description, primary_category_id or primary_category_slug, is_published.</small>
          </div>
        </div>
      </div>

      {error && <p role="alert" className="cx-error" style={{ marginTop: 20 }}>{error}</p>}
      {message && <p className="cx-success" style={{ marginTop: 20 }}>{message}</p>}
    </section>
  );
}
