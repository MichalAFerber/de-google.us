import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://de-google.us',
  vite: {
    plugins: [tailwindcss()],
  },
});
