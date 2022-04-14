export async function loadConfigAllPlugins() {
  let plugins = [];
  plugins.push((await import("@plugins/activity/youtube-player/config.js")).default);
  plugins.push((await import("@plugins/activity/vimeo-player/config.js")).default);
  plugins.push((await import("@plugins/activity/multiple-choice/config.js")).default);
  plugins.push((await import("@plugins/activity/classify-drag-and-drop/config.js")).default);
  plugins.push((await import("@plugins/activity/exponential-simulator/config.js")).default);
  plugins.push((await import("@plugins/dashboard/feedback/data-table/config.js")).default);
  plugins.push((await import("@plugins/dashboard/models/analytics/config.js")).default);
  return plugins;
}

export async function loadPluginComponent(pluginId, svelteComponent = "Render") {
  if (pluginId == "vimeo-player") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/activity/vimeo-player/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/activity/vimeo-player/Form.svelte")).default;
    }
    else if (svelteComponent === "InterruptionForm") {
      return (await import("@plugins/activity/vimeo-player/InterruptionForm.svelte")).default;
    }
  }

  if (pluginId == "multiple-choice") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/activity/multiple-choice/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/activity/multiple-choice/Form.svelte")).default;
    }
  }

  if (pluginId == "exponential-simulator") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/activity/exponential-simulator/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/activity/exponential-simulator/Form.svelte")).default;
    }
  }
  if (pluginId == "classify-drag-and-drop") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/activity/classify-drag-and-drop/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/activity/classify-drag-and-drop/Form.svelte")).default;
    }
  }
  if (pluginId == "youtube-player") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/activity/youtube-player/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/activity/youtube-player/Form.svelte")).default;
    }
    else if (svelteComponent === "InterruptionForm") {
      return (await import("@plugins/activity/youtube-player/InterruptionForm.svelte")).default;
    }
  }

  if (pluginId == "data-table") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/dashboard/feedback/data-table/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/dashboard/feedback/data-table/Form.svelte")).default;
    }
  }

  if (pluginId == "analytics") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/dashboard/models/analytics/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/dashboard/models/analytics/Form.svelte")).default;
    }

  }
}
