import { loadPluginsConfiguration } from "$lib/Internals/Plugin/loader";

export function getPluginDataFromForm(plugins) {
  let dataPlugins = [];
  for (let i = 0; i < plugins.length; i++) {
    dataPlugins = [
      ...dataPlugins,
      {
        pluginId: plugins[i].pluginConfig.id,
        order: plugins[i].order,
        data: plugins[i].data
      },
    ];
  }
  dataPlugins = JSON.stringify(dataPlugins);
  return dataPlugins;
}

export async function handlePluginCreation(firestoreObject, svelteComponent = "Render") {
  let pluginsConfiguration = await loadPluginsConfiguration();

  let pluginComponentsData = [];
  if (firestoreObject.plugins) {
    // recursivePluginLoading(null, firestoreObject, firestoreObject.plugins, svelteComponent, pluginComponentsData);
    // let object = {
    //   plugins: [
    //     { pluginId: "hello-world", order: 0, name: "test1" },
    //     {
    //       pluginId: "hello-world", order: 1,
    //       plugins: [{ pluginId: "hello-world", order: 0 }],
    //     },
    //   ],
    // }


  }
  return pluginComponentsData;
}

//   for (let i = 0; i < plugins.length; i++) {
//     let pluginId = plugins[i].pluginId;
//     let order = plugins[i].order;

//     let pluginConfig = pluginsConfiguration.find(
//       (pluginConfiguration) => pluginConfiguration.id === pluginId
//     );
//     let pluginData = {};
//     if (plugins[i].plugins) {
//       let pluginString = getStorageStringKey(plugins[i].pluginId, plugins[i].order);
//       handlePluginCreation(plugins[i], firestoreObject, plugins, svelteComponent, pluginComponentsData);
//     }

//     if (pluginConfig.storage) {
//       let storageKeys = Object.keys(pluginConfig.storage);
//       for (let i = 0; i < storageKeys.length; i++) {

//         let firestorePluginKey = "{" + pluginConfig.id + "}" + storageKeys[i];
//         if (firestoreObject[firestorePluginKey]) {
//           pluginData[storageKeys[i]] =
//             firestoreObject[firestorePluginKey];
//         }
//       }
//     }

//     let pluginComponent = await loadPlugin(pluginId, svelteComponent);

//     pluginComponentsData.push({
//       data: pluginData,
//       component: pluginComponent,
//     });
//   }
// }
