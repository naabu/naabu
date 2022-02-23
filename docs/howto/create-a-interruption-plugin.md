---
layout: page
title: How to create a new interruption plugin
parent: How to guides
permalink: /how-to-guides/create-interruption-plugin
---

# Guide to create a plugin that can be interrupted.

1. Follow [Guide to create a plugin](/how-to-guides/create-plugin)
2. Set the ``canBeInterrupted`` plugin setting in the [config.js](/references/plugin/) to true.

3. In the config set the ``interruptionFields`` of the data that you need to store for each interruption. The data to determine when to go to the interruption. For example for the Vimeo API we store time in the video in seconds, when the player reaches the seconds it will interrupt the video.

4. Create ``InterruptFormField.svelte`` and store data.
```
export let data;

data = "Set based on your own custom data form"
```

5. Register the ``InterruptFormField.svelte`` in the ``plugin.js``

```
export async function loadPluginComponent(pluginId, svelteComponent = "Render") {
  ...
  if (pluginId == "<YOUR-PLUGIN-ID>") {
    else if (svelteComponent === "InterruptionForm") {
      return (await import("@plugins/<YOUR-PLUGIN-ID>/InterruptionForm.svelte")).default;
    }
```

6. In the Render export the interruptions:

```
export let interruptions = [];
```

7. Based on the data in the interruptions interrupt the plugin at the right time: 
```
for (let i = 0; i < interruptions.length; i++) {
  let interruption = interruptions[i];
  if (interruption.data. ...) {

  }
```

8. To interrupt dispatch the ``interrupt`` event and add the interruption in the detail:

```
 if (interruption.data. ...) {
  dispatch("interrupt", { interruption: interruption });
 }
```

9. Create a named ``interruption`` slot.

The interruption will be loaded in here this is the place to provide some custom styling.
```
<div class="custom-interruption-styling">
  <slot name="interruption" />
</div>
```

10. Create and export the ``advance`` function to handle the case when an interruption is finished.

```
export function advance() {
  // Continue with the plugin e.g. play the video again
  ... 
}
```
