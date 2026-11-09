import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import App from '../App';
import PublicLayout from '../layouts/PublicLayout';
import AccountLayout from '../layouts/AccountLayout';
import AuthGuard from './guards/AuthGuard';
import AdminGuard from './guards/AdminGuard';




import AdminLayout from '../layouts/AdminLayout';




const ExpoPage = lazy(() => import('../pages/public/ExpoPage'));
const TurnkeyProjectsPage = lazy(() => import('../pages/public/TurnkeyProjectsPage'));
const DistributorPage = lazy(() => import('../pages/public/DistributorPage'));
const ShowcaseAdminPage = lazy(() => import('../pages/admin/ShowcaseAdminPage'));
const ContactInboxPage = lazy(() => import('../pages/admin/ContactInboxPage'));
const CategoriesPage = lazy(() => import('../pages/public/CategoriesPage'));
const CategoryDetailPage = lazy(() => import('../pages/public/CategoryDetailPage'));
const SubcategoryPage = lazy(() => import('../pages/public/SubcategoryPage'));
const ProductsPage = lazy(() => import('../pages/public/ProductsPage'));
const ProductDetailPage = lazy(() => import('../pages/public/ProductDetailPage'));
const QuoteListPage = lazy(() => import('../pages/public/QuoteListPage'));
const RequestQuotePage = lazy(() => import('../pages/public/RequestQuotePage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'));
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));
const AccountDashboardPage = lazy(() => import('../pages/account/DashboardPage'));
const ProfilePage = lazy(() => import('../pages/account/ProfilePage'));
const SavedProductsPage = lazy(() => import('../pages/account/SavedProductsPage'));
const EnquiriesPage = lazy(() => import('../pages/account/EnquiriesPage'));
const EnquiryDetailPage = lazy(() => import('../pages/account/EnquiryDetailPage'));
const QuotesPage = lazy(() => import('../pages/account/QuotesPage'));
const QuoteDetailPage = lazy(() => import('../pages/account/QuoteDetailPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const AdminProductsPage = lazy(() => import('../pages/admin/ProductsPage'));
const ProductEditorPage = lazy(() => import('../pages/admin/ProductEditorPage'));
const ProductDetailsPage = lazy(() => import('../pages/admin/ProductDetailsPage'));
const AdminCategoriesPage = lazy(() => import('../pages/admin/CategoriesPage'));
const InventoryPage = lazy(() => import('../pages/admin/InventoryPage'));
const WarehousesPage = lazy(() => import('../pages/admin/WarehousesPage'));
const StockMovementsPage = lazy(() => import('../pages/admin/StockMovementsPage'));
const StockAlertsPage = lazy(() => import('../pages/admin/StockAlertsPage'));
const StockAdjustmentPage = lazy(() => import('../pages/admin/StockAdjustmentPage'));
const CrmEnquiriesPage = lazy(() => import('../pages/admin/EnquiriesPage'));
const CrmEnquiryDetailPage = lazy(() => import('../pages/admin/EnquiryDetailPage'));
const CrmCustomersPage = lazy(() => import('../pages/admin/CustomersPage'));
const CrmQuotesPage = lazy(() => import('../pages/admin/QuotesPage'));
const ContentPage = lazy(() => import('../pages/admin/ContentPage'));
const ContentEditorPage = lazy(() => import('../pages/admin/ContentEditorPage'));
const CmsIndexPage = lazy(() => import('../pages/public/CmsIndexPage'));
const CmsDetailPage = lazy(() => import('../pages/public/CmsDetailPage'));
const BlogPage = lazy(() => import('../pages/admin/BlogPage'));
const CaseStudiesPage = lazy(() => import('../pages/admin/CaseStudiesPage'));
const PagesPage = lazy(() => import('../pages/admin/PagesPage'));
const ResourcesPage = lazy(() => import('../pages/admin/ResourcesPage'));
const HomepagePage = lazy(() => import('../pages/admin/HomepagePage'));
const SeoPage = lazy(() => import('../pages/admin/SeoPage'));
const SettingsPage = lazy(() => import('../pages/admin/SettingsPage'));
const HomeServicesAdminPage = lazy(() => import('../pages/admin/HomeServicesAdminPage'));
const ImportExportPage = lazy(() => import('../pages/admin/ImportExportPage'));
const ContactPage = lazy(() => import('../pages/public/ContactPage'));
const AboutPage = lazy(() => import('../pages/public/AboutPage'));
const FaqPage = lazy(() => import('../pages/public/FaqPage'));
const CertificationsPage = lazy(() => import('../pages/public/CertificationsPage'));
const SolutionsPage = lazy(() => import('../pages/public/SolutionsPage'));
const SolutionDetailPage = lazy(() => import('../pages/public/SolutionDetailPage'));
const IndustriesPage = lazy(() => import('../pages/public/IndustriesPage'));
const IndustryDetailPage = lazy(() => import('../pages/public/IndustryDetailPage'));
const ComparePage = lazy(() => import('../pages/public/ComparePage'));
const CookiePolicyPage = lazy(() => import('../pages/public/CookiePolicyPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/public/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('../pages/public/TermsPage'));
const SearchPage = lazy(() => import('../pages/public/SearchPage'));
const PublicSavedProductsPage = lazy(() => import('../pages/public/SavedProductsPage'));

function PendingPage({ title }: { title: string }) {
  return (
    <section
      className="container"
      style={{
        paddingBlock: '6rem',
        minHeight: '55vh',
      }}
    >
      <p className="eyebrow">CONXPORT / COMING SOON</p>

      <h1
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        }}
      >
        {title}
      </h1>

      <p
        style={{
          color: '#5f7280',
          maxWidth: 640,
          lineHeight: 1.8,
        }}
      >
        This module is planned for a later development batch.
      </p>
    </section>
  );
}

export const router = createBrowserRouter([
  // ========================================
  // PUBLIC WEBSITE ROUTES
  // ========================================
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <App /> },

      // Categories
      { path: 'categories', element: <CategoriesPage /> },
      {
        path: 'categories/:categorySlug',
        element: <CategoryDetailPage />,
      },
      {
        path: 'categories/:categorySlug/:subcategorySlug',
        element: <SubcategoryPage />,
      },

      // Products
      { path: 'products', element: <ProductsPage /> },
      {
        path: 'products/:productSlug',
        element: <ProductDetailPage />,
      },

      // Quotations
      { path: 'quote-list', element: <QuoteListPage /> },
      {
        path: 'request-quote',
        element: <RequestQuotePage />,
      },

      // Contact
      { path: 'contact', element: <ContactPage /> },

      // Authentication
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: 'admin/login',
        element: <AdminLoginPage />,
      },

      // Blog
      {
        path: 'blog',
        element: (
          <CmsIndexPage
            kind="blog"
            title="Insights & Blog"
          />
        ),
      },
      {
        path: 'blog/:slug',
        element: <CmsDetailPage kind="blog" />,
      },

      // Turnkey Projects
      {
        path: 'turnkey-projects',
        element: <TurnkeyProjectsPage />,
      },
      {
        path: 'case-studies',
        element: (
          <Navigate to="/turnkey-projects" replace />
        ),
      },
      {
        path: 'case-studies/:slug',
        element: (
          <Navigate to="/turnkey-projects" replace />
        ),
      },

      // Resources
      {
        path: 'resources',
        element: (
          <CmsIndexPage
            kind="resource"
            title="Resources"
          />
        ),
      },
      {
        path: 'resources/:slug',
        element: <CmsDetailPage kind="resource" />,
      },

      // Company Pages
      { path: 'about', element: <AboutPage /> },
      { path: 'faq', element: <FaqPage /> },
      {
        path: 'certifications',
        element: <CertificationsPage />,
      },
      { path: 'our-expo', element: <ExpoPage /> },

      // ========================================
      // DISTRIBUTOR PAGE - FIXED PUBLIC ROUTE
      // ========================================
      {
        path: 'distributor',
        element: <DistributorPage />,
      },

      // Solutions
      {
        path: 'solutions',
        element: <SolutionsPage />,
      },
      {
        path: 'solutions/:slug',
        element: <SolutionDetailPage />,
      },

      // Industries
      {
        path: 'industries',
        element: <IndustriesPage />,
      },
      {
        path: 'industries/:slug',
        element: <IndustryDetailPage />,
      },

      // Other Public Pages
      { path: 'compare', element: <ComparePage /> },
      {
        path: 'saved-products',
        element: <PublicSavedProductsPage />,
      },
      { path: 'search', element: <SearchPage /> },

      // Legal Pages
      {
        path: 'privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: 'terms-and-conditions',
        element: <TermsPage />,
      },
      {
        path: 'cookie-policy',
        element: <CookiePolicyPage />,
      },

      {
        path: 'unauthorized',
        element: <PendingPage title="Access denied" />,
      },
      {
        path: '*',
        element: <PendingPage title="Page not found" />,
      },
    ],
  },

  // ========================================
  // CUSTOMER ACCOUNT ROUTES
  // ========================================
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'account',
        element: <AccountLayout />,
        children: [
          {
            index: true,
            element: <AccountDashboardPage />,
          },
          { path: 'profile', element: <ProfilePage /> },
          {
            path: 'saved-products',
            element: <SavedProductsPage />,
          },
          {
            path: 'enquiries',
            element: <EnquiriesPage />,
          },
          {
            path: 'enquiries/:id',
            element: <EnquiryDetailPage />,
          },
          { path: 'quotes', element: <QuotesPage /> },
          {
            path: 'quotes/:id',
            element: <QuoteDetailPage />,
          },
        ],
      },
    ],
  },

  // ========================================
  // ADMIN PANEL ROUTES
  // ========================================
  {
    element: <AdminGuard />,
    children: [
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },

          // Products
          {
            path: 'products',
            element: <AdminProductsPage />,
          },
          {
            path: 'categories',
            element: <AdminCategoriesPage />,
          },
          {
            path: 'subcategories',
            element: <AdminCategoriesPage />,
          },
          {
            path: 'products/new',
            element: <ProductEditorPage />,
          },
          {
            path: 'products/:id/edit',
            element: <ProductEditorPage />,
          },
          {
            path: 'products/:id/media',
            element: <ProductDetailsPage />,
          },

          // Inventory
          {
            path: 'inventory',
            element: <InventoryPage />,
          },
          {
            path: 'warehouses',
            element: <WarehousesPage />,
          },
          {
            path: 'stock-movements',
            element: <StockMovementsPage />,
          },
          {
            path: 'stock-alerts',
            element: <StockAlertsPage />,
          },
          {
            path: 'stock-adjustment',
            element: <StockAdjustmentPage />,
          },

          // Content Management
          {
            path: 'content',
            element: <ContentPage />,
          },
          {
            path: 'content/new',
            element: <ContentEditorPage />,
          },
          {
            path: 'content/:id/edit',
            element: <ContentEditorPage />,
          },
          { path: 'pages', element: <PagesPage /> },
          {
            path: 'homepage',
            element: <HomepagePage />,
          },
          { path: 'home-services', element: <HomeServicesAdminPage /> },
          {
            path: 'showcase/:kind',
            element: <ShowcaseAdminPage />,
          },
          {
            path: 'contact-messages',
            element: <ContactInboxPage />,
          },
          { path: 'blog', element: <BlogPage /> },
          {
            path: 'turnkey-projects',
            element: <CaseStudiesPage />,
          },
          {
            path: 'case-studies',
            element: (
              <Navigate
                to="/admin/turnkey-projects"
                replace
              />
            ),
          },
          {
            path: 'resources',
            element: <ResourcesPage />,
          },

          // Settings
          { path: 'seo', element: <SeoPage /> },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
          {
            path: 'import-export',
            element: <ImportExportPage />,
          },

          // CRM
          {
            path: 'enquiries',
            element: <CrmEnquiriesPage />,
          },
          {
            path: 'enquiries/:id',
            element: <CrmEnquiryDetailPage />,
          },
          {
            path: 'customers',
            element: <CrmCustomersPage />,
          },
          {
            path: 'quotes',
            element: <CrmQuotesPage />,
          },

          {
            path: '*',
            element: <PendingPage title="Admin module" />,
          },
        ],
      },
    ],
  },

  // Redirect
  {
    path: '/home',
    element: <Navigate to="/" replace />,
  },
]);
