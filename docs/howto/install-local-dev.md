---
layout: page
title: Install a local environment
parent: How to guides
permalink: /how-to-guides/install-local-dev
---

# How to install the project for your local environment

A small guide on how to get the Tool to work locally.

## Local installation

Requirements:
- Create a [Firebase App](https://firebase.google.com/). First create a project then create an web app in the project and you will see the config.
- Store the config of Firebase in config/config-firebase.js (project settings => config)
- Create an [Algolia](https://www.algolia.com/) account and get the API configuration.
  - Algolia Admin API Key
  - Algolia Private key
  - Algolia public key.
- Algolia Application Id and Algoliase search client should be in ``config/config-algolia.js``
- Algolia Admin key should be in ``algolia-secret-admin-api-key.txt``
- Algolia indexes should be created: ``dev_goals``, ``dev_activities``, ``dev-connections`` and ``dev_maps``
- Import index configurations from files in repo (``config/algolia-indexes-config``) in the algolia interface
- Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

Installation steps:

1. Run with Docker (first time it will take a while):
``docker-compose up -d``

2. In one terminal, go inside the svelte kit container: 

- ``docker ps``
- ``docker exec -it naabu_sveltekit_1 bash``

3. Install NPM packages from package.json.lock
``npm ci``

1. Run the Svelte Kit dev server in this container:
``npm run dev``

5. Open a new terminal and go inside the firebase emulator container
``docker exec -it naabu_firebase_1 bash``
and start the Firebase emulators:

``npm run emulate``

6. Go to localhost:3000 and you should see the project and localhost:5001 to see the emulator UI of Firebase.

7. Errors? Reach out on [Discord](https://discord.gg/tz2CSSrBgt) for support or create an Github Issue.
