---
layout: page
title: How to work with Firebase
parent: How to guides
permalink: /how-to-guides/work-with-firebase
---

# How to guide of using Firebase
Useful how to guide on how to use Firebase in the project.

## Where to write security rules
``firestore.rules`` file in the root directory.

## Where to place function code
In the ``functions/`` directory.

## How to deploy to production.
Login to Firebase:
```firebase login```

Build the SvelteKit code:
```npm run build```

Deploy to an Firebase environment (This will take some minutes):
```firebase deploy```

## Updated Firestore indexes from Firebase UI
`firebase firestore:indexes > firestore.indexes.json`
