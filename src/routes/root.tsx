import { Link } from 'react-router-dom';

import { Button } from '../components/button.tsx';
import { ThemeSwitcher } from '../components/theme-switcher.tsx';

export const Root = () => {
    return (
        <main className="mt-24 mb-8 flex flex-col items-center space-y-16 text-4xl sm:text-5xl md:mt-0 md:h-screen md:justify-center lg:text-6xl">
            <ThemeSwitcher />

            <h1 className="font-bold">Chomp a Donut</h1>

            <img
                alt="Chomp a Donut"
                className={
                    'w-full max-w-80 transition-all duration-300 hover:rotate-12 hover:cursor-pointer hover:-hue-rotate-[50deg] motion-reduce:transition-none'
                }
                draggable={false}
                src="/images/donut-main.svg"
            />

            <p className={'px-4 text-center md:px-24'} data-testid={'welcome-message'}>
                Welcome to Chomp a Donut!
                <br />
                Eat as many donuts as you like...virtually.
            </p>

            <div className={'flex flex-col items-center gap-4 md:flex-row md:gap-4'}>
                <Link to="/list">
                    <Button>Start Chomping!</Button>
                </Link>

                <Link to="/company/info">
                    <Button>More about us!</Button>
                </Link>
            </div>
        </main>
    );
};
