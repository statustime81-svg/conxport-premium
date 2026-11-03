import './admin-ui-fix.css';
import CmsCollectionPage from '../../components/admin/cms/CmsCollectionPage';

export default function ContentPage() {
  return (
    <CmsCollectionPage
      title="Content management"
      description="Manage published and draft pages, blog posts, case studies, resources and homepage blocks from one place."
    />
  );
}
