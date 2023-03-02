import { addMessages, init } from "svelte-intl-precompile";
import en from "$locales/en.js";
import nl from "$locales/nl.js";
addMessages("en", en);
addMessages("nl", nl);
import { PUBLIC_DEFAULT_LANGUAGE } from '$env/static/public';
let config = {
  fallbackLocale: "en",
};

console.log(PUBLIC_DEFAULT_LANGUAGE)
if (PUBLIC_DEFAULT_LANGUAGE) {
  config.initialLocale = PUBLIC_DEFAULT_LANGUAGE;
}
init(config);

export function load({ params }) {
  console.log(params)
  console.log("Load server and client")
  return {
    post: {
      title: `Title for ${params.slug} goes here`,
      content: `Content for ${params.slug} goes here`
    }
  };
}
