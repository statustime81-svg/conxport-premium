import type { ProductSpec } from '../../data/productDetails';
export default function SpecificationTable({ specifications }: { specifications: ProductSpec[] }) {
  return <section aria-labelledby="specifications-title" style={{ paddingBlock: 'clamp(45px,7vw,95px)', borderBottom: '1px solid #d7e3e5' }}>
    <p style={{ fontSize: 12, fontWeight: 800, color: '#07546B', letterSpacing: '.16em' }}>TECHNICAL DETAILS</p>
    <h2 id="specifications-title" style={{ fontSize: 'clamp(2.1rem,5vw,4.2rem)', letterSpacing: '-.05em', margin: '15px 0 30px' }}>Specifications.</h2>
    <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}><tbody>{specifications.map(({ label, value }) => <tr key={label} style={{ borderBottom: '1px solid #d7e3e5' }}><th scope="row" style={{ padding: '21px 16px 21px 0', width: '38%', verticalAlign: 'top', fontWeight: 700 }}>{label}</th><td style={{ padding: '21px 0', color: '#526e75' }}>{value}</td></tr>)}</tbody></table></div>
    <p style={{ color: '#698086', fontSize: 12, marginTop: 22 }}>Specifications are illustrative until verified official catalogue data is published.</p>
  </section>;
}
