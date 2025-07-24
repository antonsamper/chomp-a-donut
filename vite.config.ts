import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const vite = () => {
    return defineConfig({
        plugins: [react(), tailwindcss()],
    });
};

export default vite;
