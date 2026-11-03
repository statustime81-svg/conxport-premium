import ExpoPage from '../pages/public/ExpoPage';
import ShowcaseAdminPage from '../pages/admin/ShowcaseAdminPage';
import ContactInboxPage from '../pages/admin/ContactInboxPage';
import { createBrowserRouter, Navigate } from 'react-router';
import App from '../App';
import PublicLayout from '../layouts/PublicLayout';
import AccountLayout from '../layouts/AccountLayout';
import AuthGuard from './guards/AuthGuard';
import AdminGuard from './guards/AdminGuard';
import CategoriesPage from '../pages/public/CategoriesPage';
import CategoryDetailPage from '../pages/public/CategoryDetailPage';
import SubcategoryPage from '../pages/public/SubcategoryPage';
import ProductsPage from '../pages/public/ProductsPage';
import ProductDetailPage from '../pages/public/ProductDetailPage';
import QuoteListPage from '../pages/public/QuoteListPage';
import RequestQuotePage from '../pages/public/RequestQuotePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AccountDashboardPage from '../pages/account/DashboardPage';
import AdminDashboardPage from '../pages/admin/DashboardPage';
import ProfilePage from '../pages/account/ProfilePage';
import SavedProductsPage from '../pages/account/SavedProductsPage';
import EnquiriesPage from '../pages/account/EnquiriesPage';
import EnquiryDetailPage from '../pages/account/EnquiryDetailPage';
import QuotesPage from '../pages/account/QuotesPage';
import QuoteDetailPage from '../pages/account/QuoteDetailPage';
import AdminLayout from '../layouts/AdminLayout';
import AdminProductsPage from '../pages/admin/ProductsPage';
import ProductEditorPage from '../pages/admin/ProductEditorPage';
import ProductDetailsPage from '../pages/admin/ProductDetailsPage';
import AdminCategoriesPage from '../pages/admin/CategoriesPage';
import InventoryPage from '../pages/admin/InventoryPage';
import WarehousesPage from '../pages/admin/WarehousesPage';
import StockMovementsPage from '../pages/admin/StockMovementsPage';
import StockAlertsPage from '../pages/admin/StockAlertsPage';
import StockAdjustmentPage from '../pages/admin/StockAdjustmentPage';
import CrmEnquiriesPage from '../pages/admin/EnquiriesPage';
import CrmEnquiryDetailPage from '../pages/admin/EnquiryDetailPage';
import CrmCustomersPage from '../pages/admin/CustomersPage';
import CrmQuotesPage from '../pages/admin/QuotesPage';
import ContentPage from '../pages/admin/ContentPage';
import ContentEditorPage from '../pages/admin/ContentEditorPage';
import CmsIndexPage from '../pages/public/CmsIndexPage';
import CmsDetailPage from '../pages/public/CmsDetailPage';
import BlogPage from '../pages/admin/BlogPage';
import CaseStudiesPage from '../pages/admin/CaseStudiesPage';
import PagesPage from '../pages/admin/PagesPage';
import ResourcesPage from '../pages/admin/ResourcesPage';
import HomepagePage from '../pages/admin/HomepagePage';
import SeoPage from '../pages/admin/SeoPage';
import SettingsPage from '../pages/admin/SettingsPage';
import ImportExportPage from '../pages/admin/ImportExportPage';
import ContactPage from '../pages/public/ContactPage';

import AboutPage from '../pages/public/AboutPage';
import FaqPage from '../pages/public/FaqPage';
import CertificationsPage from '../pages/public/CertificationsPage';
import SolutionsPage from '../pages/public/SolutionsPage';
import SolutionDetailPage from '../pages/public/SolutionDetailPage';
import IndustriesPage from '../pages/public/IndustriesPage';
import IndustryDetailPage from '../pages/public/IndustryDetailPage';
import ComparePage from '../pages/public/ComparePage';
import CookiePolicyPage from '../pages/public/CookiePolicyPage';
import PrivacyPolicyPage from '../pages/public/PrivacyPolicyPage';
import TermsPage from '../pages/public/TermsPage';
import SearchPage from '../pages/public/SearchPage';
import PublicSavedProductsPage from '../pages/public/SavedProductsPage';

function PendingPage({ title }: { title: string }) {
  return <section className="container" style={{ paddingBlock: '6rem', minHeight: '55vh' }}>
    <p className="eyebrow">CONXPORT / COMING SOON</p>
    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>{title}</h1>
    <p style={{ color: '#5f7280', maxWidth: 640, lineHeight: 1.8 }}>This module is planned for a later development batch.</p>
  </section>;
}

