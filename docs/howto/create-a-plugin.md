---
layout: page
title: How to create a custom plugin
parent: How to guides
permalink: /how-to-guides/create-plugin
---

# Guide to create a plugin.

1. Create a directory in the ``plugin`` folder with your plugin-id.

2. Create a ``config.js``, ``Form.svelte`` a ``Render.svelte`` file.

3. Create sensible [config](/references/plugin/) for your plugin.

4. Create your ``Form.svelte``:

Set values in the data. You can use the [Storybook components](/naabu/references/storybook/index.html?path=/story/form-stories--form-example-1) but also create custom Svelte code.
For example:

```
<script>
export let data;
</script>

<FormField labelPosition="top" title="NumberInput label">
  <NumberInput bind:value={data.number} step="0.5" />
</FormField>
```

5. Create your ``Render.svelte``:

Export the data and use the data to render your plugin.

For example:
```
<script>
  export let data;
</script>

<p>
  This is a number: {data.number}
</p>
```

In the ``Render.svelte`` you need top dispatch the ``end`` event when plugin is complete:

For example, with a button:
```
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();

function end() {
  dispatch("end");
}
</script>

<Button on:click={end} content="Continue" />
```


6. To enable the button register the plugin in the ``plugin.js`` file:

Enable the plugin configuration:
```
export async function loadConfigAllPlugins() {
let plugins = [];
  plugins.push((await import("@plugins/<YOUR-PLUGIN-ID>/config.js")).default);
  return plugins;
}
```

Enable the Form.svelte and Render.svelte:
```
export async function loadPluginComponent(pluginId, svelteComponent = "Render") {
  ...
  if (pluginId == "<YOUR-PLUGIN-ID>") {
    if (svelteComponent === "Render") {
      return (await import("@plugins/<YOUR-PLUGIN-ID>/Render.svelte")).default;
    }
    else if (svelteComponent === "Form") {
      return (await import("@plugins/<YOUR-PLUGIN-ID>/Form.svelte")).default;
    }
  }
}
```
