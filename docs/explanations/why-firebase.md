---
layout: page
title: Explanations
permalink: /explanations/why-firebase
---
Why do we use Firebase and not an open source stack?

# Technical reasons

## Outsourcing infrastructure work
From experience, setting up and maintaining infrastructure can take a lot of work. Using an system like Firebase outsources much of this work without extra cost to cloud resources. The Naabu tool needs a place to run on and we would have hosted it with a cloud solution anyway and Google cloud is a good fit because of support for Tensorflow.

## Scalable by default
The Firebase stack with the Firestore and Firebase functions are scalable by design. All the scaling will be done automatically and there should be little technical work needed when the traffic increases exponentially.

## Attributed-based access control with Firestore.
Authentication and authorization is an important aspect to get right. [Firebase Auth](https://firebase.google.com/docs/auth/web/google-signin) lets us pick between many providers so users can use there Google account to create an account for Naabu. Furthermore, it has support for custom Auth systems which should help when you need to make an custom integrations for school systems.

For the authorization part it is important to be able to specify who has access to what data. The most flexible way of creating such a system is using [attributed-based access control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control). Firebase integrated a [rules system](https://firebase.google.com/docs/firestore/security/get-started) with Firestore where you can determine access based on attributes. 

## Event driven backend architecture build on top of Google Cloud functions.
[Event driven architecture's](https://en.wikipedia.org/wiki/Event-driven_architecture) are useful to keep the code clean. However, it is difficult to set up yourself. Every Firebase Function is transferer to a Google Cloud function and will run on its own machine. They are triggered by events from Firestore and Firebase Auth and make the system flexible to extend.

One use case we have is to use Python Google Functions to retrieve the best activities for users using machine learning. Python functions can also trigger on the Firebase events making the whole system pretty extensible to anything we need.

Alternatives to Google functions are AWS Lambda on the Amazon cloud. A buzzword that is often used to describe these functions is serverless architecture. This serverless paradigm plays well with SvelteKit that embraces this [serverless paradigm](https://www.youtube.com/watch?v=qSfdtmcZ4d0&t=1194s) that can be contrasted to running your own node.js servers.

# Other reasons
## Using a large name
Hosting on the Google Cloud can help in adopting this solution for educational institutions that are used to use Google products. People have some trust in large institutions like Google compared to some more unknown but growing solution like [Vercel](https://vercel.com/) or [Netifly](https://www.netlify.com/).

## Firebase popularity
There are many installations on Firebase on the web. Furthermore, they have a large user base with Android developers. Many developers have experience with Firebase and many more at least know the name.

## Documentation

The [documentation of Firebase](https://firebase.google.com/docs) is comprehensive and there are many additional learning opportunities to [learn Firebase](https://www.youtube.com/c/firebase).

# Downsides of using Firebase

## Open source
- Firebase itself is not open source and we can only host it on the Google Cloud. The [Firebase JS Sdk](https://github.com/firebase/firebase-js-sdk
) has an open source license.

Some people can use this non-open source as the reason for not using this project.

## Server Side Rendering (SSR) support
With a serious attempt to get SSR working with Firebase we ran into [many issues](https://www.youtube.com/watch?v=HMF1IorpKmk&t). It seems that Firebase is still behind supporting the serverless paradigm related to SSR. They do support server side rendering but expect special server code that handles the rendering. With SvelteKit we have the same code run both on the initial load of the server and on the client.

## SvelteKit support
Svelte Kit support adapters but Firebase is not an official adapter. There is a community [SvelteKit Firebase adapter](https://github.com/jthegedus/svelte-adapter-firebase) that works well and contains very little magic. What it does is that it moves the compiled SvelteKit code to a ``functions/ssr`` directory and in the ``functions/index.js`` file we can write our Firebase functions code. For SvelteKit it creates one ssr function that executes the SvelteKit code. With Firebase hosting we can serve this function from a domain.

# When should we support other more open stacks?
It would be great if we would be able to support multiple solutions and use an Adapter like system to host our code anywhere people want. Unfortunately, this is require a massive undertaken because every platform has its own special syntax and solutions. 

The codebase would be more difficult to work with and maintain and in case there are issues we would have a harder time solving issues with multiple stacks.

The only viable option to support multiple systems is to have a larger community working on it.
