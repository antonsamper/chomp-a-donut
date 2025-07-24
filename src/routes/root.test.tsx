import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { renderComponentWithRouteContext } from '../vitest-setup.tsx';
import { Root } from './root.tsx';

describe('<Root />', () => {
    test('renders the title', () => {
        renderComponentWithRouteContext(<Root />);

        expect(screen.getByText('Chomp a Donut')).toBeInTheDocument();
    });

    test('renders the links', () => {
        renderComponentWithRouteContext(<Root />);

        const links = screen.getAllByRole('link');

        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute('href', '/list');
        expect(links[1]).toHaveAttribute('href', '/company/info');
    });

    test('renders the welcome message', () => {
        renderComponentWithRouteContext(<Root />);

        expect(screen.getByTestId('welcome-message')).toHaveTextContent(/Welcome to Chomp a Donut!/);
        expect(screen.getByTestId('welcome-message')).toHaveTextContent(/Eat as many donuts as you like...virtually./);
    });
});
