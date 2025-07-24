import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../components/button.tsx';

export const CompanyInfo = () => {
    useEffect(() => {
        document.body.classList.remove('light');

        return () => {
            const savedTheme = localStorage.getItem('theme');

            if (savedTheme === 'light') {
                document.body.classList.add('light');
            }
        };
    }, []);

    return (
        <main className="mt-24 mb-8 flex flex-col items-center space-y-16 text-4xl sm:text-5xl md:mt-0 md:h-screen md:justify-center lg:text-6xl">
            <h1 className="font-bold">Company Information</h1>

            <p className={'px-4 text-center md:px-24'}>Chomp-a-Donut thrives on making it's customer's smile with its fantastic range of donuts.</p>

            <div className={'flex flex-col gap-4 md:flex-row md:gap-4'}>
                <Link to="/">
                    <Button>← Back</Button>
                </Link>
            </div>
        </main>
    );
};
