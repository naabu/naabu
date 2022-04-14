import { loadConfigAllPlugins } from "$lib/../../plugins/plugins.js";
import { loadPluginComponent } from "$lib/../../plugins/plugins.js";

export async function loadPluginsConfiguration() {
  let pluginsConfig = await loadConfigAllPlugins();;
  return pluginsConfig;
}

export async function loadPlugin(pluginId, svelteComponent = "Render") {
  return await loadPluginComponent(pluginId, svelteComponent);
}

export async function loadPluginDataFromFirestore(pluginsJson, svelteComponent = "Render") {
  let plugins = JSON.parse(pluginsJson);
  let loadPluginsObject = {
    plugins: plugins,
  };
  await loadPluginRecursively(loadPluginsObject, svelteComponent);
  plugins = loadPluginsObject.plugins;
  for (let i = 0; i < plugins.length; i++) {
    plugins[i].currentPlugin = plugins[i];
  }
  return plugins;
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

export async function loadPluginRecursively(plugin, view = "render", topLevel = true) {
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

      if (!topLevel && !plugin.plugins[i].parentPlugin) {
        plugin.plugins[i].parentPlugin = plugin;
      }

      if (childPlugin.plugins) {
        await loadPluginRecursively(childPlugin, view, false);
      }
    }
  }
}
