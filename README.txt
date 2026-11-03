ConXport Quote List UI Fix

Copy these files into your existing project, overwriting matching files:
  src/pages/public/QuoteListPage.tsx
  src/components/enquiries/QuoteListItem.tsx

Do not replace your Navbar, Footer or quote-list store. Existing add/remove/clear and enquiry navigation are retained.

Run:
  npm run typecheck
  npm run dev

Test URL: http://localhost:5173/quote-list

Note: The page uses existing findProduct() illustrative details where available; names from other catalogue slugs appear as slugs until product data fetching is integrated.