export const router = createBrowserRouter([
  { path: '/', element: <PublicLayout />, children: [
    { index: true, element: <App /> },
    { path: 'categories', element: <CategoriesPage /> },
    { path: 'categories/:categorySlug', element: <CategoryDetailPage /> },
    { path: 'categories/:categorySlug/:subcategorySlug', element: <SubcategoryPage /> },
    { path: 'products', element: <ProductsPage /> },
    { path: 'products/:productSlug', element: <ProductDetailPage /> },
    { path: 'quote-list', element: <QuoteListPage /> },
    { path: 'request-quote', element: <RequestQuotePage /> },
    { path: 'contact', element: <ContactPage /> },
    { path: 'login', element: <LoginPage /> },
    { path: 'register', element: <RegisterPage /> },
    { path: 'forgot-password', element: <ForgotPasswordPage /> },
    { path: 'reset-password', element: <ResetPasswordPage /> },
    { path: 'admin/login', element: <AdminLoginPage /> },
    { path: 'blog', element: <CmsIndexPage kind="blog" title="Insights & Blog" /> },
    { path: 'blog/:slug', element: <CmsDetailPage kind="blog" /> },
    { path: 'case-studies', element: <CmsIndexPage kind="case_study" title="Case Studies" /> },
    { path: 'case-studies/:slug', element: <CmsDetailPage kind="case_study" /> },
    { path: 'resources', element: <CmsIndexPage kind="resource" title="Resources" /> },
    { path: 'resources/:slug', element: <CmsDetailPage kind="resource" /> },
    { path: 'about', element: <AboutPage /> },
    { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
    { path: 'terms-and-conditions', element: <TermsPage /> },
    { path: 'cookie-policy', element: <CookiePolicyPage /> },
    { path: 'faq', element: <FaqPage /> },
    { path: 'certifications', element: <CertificationsPage /> },
    { path: 'our-expo', element: <ExpoPage /> },
    { path: 'solutions', element: <SolutionsPage /> },
    { path: 'solutions/:slug', element: <SolutionDetailPage /> },
    { path: 'industries', element: <IndustriesPage /> },
    { path: 'industries/:slug', element: <IndustryDetailPage /> },
    { path: 'compare', element: <ComparePage /> },
    { path: 'saved-products', element: <PublicSavedProductsPage /> },
    { path: 'search', element: <SearchPage /> },
    { path: 'unauthorized', element: <PendingPage title="Access denied" /> },
    { path: '*', element: <PendingPage title="Page not found" /> },
  ] },
  { element: <AuthGuard />, children: [{ path: 'account', element: <AccountLayout />, children: [
    { index: true, element: <AccountDashboardPage /> },
    { path: 'profile', element: <ProfilePage /> },
    { path: 'saved-products', element: <SavedProductsPage /> },
    { path: 'enquiries', element: <EnquiriesPage /> },
    { path: 'enquiries/:id', element: <EnquiryDetailPage /> },
    { path: 'quotes', element: <QuotesPage /> },
    { path: 'quotes/:id', element: <QuoteDetailPage /> },
  ] }] },
  { element: <AdminGuard />, children: [
    { path: 'admin', element: <AdminLayout />, children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'products', element: <AdminProductsPage /> },
      { path: 'categories', element: <AdminCategoriesPage /> },
      { path: 'subcategories', element: <AdminCategoriesPage /> },
      { path: 'products/new', element: <ProductEditorPage /> },
      { path: 'products/:id/edit', element: <ProductEditorPage /> },
      { path: 'products/:id/media', element: <ProductDetailsPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'warehouses', element: <WarehousesPage /> },
      { path: 'stock-movements', element: <StockMovementsPage /> },
      { path: 'stock-alerts', element: <StockAlertsPage /> },
      { path: 'stock-adjustment', element: <StockAdjustmentPage /> },
      { path: 'content', element: <ContentPage /> },
      { path: 'content/new', element: <ContentEditorPage /> },
      { path: 'content/:id/edit', element: <ContentEditorPage /> },
      { path: 'pages', element: <PagesPage /> },
      { path: 'homepage', element: <HomepagePage /> },
      { path: 'showcase/:kind', element: <ShowcaseAdminPage /> },
      { path: 'contact-messages', element: <ContactInboxPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'case-studies', element: <CaseStudiesPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'seo', element: <SeoPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'import-export', element: <ImportExportPage /> },
      { path: 'enquiries', element: <CrmEnquiriesPage /> },
      { path: 'enquiries/:id', element: <CrmEnquiryDetailPage /> },
      { path: 'customers', element: <CrmCustomersPage /> },
      { path: 'quotes', element: <CrmQuotesPage /> },
      { path: '*', element: <PendingPage title="Admin module" /> },
    ] },
  ] },
  { path: '/home', element: <Navigate to="/" replace /> },
]);
