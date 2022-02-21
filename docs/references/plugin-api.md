---
layout: page
title: Plug-in API Reference
permalink: /references/plugin/ 
parent: References
nav_order: 3
---
# Plugin reference

## Plugin config.js settings

| Config                 | type    | Description                                                                 |
| ---------------------- | ------- | --------------------------------------------------------------------------- |
| **id**                 | string  | The plugin ID                                                               |
| **name**               | string  | Shows when user selects a plugin                                            |
| **description**        | string  | Shows when user selects a plugin                                            |
| **canBeInterrupted**   | boolean | True if you support interruption in your plugin                             |
| **canInterrupt**       | boolean | True if you want this plugin be used as interruption in other plugins       |
| **canBeObserved**      | boolean | True if you support being observed by your interruptions                    |
| **canObserve**         | boolean | True if you support observing your parent plugins that you are interrupting |
| **storage**            | array   | Config your fields that you store in the data                               |
| **interruptionFields** | array   | add fields that need to be set for interruptions to this plugin             |



Example: 
```
const config = {
  id: "multiple-choice", 
  name: "Multiple choice",
  description: "Pick one of the options",
  canBeInterrupted: false,
  canInterrupt: true,
  canBeObserved: false,
  canObserve: true,
  storage: {
    quizzes: {
    }
  },
  interruptionFields:
  {
    timeInVideo: {
    }
  }
}

export default config;
```

## Plugin to be interrupted reference

-  ``canBeInterrupted`` to true.
- Set the ``interruptionFields`` in config.
- Create ``InterruptFormField.svelte``
- Register the ``InterruptFormField.svelte`` in the ``plugin.js``
- Access the interruptions in ``Render.svelte`` with:
```export let interruptions = [];
for (let i = 0; i < interruptions.length; i++) {
  let interruption = interruptions[i];
  if (interruption.data. ...) {
```
- Dispatch interruption in ``Render.svelte``: 
```dispatch("interrupt", { interruption: interruption });```

- Named slot ``interruption`` to display interruption in ``Render.svelte``.
```
  <slot name="interruption" />
```

- Create an advance function to continue with the plugin after an interruption in ``Render.svelte``
```
export function advance() {
```

## Plugin to be observable reference

- Only plugins that can be interrupted can be observed.
- ``canBeObservable`` to true in the plugin ``config.js``
- Provide a observe function in ``Render.svelte`` with:
```
export function observe() {
```
- Dispatch ``observeComplete`` event when observing is done.
```
  dispatch("observeComplete");
```