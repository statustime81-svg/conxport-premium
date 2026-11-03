import { FileText, LockKeyhole, ExternalLink } from 'lucide-react';
import type { ProductDocument } from '../../data/productDetails';
export default function ProductDocuments({ documents }: { documents: ProductDocument[] }) {
  return <section aria-labelledby="documents-title" style={{ paddingBlock: 64, borderBottom: '1px solid #d7e3e5' }}>
    <h2 id="documents-title" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', letterSpacing: '-.05em' }}>Resources & downloads.</h2>
    {documents.length === 0 ? <p style={{ color: '#617a80' }}>Official brochures and technical documents will be available once ConXport publishes them.</p> : <div style={{ display: 'grid', gap: 12 }}>{documents.map(doc => <DocumentRow key={doc.id} document={doc}/>)}</div>}
  </section>;
}
function DocumentRow({ document: doc }: { document: ProductDocument }) {
  const canDownload = doc.access === 'public' && !!doc.url;
  return <div style={{ display: 'flex', alignItems: 'center', gap: 15, padding: 20, borderRadius: 14, background: '#eef5f5', flexWrap: 'wrap' }}><FileText color="#157b73"/><span style={{ flex: 1, fontWeight: 700 }}>{doc.label}</span>{canDownload ? <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ color: '#126c65', display: 'inline-flex', gap: 7, alignItems: 'center' }}>View document <ExternalLink size={16}/></a> : <span style={{ color: '#647d82', display: 'inline-flex', gap: 7, alignItems: 'center', fontSize: 13 }}><LockKeyhole size={15}/> {doc.access === 'enquiry' ? 'Available after verified enquiry' : 'Coming soon'}</span>}</div>;
}
