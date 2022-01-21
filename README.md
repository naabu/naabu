
## Introduction

Naabu wants to become the tool teachers, curriculum designers, and researchers use to improve learning outcomes. The tool allows creating a library of learning goals using a Wikipedia-like consensus approach. Teachers can create interactive learning activities and attach them to the learning goals. With this library of learning goals and activities, teachers can create new course modules where they just have to specify the learning goals they are teaching in class. 

The project is build in  [SvelteKit](https://kit.svelte.dev/), [Firebase](https://firebase.google.com/), [Algolia Search](https://www.algolia.com) and [Tailwind CSS](https://tailwindcss.com/).

Still in active development and it should not be used for production environments! Help wanted! Feel free to use the issue queue or reach out by [Discord](https://discord.gg/tz2CSSrBgt)

We stream development live every workday on [Twitch](https://www.twitch.tv/seriouspapa) and you can watch the streams back on [YouTube](https://www.youtube.com/channel/UC9M52Jh9fKPGNF8HGBAbsqw).

This project is an active contender in the [Futures Forum on Learning 2021](https://futuresforumonlearning.org/) learning engineering competition.

## Local installation
Requirements:
- Create a [Firebase App](https://firebase.google.com/)
- Store the config of Firebase in config/config-firebase.js (project settings => config)
- Create an [Algolia](https://www.algolia.com/) account and get the API configuration.
  - Algolia Admin API Key
  - Algolia Private key
  - Algolia public key.
- Algolia Application Id and Algoliase search client should be in ``config/config-algolia.js``
- Algolia Admin key should be in ``algolia-secret-admin-api-key.txt``
- Algolia indexes should be created: ``dev_goals``, ``dev_activities``, and ``dev_maps``
- Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

Installation steps:

1. Run with Docker (first time it will take a while):
``docker-compose up -d``

2. In one terminal, go inside the svelte kit container: 

- ``docker ps``
- ``docker exec -it naabu_sveltekit_1 bash``

3. Run the install script (one time only)
``bash scripts/install.sh``

4. Run the Svelte Kit dev server in this container:
``npm run dev``

5. Open a new terminal and go inside the firebase emulator container
``docker exec -it naabu_firebase_1 bash``
and start the Firebase emulators:

``npm run emulate``

6. Go to localhost:3000 and you should see the project and localhost:5001 to see the emulator UI of Firebase.

7. Errors? Reach out on [Discord](https://discord.gg/tz2CSSrBgt) for support.

## Roadmap
This roadmap can still be changed based on stakeholder input but it gives an idea about the direction where we expect the project will be going.

2022:
- Q1: Open source support and create more interactive learning activities.
- Q2: Implement [moment-to-moment learning curves](https://www.upenn.edu/learninganalytics/ryanbaker/GraphReplayBakerEtAlJLS08132013.pdf) dashboards.
- Q3: More features for teachers to better control the teaching of course modules.
- Q4: Features to build datasets for learning engineering and to do data science.

2023:
- Q1: Gamification features for students for the course modules. For example, competitivie or cooperative activities and fun activities related to the course modules.

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
The Firebase production environment does not need admin keys or Firebase config settings. It is loaded and applied automatically.

## Updated indexes from Firebase UI
`firebase firestore:indexes > firestore.indexes.json`

## Embrace serverless paradigm
We made the decision to [not support SSR](https://youtu.be/HMF1IorpKmk) for authenticated users for now. SSR is disabled until we have a good method to use SSR with SvelteKIt with Firebase.


## Why these docker containers?

Svelte kit tests containers is needed to connect to the Firebase service in the Docker containers. So firebase-code instead of localhost. This allows Playwright to be run in the Docker container which is usefull for quick testing and the continuous integration system.



