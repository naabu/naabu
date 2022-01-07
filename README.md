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
- Leaving To = outState

Playwright cheatsheet:
```
// await expect(page.locator()).toContainText();
// await page.click();
// await page.fill('', '');
// await page.pause();
// await expect(page.locator()).toBeVisible();
// await expect(page.locator()).not.toBeVisible();
// await page.selectOption('select#', '');
// await expect(page.locator('')).toHaveValue('');
```


## Some handy things to know about non-obvious things
- If deploying on firebase functions. Do not supply default config. 
It is loaded automatically. Even the admin keys!


## Updated indexes from Firebase UI
`firebase firestore:indexes > firestore.indexes.json`
