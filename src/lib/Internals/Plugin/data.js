import { loadPluginsConfiguration } from "$lib/Internals/Plugin/loader";

function recursiveDataPlugin(plugins) {
  let dataPlugins = [];
  for (let i = 0; i < plugins.length; i++) {
    let pluginData = {
      pluginId: plugins[i].pluginConfig.id,
      order: plugins[i].order,
      data: plugins[i].data
    }
    if (plugins[i].interruptionData) {
      pluginData.interruptionData = plugins[i].interruptionData;
    }
    if (plugins[i].plugins) {
      pluginData.plugins = recursiveDataPlugin(plugins[i].plugins)
    }
    if (dataPlugins.length > 0) {
      dataPlugins = [
        ...dataPlugins,
        pluginData
      ];
    } else {
      dataPlugins = [pluginData];
    }
  }
  return dataPlugins;
}

export function getPluginDataFromForm(plugins) {
  let dataPlugins = recursiveDataPlugin(plugins);
  console.log(dataPlugins);
  dataPlugins = JSON.stringify(dataPlugins);
  return dataPlugins;
}

export async function handlePluginCreation(firestoreObject, svelteComponent = "Render") {
  let pluginsConfiguration = await loadPluginsConfiguration();

  let pluginComponentsData = [];
  return pluginComponentsData;
}
