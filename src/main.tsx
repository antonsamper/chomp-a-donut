import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import { Routes } from './routes/routes.tsx';

const rootElement = document.querySelector('#root');

if (!rootElement) {
    throw new Error('Failed to find root element');
}

const queryClient = new QueryClient();

createRoot(rootElement).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider future={{ v7_startTransition: true }} router={createBrowserRouter(Routes)} />
        </QueryClientProvider>
    </StrictMode>,
);
