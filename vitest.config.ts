import { defineConfig } from 'vitest/config'

const vite = () => {
    return defineConfig({
        test: {
            clearMocks: true,
            environment: 'jsdom',
            globals: true,
            mockReset: true,
            setupFiles: ['./src/vitest-setup.tsx'],
        },
    });
};

export default vite;
