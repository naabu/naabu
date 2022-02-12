import { loadConfigAllPlugins } from "$lib/../../plugins/plugins.js";
import { loadPluginComponent } from "$lib/../../plugins/plugins.js";

export async function loadPluginsConfiguration() {
  let pluginsConfig = await loadConfigAllPlugins();;
  return pluginsConfig;
}

export async function loadPlugin(pluginId, svelteComponent = "Render") {
  return await loadPluginComponent(pluginId, svelteComponent);
}