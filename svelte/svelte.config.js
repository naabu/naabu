import preprocess from "svelte-preprocess";
import firebaseAdapter from "svelte-adapter-firebase";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: firebaseAdapter(),
		target: '#svelte',
		vite: {
			// optimizeDeps: {
			// 	exclude: ['@algolia/autocomplete-js']
			// },
			ssr: {
				noExternal: ['@algolia/autocomplete-js', 'leaflet']
			}
		}
	}
};

export default config;