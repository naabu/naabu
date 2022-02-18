export async function loadConfigAllPlugins() {
  let plugins = [];
  plugins.push((await import("@plugins/helloworld/config.js")).default);
  plugins.push((await import("@plugins/helloworld2/config.js")).default);
  plugins.push((await import("@plugins/helloworld3/config.js")).default);
  plugins.push((await import("@plugins/vimeo-player/config.js")).default);
  plugins.push((await import("@plugins/multiple-choice/config.js")).default);
  return plugins;
}

export async function loadPluginComponent(pluginId, svelteComponent = "Render") {
  if (pluginId == "hello-world") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/helloworld/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/helloworld/Form.svelte")).default;
    }
  }

  if (pluginId == "hello-world2") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/helloworld2/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/helloworld2/Form.svelte")).default;
    }
  }

  if (pluginId == "hello-world3") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/helloworld3/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/helloworld3/Form.svelte")).default;
    }
  }

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
}
