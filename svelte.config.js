import preprocess from "svelte-preprocess";
import firebaseAdapter from "svelte-adapter-firebase";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
    ssr: false,
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: firebaseAdapter(),
		target: '#svelte',
		vite: {
      resolve: {
        alias: {
          $lib: path.resolve('./src/lib'),
        }
      },
			// optimizeDeps: {
			// 	exclude: ['@algolia/autocomplete-js']
			// },
			ssr: {
				noExternal: ['@algolia/autocomplete-js']
			}
		}
	}
};

export default config;