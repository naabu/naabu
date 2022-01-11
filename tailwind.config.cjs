const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

module.exports = {
	mode: "aot",
	purge: {
		content: [
			"./src/**/*.{html,js,svelte,ts}",
		],
		options: {
			defaultExtractor: (content) => [
				// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
			],
		},
		safelist: [/^svelte-[\d\w]+$/],
	},
	theme: {
		extend: {
      minHeight: {
        '56': '14rem',
        '72': '18rem',
      },
			colors: {
      black: {
        500: "#262626",
      },
			blue: {
				50: "#e3f0fc",
				100: "#cce4fa",
				200: "#b5d7f7",
				300: "#95c6f4",
				400: "#70b2f0",
				500: "#288BE8",
				600: "#1676d0",
				700: "#1261ab",
				800: "#0e4981",
				900: "#0a3761",
			  },
			  yellow: {
				DEFAULT: '#288BE8',
			  },
			},
			gridTemplateColumns: {
				// Simple 8 row grid
			   'taxonomy': '2fr minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)',
			},
		},
	},
	variants: {
    extend: {
      opacity: ['disabled'],
    }
	},
	plugins: [
		require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
	],
	darkMode: false,
};
