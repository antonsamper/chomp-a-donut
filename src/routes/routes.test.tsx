import { screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { renderApplication } from '../vitest-setup.tsx';

describe('Routes', () => {
    test('renders the root page', () => {
        renderApplication({ path: '/' });

        expect(screen.getByText('Chomp a Donut')).toBeInTheDocument();
    });

    test('renders the donuts list page', async () => {
        renderApplication({ path: '/list' });

        await waitFor(() => {
            expect(screen.getByText('Donuts')).toBeInTheDocument();
        });
    });

    test('renders the company info page', () => {
        renderApplication({ path: '/company/info' });

        expect(screen.getByText('Company Information')).toBeInTheDocument();
    });

    test('renders the company info page when a company child route is not recognised', () => {
        renderApplication({ path: '/company/unknown' });

        expect(screen.getByText('Company Information')).toBeInTheDocument();
    });

    test('renders the root page when a route is not recognised', () => {
        renderApplication({ path: '/company/unknown' });

        expect(screen.getByText('Company Information')).toBeInTheDocument();
    });
});
