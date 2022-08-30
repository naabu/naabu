import preprocess from "svelte-preprocess";
import firebase from "svelte-adapter-firebase";


/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: true
  }),

  kit: {
    adapter: firebase(),
  }
};

export default config;
