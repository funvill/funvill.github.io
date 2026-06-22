import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.abluestar.com',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: 'shiki'
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/.git/**', '**/dist/**']
      }
    }
  }
});
