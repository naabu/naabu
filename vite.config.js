import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin.js";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    precompileIntl('locales'),
  ],
  ssr: {
    noExternal: ['@algolia/autocomplete-js']
  },
  resolve: {
    alias: {
      '@plugins': path.resolve('./plugins')
    }
  },
	server: {
    fs: {
      allow: ["locales", "plugins"]
    }
	}
};

export default config;
