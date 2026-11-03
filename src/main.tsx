import React from 'react';
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
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>,
);
