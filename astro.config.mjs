import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// замінити на домен клієнта
export default defineConfig({
  site: 'https://zerno-cafe.example.com',
  integrations: [react(), tailwind({ applyBaseStyles: false }), sitemap()]
});
