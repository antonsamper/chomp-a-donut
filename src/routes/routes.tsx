import { Navigate } from 'react-router-dom';

import { CompanyInfo } from './company-info.tsx';
import { DonutList } from './donut-list.tsx';
import { Root } from './root.tsx';

export const Routes = [
    {
        element: <Root />,
        path: '/',
    },
    {
        element: <DonutList />,
        path: '/list',
    },
    {
        children: [
            {
                element: <CompanyInfo />,
                path: 'info',
            },
            {
                element: <Navigate replace to="info" />,
                path: '*',
            },
        ],
        path: '/company',
    },
    {
        element: <Navigate replace to="/" />,
        path: '*',
    },
];
