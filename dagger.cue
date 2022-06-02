package main

import (
	"dagger.io/dagger"
	"universe.dagger.io/docker"
  "universe.dagger.io/docker/cli"
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
				dest:     "/var/www"
        include: ["package.json", "package-lock.json"]
			},
			docker.#Run & {
				command: {
					name: "npm"
					args: ["ci"]
				}
				workdir: "/var/www"
			},
			docker.#Run & {
				command: {
					name: "npm"
					args: ["set", "audit", "false"]
				}
				workdir: "/var/www"
			},
      docker.#Copy & {
				contents: source
				dest:     "/var/www"
        exclude: ["package.json", "package-lock.json"]
			},
			docker.#Set & {
				config: {
					cmd: ["npm", "run", "dev"]
					workdir: "/var/www"
				}
			},
		]
	}
}

#FirebaseBuild: {
	source: dagger.#FS
	image:  _build.output

	_build: docker.#Build & {
		steps: [
			docker.#Pull & {
				source: "node:14"
			},
      docker.#Run & {
				command: {
					name: "apt-get"
					args: ["update"]
				}
			},
			docker.#Run & {
				command: {
					name: "apt-get"
					args: ["install", "-y", "default-jre"]
				}
			},
			docker.#Copy & {
				contents: source
        include: ["package.json", "package-lock.json", "functions/package.json", "functions/package-lock.json"]
				dest:     "/var/www"
			},
			docker.#Run & {
				command: {
					name: "npm"
					args: ["ci"]
				}
				workdir: "/var/www"
			},
			docker.#Run & {
				command: {
					name: "npm"
					args: ["set", "audit", "false"]
				}
				workdir: "/var/www"
			},
			docker.#Run & {
				command: {
					name: "npm"
					args: ["ci"]
				}
				workdir: "/var/www/functions"
			},
      docker.#Copy & {
				contents: source
        exclude: ["package.json", "package.json-lock", "functions/package.json", "functions/package.json-lock"]
				dest:     "/var/www"
			},
			docker.#Set & {
				config: {
					cmd: ["npm", "run", "emulate"]
					workdir: "/var/www"
				}
			},
		]
	}
}

#TestDockerRun: {
	firebaseImage:  docker.#Image
	svelteKitImage: docker.#Image
	// _alpine: core.#Pull & {source: "alpine:3"}
	printHelloFirebase: docker.#Run & {
		input: firebaseImage
		command: {
			name: "echo"
			args: ["hello, world!"]
		}
	}
	printHelloSvelteKit: docker.#Run & {
		input: svelteKitImage
		command: {
			name: "echo"
			args: ["hello, world!"]
		}
	}
}

dagger.#Plan & {
  client: {
    env: {
      GITHUB_REF_NAME: string | *"master"
      GITHUB_ACTOR: string
      GITHUB_TOKEN: dagger.#Secret
    }
  }
	client: network: "unix:///var/run/docker.sock": connect: dagger.#Socket
  client: filesystem: {
		".": read: {
			contents: dagger.#FS
			exclude: [
				".firebase",
				".github",
				".storybook",
				".svelte-kit",
				"ci",
				"cue.mod",
				"data",
				"dockerfiles",
				"docs",
				"node_modules",
				"test-results",
				".dockerignore",
				".firebaserc",
				".gitignore",
			]
		}
	}

	actions: {
    buildImages: {
      svelteKitBuild: #SvelteKitBuild & {
        source: client.filesystem.".".read.contents
      }
      firebaseBuild: #FirebaseBuild & {
        source: client.filesystem.".".read.contents
      }
    }

    testRunContainers: #TestDockerRun & {
      firebaseImage:  buildImages.firebaseBuild.image
      svelteKitImage: buildImages.svelteKitBuild.image
    }

    buildLocal: {
      svelteKitImageToLocalDockerRepo: cli.#Load & {
          image: buildImages.svelteKitBuild.image
          host:  client.network."unix:///var/run/docker.sock".connect
          tag:   "sveltekit-dagger:latest"
      }
      firebaseImageToLocalDockerRepo: cli.#Load & {
          image: buildImages.firebaseBuild.image
          host:  client.network."unix:///var/run/docker.sock".connect
          tag:   "firebase-dagger:latest"
      }
    }
    pushImages: {
      pushSvelteKitImage: docker.#Push & {
        image: buildImages.svelteKitBuild.image
        dest: "ghcr.io/naabu/naabu_sveltekit:\(client.env.GITHUB_REF_NAME)"
        auth: {
          username: client.env.GITHUB_ACTOR
          secret: client.env.GITHUB_TOKEN
        }
      }
      pushFirebaseImage: docker.#Push & {
        image: buildImages.firebaseBuild.image
        dest: "ghcr.io/naabu/naabu_firebase:\(client.env.GITHUB_REF_NAME)"
        auth: {
          username: client.env.GITHUB_ACTOR
          secret: client.env.GITHUB_TOKEN
        }
      }
    }
	}
}
