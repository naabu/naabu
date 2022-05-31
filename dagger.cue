package main

import (
	"dagger.io/dagger"
  "universe.dagger.io/docker"
)

#SvelteKitBuild: {
  source: dagger.#FS

  image: _build.output

  _build: docker.#Build & {
    steps: [
      docker.#Pull & {
        source: "node:14"
      },
      docker.#Copy & {
        contents: source
        dest:     "/app"
      },
      docker.#Run & {
        command: {
          name: "npm"
          args: ["ci"]
        }
        workdir: "/app"
      },
      docker.#Run & {
        command: {
          name: "npm"
          args: ["set", "audit", "false"]
        }
        workdir: "/app"
      },
      docker.#Set & {
        config: {
          cmd: ["npm", "run", "dev"]
          workdir: "/app"
        }
      }
    ]
  }

	// docker.#Dockerfile & {
	// 	dockerfile: contents: """
  //       FROM node:14 
  //       COPY package.json /var/www/
  //       COPY package-lock.json /var/www/
  //       RUN chmod -R 777 /var/www/
  //       USER node
  //       WORKDIR /var/www/
  //       RUN npm ci 
  //       RUN npm set audit false
  //       ENV PATH /var/www/node_modules/.bin:$PATH
  //       CMD ["tail", "-f", "/dev/null"]
  //       EXPOSE 3000
  //       """
	// }
}

dagger.#Plan & {
	client: filesystem: {
    ".": read: {
      contents: dagger.#FS
      exclude: [
        ".firebase",
        ".github",
        ".storybook",
        ".svelte-kit",
        "ci",
        "config",
        "cue.mod",
        "data",
        "dockerfiles",
        "docs",
        "node_modules",
        "scripts",
        "test-results",
        ".dockerignore",
        ".firebaserc",
        ".gitignore",
      ] 
    }
  }
	actions: build: #SvelteKitBuild & {
		source: client.filesystem.".".read.contents
	}
}
