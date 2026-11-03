import './admin-ui-fix.css';
import CmsCollectionPage from '../../components/admin/cms/CmsCollectionPage';

export default function PagesPage() {
  return <CmsCollectionPage kind="page" title="Static pages" description="Manage About, Privacy Policy, Terms, Cookie Policy and other static pages." />;
}
