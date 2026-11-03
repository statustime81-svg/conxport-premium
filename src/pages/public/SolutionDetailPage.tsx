import { useParams } from 'react-router';
import PublicInfoPage from './PublicInfoPage';
export default function SolutionDetailPage() { const {slug} = useParams(); const label = (slug ?? '').replaceAll('-', ' '); return <PublicInfoPage title={label ? label.replace(/\b\w/g, c => c.toUpperCase()) : 'Equipment solutions'} intro="Please share your equipment needs and our team can help you explore available product details and documentation." path={`/solutions/${slug ?? ''}`}/>; }
