import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './app/router';
import { AppProviders } from './app/providers';
import './styles/globals.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element in index.html');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppProviders>
      <Suspense fallback={<div role="status" style={{ minHeight: '45vh', display: 'grid', placeItems: 'center', fontFamily: 'Manrope, sans-serif', color: '#043C50' }}>Loading pageâ€¦</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AppProviders>
  </React.StrictMode>,
);
