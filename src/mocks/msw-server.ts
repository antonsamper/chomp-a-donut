import { setupServer } from 'msw/node';

import { MSWHandlers } from './msw-handlers.ts';

export const MSWServer = setupServer(...MSWHandlers);
