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

export async function loadPluginRecursively(plugin, view = "render") {
  for (let i = 0; i < plugin.plugins.length; i++) {
    let childPlugin = plugin.plugins[i];
    if (childPlugin !== null && childPlugin.pluginId) {
      plugin.plugins[i].pluginConfig = await loadPluginConfig(
        childPlugin.pluginId
      );
      if (view === "render") {
        plugin.plugins[i].component = await loadPlugin(
          childPlugin.pluginId,
          "Render"
        );
      }
      else if (view === "form") {
        plugin.plugins[i].component = await loadPlugin(
          childPlugin.pluginId,
          "Form"
        );
        if (plugin.plugins[i].pluginConfig.interruptionFields) {
          plugin.plugins[i].interruptionForm = await loadPlugin(
            childPlugin.pluginId,
            "InterruptionForm"
          );
        }
      }

      if (!plugin.plugins[i].breadcrumb) {
        plugin.plugins[i].breadcrumb = [];
      }
      if (!plugin.plugins[i].currentPlugin) {
        plugin.plugins[i].currentPlugin = null;
      }

      if (childPlugin.plugins) {
        console.log(view);
        await loadPluginRecursively(childPlugin, view);
      }
    }
  }
}