import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { Donut } from '../types/donut.ts';

import { Button } from '../components/button.tsx';
import { ThemeSwitcher } from '../components/theme-switcher.tsx';

const fetchDonuts = async () => {
    const cachedDonuts = sessionStorage.getItem('deliciousCachedDonuts');
    if (cachedDonuts) {
        return JSON.parse(cachedDonuts);
    }

    const response = await fetch('/data/donuts.json');

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const donuts: Donut[] = await response.json();

    const randomDonuts = donuts.sort(() => {
        return Math.random() - 0.5;
    });

    sessionStorage.setItem('deliciousCachedDonuts', JSON.stringify(randomDonuts));

    return randomDonuts;
};

export const DonutList = () => {
    const { data, error, isLoading } = useQuery<Donut[]>({
        queryFn: fetchDonuts,
        queryKey: ['donuts'],
    });

    const [totalPrice, setTotalPrice] = useState(0);
    const [chompedDonuts, setChompedDonuts] = useState<number[]>([]);

    useEffect(() => {
        const savedChompedDonuts = sessionStorage.getItem('chompedDonuts');
        const savedTotalPrice = sessionStorage.getItem('totalPrice');

        if (savedChompedDonuts) {
            setChompedDonuts(JSON.parse(savedChompedDonuts));
        }

        if (savedTotalPrice) {
            setTotalPrice(Number.parseFloat(savedTotalPrice));
        }
    }, []);

    const onChompDonut = (donut: Donut) => {
        const newTotalPrice = totalPrice + donut.price;
        const newChompedDonuts = [...chompedDonuts, donut.id];

        setTotalPrice(newTotalPrice);
        setChompedDonuts(newChompedDonuts);

        sessionStorage.setItem('totalPrice', newTotalPrice.toString());
        sessionStorage.setItem('chompedDonuts', JSON.stringify(newChompedDonuts));
    };

    const resetChompedDonuts = () => {
        setTotalPrice(0);
        setChompedDonuts([]);

        sessionStorage.removeItem('totalPrice');
        sessionStorage.removeItem('chompedDonuts');
        sessionStorage.removeItem('deliciousCachedDonuts');
    };

    return (
        <main className="mt-24 mb-8 flex flex-col items-center space-y-16 text-4xl sm:text-5xl md:mt-0 md:h-screen md:justify-center lg:text-6xl">
            <ThemeSwitcher />

            <h1 className="font-bold">Donuts</h1>

            {isLoading && <p className="px-4 text-center md:px-24">Loading donuts...</p>}

            {error && <p className="px-4 text-center md:px-24">There was a problem and we couldn't find any delicious donuts</p>}

            {!isLoading && !error && (!data || data.length === 0) && <p className="px-4 text-center md:px-24">No donuts found</p>}

            {!isLoading && !error && data && data.length > 0 && (
                <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {data.map((donut) => {
                            return (
                                <div
                                    className={`flex flex-col items-center gap-4 rounded-2xl bg-white/20 p-12 text-center ${chompedDonuts.includes(donut.id) ? 'opacity-60' : ''}`}
                                    key={donut.id}
                                >
                                    <img alt={donut.name} className={'mb-12 inline-block w-full max-w-40'} src={`/images/${donut.imageName}.svg`} />
                                    <p>{donut.name}</p>
                                    <p className={'text-2xl'}>£{donut.price}</p>
                                    <Button
                                        disabled={chompedDonuts.includes(donut.id)}
                                        onClick={() => {
                                            return onChompDonut(donut);
                                        }}
                                    >
                                        Chomp-a-donut
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                    {data.length === chompedDonuts.length && <p className={'text-3xl'}>🎉 You have chomped all the donuts! Have another go!</p>}
                </>
            )}

            <h2 className="font-bold">Total Price £{totalPrice.toFixed(2)}</h2>

            <div className={'flex flex-col items-center gap-4 md:flex-row md:gap-4'}>
                <div className={`${chompedDonuts.length === 0 ? 'opacity-60' : ''}`}>
                    <Button disabled={chompedDonuts.length === 0} onClick={resetChompedDonuts}>
                        ↺ Reset
                    </Button>
                </div>

                <Link to="/">
                    <Button>← Back</Button>
                </Link>
            </div>
        </main>
    );
};
