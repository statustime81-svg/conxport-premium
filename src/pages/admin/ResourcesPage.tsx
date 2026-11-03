import './admin-ui-fix.css';
import CmsCollectionPage from '../../components/admin/cms/CmsCollectionPage';

export default function ResourcesPage() {
  return <CmsCollectionPage kind="resource" title="Resource management" description="Upload downloadable resources, guides and supporting materials." />;
}
