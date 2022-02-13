---
layout: page
title: How to convert Tailwind UI transitions to Svelte
parent: How to guides
permalink: /how-to-guides/tailwind-ui-to-svelte
---

# How to make transitions with tailwind and Svelte.

[TailwindUI](https://tailwindui.com) uses Tailwind classes for transitions (e.g. motion and slide in). Svelte has its own [motion API](https://svelte.dev/tutorial/tweened) but it is not compatible to this workflow with classes.

We make use of the [Svelte Class Transition](https://github.com/gawlk/svelte-class-transition) tool to be able to add classes during transitions. You can use the converting table below to get classes from TailwindUI and put them in a Transition object.

## Converting table
First import the Transition class
``
  import Transition from 'svelte-class-transition';
``

Convert Tailwind UI classes to this component:

- Entering = inTransition
- Entering from = inState
- Entering to = onState
- Leaving = outTransition
- Leaving from = Not there and not needed
- Leaving To = outState


## Example:

Tailwind UI gives these types of documentation for adding transitions:

```
<!--
  Off-canvas menu, show/hide based on off-canvas menu state.

  Entering: "transition ease-in-out duration-300 transform"
    From: "-translate-x-full"
    To: "translate-x-0"
  Leaving: "transition ease-in-out duration-300 transform"
    From: "translate-x-0"
    To: "-translate-x-full"
-->
```

We can convert this to this Svelte component




```
// Toggle shows or hide the content in the transition
let toggle= false

...


<Transition
  bind:toggle
  inTransition="transition ease-in-out duration-300 transform"
  inState="-translate-x-full"
  onState="translate-x-0"
  outTransition="transition ease-in-out duration-300 transform"
  outState="-translate-x-full"

>
  ... 
  // Content goes here for example a sliding sidebar

</Transition>