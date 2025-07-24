import '@testing-library/jest-dom/vitest';

import type { ReactElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { createRoutesFromElements, Route } from 'react-router-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { MSWServer } from './mocks/msw-server.ts';
import { Routes } from './routes/routes.tsx';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

export const renderApplication = ({ path = '/' }: { path?: string }) => {
    return {
        ...render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider future={{ v7_startTransition: true }} router={createMemoryRouter(Routes, { initialEntries: [path] })} />
            </QueryClientProvider>,
        ),
    };
};

export const renderComponentWithRouteContext = (element: ReactElement) => {
    return {
        ...render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider
                    future={{ v7_startTransition: true }}
                    router={createMemoryRouter(createRoutesFromElements(<Route element={element} path={'*'} />), {
                        initialEntries: ['/'],
                    })}
                />
            </QueryClientProvider>,
        ),
    };
};

beforeAll(() => {
    return MSWServer.listen();
});

afterEach(() => {
    return MSWServer.resetHandlers();
});

afterAll(() => {
    return MSWServer.close();
});

afterEach(() => {
    sessionStorage.clear();

    queryClient.clear();
});

afterEach(cleanup);
