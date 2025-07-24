import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { MSWEmptyHandlers, MSWErrorHandlers } from '../mocks/msw-handlers.ts';
import { MSWServer } from '../mocks/msw-server.ts';
import { renderComponentWithRouteContext } from '../vitest-setup.tsx';
import { DonutList } from './donut-list.tsx';

describe('<DonutList />', () => {
    test('displays the loading message', () => {
        renderComponentWithRouteContext(<DonutList />);

        expect(screen.getByText('Loading donuts...')).toBeInTheDocument();
    });

    test('displays error message when theres a problem loading donuts', async () => {
        MSWServer.use(...MSWErrorHandlers);

        renderComponentWithRouteContext(<DonutList />);

        await waitFor(() => {
            expect(screen.getByText("There was a problem and we couldn't find any delicious donuts")).toBeInTheDocument();
        });
    });

    test('displays the no donuts message', async () => {
        MSWServer.use(...MSWEmptyHandlers);

        renderComponentWithRouteContext(<DonutList />);

        await waitFor(() => {
            expect(screen.getByText('No donuts found')).toBeInTheDocument();
        });
    });

    test('displays the list of donuts', async () => {
        renderComponentWithRouteContext(<DonutList />);

        await waitFor(() => {
            expect(screen.queryByText('Loading donuts...')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Donuts')).toBeInTheDocument();

        expect(screen.getByText('Test donut 1')).toBeInTheDocument();
        expect(screen.getByText('£100')).toBeInTheDocument();

        expect(screen.getByText('Test donut 2')).toBeInTheDocument();
        expect(screen.getByText('£200')).toBeInTheDocument();
    });

    test('allows the user to chomp donuts', async () => {
        renderComponentWithRouteContext(<DonutList />);

        await waitFor(() => {
            expect(screen.queryByText('Loading donuts...')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Total Price £0.00')).toBeInTheDocument();

        const chompButtons = screen.getAllByRole('button', { name: 'Chomp-a-donut' });

        await userEvent.click(chompButtons[0]);
        await userEvent.click(chompButtons[1]);

        expect(screen.getByText('Total Price £300.00')).toBeInTheDocument();
    });

    test('allows the user to reset the chomped donuts', async () => {
        renderComponentWithRouteContext(<DonutList />);

        await waitFor(() => {
            expect(screen.queryByText('Loading donuts...')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Total Price £0.00')).toBeInTheDocument();

        const chompButtons = screen.getAllByRole('button', { name: 'Chomp-a-donut' });

        await userEvent.click(chompButtons[0]);
        await userEvent.click(chompButtons[1]);

        await userEvent.click(screen.getByRole('button', { name: '↺ Reset' }));

        expect(screen.getByText('Total Price £0.00')).toBeInTheDocument();
    });

    test('retains the chomped donuts in session storage', async () => {
        expect(sessionStorage.getItem('chompedDonuts')).toBeNull();

        renderComponentWithRouteContext(<DonutList />);

        await waitFor(() => {
            expect(screen.queryByText('Loading donuts...')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Total Price £0.00')).toBeInTheDocument();

        const chompButtons = screen.getAllByRole('button', { name: 'Chomp-a-donut' });

        await userEvent.click(chompButtons[0]);
        await userEvent.click(chompButtons[1]);

        expect(sessionStorage.getItem('totalPrice')).toBe('300');
        expect(JSON.parse(sessionStorage.getItem('deliciousCachedDonuts') as string)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: 1, name: 'Test donut 1', price: 100 }),
                expect.objectContaining({ id: 2, name: 'Test donut 2', price: 200 }),
            ]),
        );
    });
});
