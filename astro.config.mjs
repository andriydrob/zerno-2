import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// ⚠️ Заміни на реальний домен клієнта перед деплоєм — sitemap.xml
// і canonical/OG-теги в Layout.astro будуються від цього значення.
export default defineConfig({
  site: 'https://zerno-cafe.example.com',
  integrations: [react(), tailwind({ applyBaseStyles: false }), sitemap()]
});
