import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { renderComponentWithRouteContext } from '../vitest-setup.tsx';
import { CompanyInfo } from './company-info.tsx';

describe('<CompanyInfo />', () => {
    test('renders the title', () => {
        renderComponentWithRouteContext(<CompanyInfo />);

        expect(screen.getByText('Company Information')).toBeInTheDocument();
    });

    test('renders the company info text', () => {
        renderComponentWithRouteContext(<CompanyInfo />);

        expect(screen.getByText("Chomp-a-Donut thrives on making it's customer's smile with its fantastic range of donuts.")).toBeInTheDocument();
    });

    test('renders the link to go back', () => {
        renderComponentWithRouteContext(<CompanyInfo />);

        expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    });

    test('ensures the light theme is not set', () => {
        renderComponentWithRouteContext(<CompanyInfo />);

        expect(document.body).not.toHaveClass('light');
    });

    test('ensures the light theme is restored on unmount', () => {
        const { unmount } = renderComponentWithRouteContext(<CompanyInfo />);

        localStorage.setItem('theme', 'light');

        unmount();

        expect(document.body).toHaveClass('light');
    });
});
