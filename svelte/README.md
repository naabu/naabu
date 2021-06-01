## Embrace serverless paradigm
We made the decision to not support SSR for authenticated users. See part 3 of the twitch stream.

For SEO purposes public information should work with SSR.

## How to make transitions with tailwind and Svelte.

Use the Svelte Class Transition component:

``
  import Transition from 'svelte-class-transition';
``

Convert tailwind to this component

- Entering = inTransition
- Entering from = inState
- Entering to = onState
- Leaving = outTransition
- Leaving from = Not there and not needed
- To = outState
