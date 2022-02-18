import { loadConfigAllPlugins } from "$lib/../../plugins/plugins.js";
import { loadPluginComponent } from "$lib/../../plugins/plugins.js";

export async function loadPluginsConfiguration() {
  let pluginsConfig = await loadConfigAllPlugins();;
  return pluginsConfig;
}

export async function loadPlugin(pluginId, svelteComponent = "Render") {
  return await loadPluginComponent(pluginId, svelteComponent);
}


export async function loadPluginConfig(pluginId) {
  let pluginsConfig = await loadPluginsConfiguration();
  for (let i = 0; i < pluginsConfig.length; i++) {
    if (pluginsConfig[i].id === pluginId) {
      return pluginsConfig[i];
    }
  }
  return null;
}