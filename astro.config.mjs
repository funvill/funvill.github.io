import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://blog.abluestar.com',
  output: 'static',
  integrations: [sitemap(), icon()],
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
