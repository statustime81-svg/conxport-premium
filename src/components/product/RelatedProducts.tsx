import { Link } from 'react-router';
import type { ProductDetail } from '../../data/productDetails';
import { productDetails } from '../../data/productDetails';
import ProductCard from '../catalogue/ProductCard';
export default function RelatedProducts({ product }: { product: ProductDetail }) {
  const sameCategory = productDetails.filter(p => p.slug !== product.slug && p.category === product.category);
  const other = productDetails.filter(p => p.slug !== product.slug && p.category !== product.category);
  const related = [...sameCategory, ...other].slice(0, 3);
  return <section aria-labelledby="related-title" style={{ paddingBlock: 80 }}>
    <p style={{ color: '#07546B', letterSpacing: '.15em', fontSize: 12, fontWeight: 800 }}>EXPLORE MORE</p>
    <h2 id="related-title" style={{ fontSize: 'clamp(2.1rem,5vw,4rem)', letterSpacing: '-.05em', margin: '12px 0 35px' }}>More equipment.</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 22 }}>{related.map(p => <ProductCard key={p.slug} product={p}/>)}</div>
    <Link to="/products" style={{ display: 'inline-block', marginTop: 28, color: '#126f68', fontWeight: 800 }}>Explore full catalogue →</Link>
  </section>;
}
