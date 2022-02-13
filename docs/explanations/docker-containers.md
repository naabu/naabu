---
layout: page
title: Whats up with Docker?
parent: Explanations
permalink: /explanations/docker
---

# Why all these docker-compose files?

We use Github actions to build and test the project. in the ``ci/`` folder are all the images that are needed for the build.

Svelte kit tests containers is needed to connect to the Firebase service in the Docker containers. So firebase-code instead of localhost. This allows Playwright to be run in the Docker container which is useful for quick testing and the continuous integration system.

Jekyll is the documentation in Github.

Storybook is running in the svelte-kit images.

We have split the build into core images that install all dependencies but not the code. The idea is that we do not need to update dependencies that often and we often change the code. The split will make it easier for other developers to work on the project as they do not run into dependencies issues as much and will have a faster initial Docker build.

