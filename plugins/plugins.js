export async function loadConfigAllPlugins() {
  let plugins = [];
  plugins.push((await import("@plugins/vimeo-player/config.js")).default);
  plugins.push((await import("@plugins/multiple-choice/config.js")).default);
  plugins.push((await import("@plugins/exponential-simulator/config.js")).default);
  plugins.push((await import("@plugins/classify-drag-and-drop/config.js")).default);
  return plugins;
}

export async function loadPluginComponent(pluginId, svelteComponent = "Render") {
  if (pluginId == "vimeo-player") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/vimeo-player/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/vimeo-player/Form.svelte")).default;
    }
    else if (svelteComponent === "InterruptionForm") {
      return (await import("@plugins/vimeo-player/InterruptionForm.svelte")).default;
    }
  }

  if (pluginId == "multiple-choice") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/multiple-choice/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/multiple-choice/Form.svelte")).default;
    }
  }

  if (pluginId == "exponential-simulator") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/exponential-simulator/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/exponential-simulator/Form.svelte")).default;
    }
  }
  if (pluginId == "classify-drag-and-drop") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/classify-drag-and-drop/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/classify-drag-and-drop/Form.svelte")).default;
    }
  }
}
