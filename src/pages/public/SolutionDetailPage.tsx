import { useParams } from 'react-router';
import Option4InfoPage from './Option4InfoPage';
export default function SolutionDetailPage() { const {slug} = useParams(); const label = (slug ?? '').replaceAll('-', ' '); return <Option4InfoPage title={label ? label.replace(/\b\w/g, c => c.toUpperCase()) : 'Equipment solutions'} intro="Please share your equipment needs and our team can help you explore available product details and documentation." path={`/solutions/${slug ?? ''}`}/>; }
