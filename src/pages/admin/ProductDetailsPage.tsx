import './admin-ui-fix.css';
import {Link,useParams} from 'react-router';import ProductImageUploader from '../../components/admin/products/ProductImageUploader';
export default function ProductDetailsPage(){const {id}=useParams();return <section className="cx-portal"><p className="cx-overline">SUPER ADMIN / PRODUCT MEDIA</p><h1>Product media</h1><Link to="/admin/products">← Products</Link>{id?<ProductImageUploader productId={id}/>:<p role="alert">Missing product ID.</p>}</section>}
