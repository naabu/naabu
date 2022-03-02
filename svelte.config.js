import preprocess from "svelte-preprocess";
import firebaseAdapter from "svelte-adapter-firebase";
import path from 'path'
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: true
  }),

  kit: {
    ssr: false,
    adapter: firebaseAdapter(),
    target: '#svelte',
    vite: {
      plugins: [
        precompileIntl('locales'),
      ],
      ssr: {
        noExternal: ['@algolia/autocomplete-js']
      },
      resolve: {
        alias: {
          '@plugins': path.resolve('./plugins')
        }
      }
    }
  }
};

export default config;