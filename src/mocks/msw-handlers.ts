import { http, HttpResponse } from 'msw';

export const MSWHandlers = [
    http.get('/data/donuts.json', () => {
        return HttpResponse.json([
            { id: 1, imageName: 'donut-1', name: 'Test donut 1', price: 100 },
            { id: 2, imageName: 'donut-2', name: 'Test donut 2', price: 200 },
        ]);
    }),
];

export const MSWEmptyHandlers = [
    http.get('/data/donuts.json', () => {
        return HttpResponse.json([]);
    }),
];

export const MSWErrorHandlers = [
    http.get('/data/donuts.json', () => {
        return new HttpResponse(null, { status: 500 });
    }),
];
