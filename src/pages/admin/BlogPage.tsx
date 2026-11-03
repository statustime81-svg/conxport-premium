import './admin-ui-fix.css';
import CmsCollectionPage from '../../components/admin/cms/CmsCollectionPage';

export default function BlogPage() {
  return <CmsCollectionPage kind="blog" title="Blog management" description="Create and manage editorial blog articles." />;
}
