import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

const SunIcon = () => {
    return (
        <svg
            data-testid={'theme-sun-icon'}
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
        >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
    );
};

const MoonIcon = () => {
    return (
        <svg
            data-testid={'theme-moon-icon'}
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
};

export const ThemeSwitcher: FunctionComponent = () => {
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const shouldBeLight = savedTheme === 'light';

        setIsLight(shouldBeLight);

        if (shouldBeLight) {
            document.body.classList.add('light');
        } else {
            document.body.classList.remove('light');
        }
    }, []);

    const toggleTheme = () => {
        const newIsLight = !isLight;

        setIsLight(newIsLight);

        localStorage.setItem('theme', newIsLight ? 'light' : 'dark');

        if (newIsLight) {
            document.body.classList.add('light');
        } else {
            document.body.classList.remove('light');
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 sm:top-0">
            <button
                aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
                className="bg-secondary hover:outline-secondary cursor-pointer rounded-full p-2 leading-0 shadow-lg outline-4 outline-offset-4 outline-transparent transition-all duration-200"
                onClick={toggleTheme}
            >
                <span className="text-secondary-foreground transition-transform duration-200 hover:scale-110">{isLight ? <SunIcon /> : <MoonIcon />}</span>
            </button>
        </div>
    );
};
