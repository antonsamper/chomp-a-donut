import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { ThemeSwitcher } from './theme-switcher.tsx';

describe('<ThemeSwitcher />', () => {
    test('renders the theme switcher (dark mode by default)', () => {
        render(<ThemeSwitcher />);

        expect(screen.getByTestId('theme-moon-icon')).toBeInTheDocument();
    });

    test('allows the user to switch to the light theme', async () => {
        render(<ThemeSwitcher />);

        await userEvent.click(screen.getByTestId('theme-moon-icon'));

        expect(screen.getByTestId('theme-sun-icon')).toBeInTheDocument();
    });

    test('reads the theme from localstorage', async () => {
        localStorage.setItem('theme', 'light');

        render(<ThemeSwitcher />);

        expect(screen.getByTestId('theme-sun-icon')).toBeInTheDocument();

        localStorage.removeItem('theme');
    });

    test('updates localstorage when the theme is changed', async () => {
        render(<ThemeSwitcher />);

        await userEvent.click(screen.getByTestId('theme-moon-icon'));

        expect(localStorage.getItem('theme')).toBe('light');

        localStorage.removeItem('theme');
    });

    test('sets the correct theme class on the body', async () => {
        render(<ThemeSwitcher />);

        await userEvent.click(screen.getByTestId('theme-moon-icon'));

        expect(document.body).toHaveClass('light');
    });

    test('resets the theme class on the body', async () => {
        localStorage.setItem('theme', 'light');

        render(<ThemeSwitcher />);

        expect(document.body).toHaveClass('light');

        await userEvent.click(screen.getByTestId('theme-sun-icon'));

        expect(document.body).not.toHaveClass('light');

        localStorage.removeItem('theme');
    });
});
