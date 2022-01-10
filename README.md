
## Introduction

Naabu wants to become the tool teachers, curriculum designers, and researchers use to improve learning outcomes. The tool allows creating a library of learning goals using a Wikipedia-like consensus approach. Teachers can create interactive learning activities and attach them to the learning goals. With this library of learning goals and activities, teachers can create new course modules where they just have to specify the learning goals they are teaching in class. 

The project is build in  [SvelteKit](https://kit.svelte.dev/), [Firebase](https://firebase.google.com/), [Algolia Search](https://www.algolia.com) and [Tailwind CSS](https://tailwindcss.com/).

Still in active development and it should not be used for production environments! Help wanted!

Links:
[Discord](https://discord.gg/tz2CSSrBgt)
[Twitch](https://www.twitch.tv/seriouspapa)
[YouTube](https://www.youtube.com/channel/UC9M52Jh9fKPGNF8HGBAbsqw)

## Local installation
Requirements:
- Create a Firebase app
- Algolia search keys

1. Run with Docker:
docker-compose up -d

2. 

## Deployments


## How to make transitions with tailwind and Svelte.
Use the Svelte Class Transition component:
``
  import Transition from 'svelte-class-transition';
``

Convert tailwind to this component:

- Entering = inTransition
- Entering from = inState
- Entering to = onState
- Leaving = outTransition
- Leaving from = Not there and not needed
- Leaving To = outState

## Playwright cheatsheet:
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

## Firebase production
- The Firebase production environment does not need admin keys or Firebase config settings. It is loaded and applied automatically.

## Updated indexes from Firebase UI
`firebase firestore:indexes > firestore.indexes.json`

## Embrace serverless paradigm
We made the decision to not support SSR for authenticated users. See part 3 of the twitch stream.

For SEO purposes public information should work with SSR.
