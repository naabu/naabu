import { addMessages, init } from "svelte-intl-precompile";
import en from "$locales/en.js";
import nl from "$locales/nl.js";
addMessages("en", en);
addMessages("nl", nl);
export const ssr = false;
