---
layout: page
title: How to create a new interruption plugin
parent: How to guides
permalink: /how-to-guides/create-interruption-plugin
---

# Guide to create a plugin that can be interrupted.

## Step 1
Follow [Guide to create a plugin](/naabu/how-to-guides/create-plugin)

## Step 2
Set the ``canBeInterrupted`` plugin setting in the [config.js](/naabu/references/plugin/) to true.

## Step 3
In the config set the ``interruptionFields`` of the data that you need to store for each interruption. The data to determine when to go to the interruption. For example for the Vimeo API we store time in the video in seconds, when the player reaches the seconds it will interrupt the video.

## Step 4
Create ``InterruptFormField.svelte`` and store data.
```js
export let data;
data = "Set based on your own custom data form"
```

## Step 5
Register the ``InterruptFormField.svelte`` in the ``plugin.js``


```js
export async function loadPluginComponent(pluginId, svelteComponent = "Render") {
  ...
  if (pluginId == "<YOUR-PLUGIN-ID>") {
    else if (svelteComponent === "InterruptionForm") {
      return (await import("@plugins/<YOUR-PLUGIN-ID>/InterruptionForm.svelte")).default;
    }
```

## Step 6
In the Render export the interruptions:

```js
export let interruptions = [];
```

## Step 7
Based on the data in the interruptions interrupt the plugin at the right time: 

```js
for (let i = 0; i < interruptions.length; i++) {
  let interruption = interruptions[i];
  if (interruption.data. ...) {

  }
```

## Step 8
To interrupt dispatch the ``interrupt`` event and add the interruption in the detail:

```js
 if (interruption.data. ...) {
  dispatch("interrupt", { interruption: interruption });
 }
```

## Step 9

Create a named ``interruption`` slot.

The interruption will be loaded in here this is the place to provide some custom styling.

```html
<div class="custom-interruption-styling">
  <slot name="interruption" />
</div>
```

## Step 10
Create and export the ``advance`` function to handle the case when an interruption is finished.

```js
export function advance() {
  // Continue with the plugin e.g. play the video again
  ... 
}
```
