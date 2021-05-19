const c = [
	() => import("../../../src/routes/$layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/beheer/index.svelte"),
	() => import("../../../src/routes/beheer/activiteit/index.svelte"),
	() => import("../../../src/routes/beheer/activiteit/maken.svelte"),
	() => import("../../../src/routes/beheer/leerdoel/index.svelte"),
	() => import("../../../src/routes/beheer/leerdoel/woorden-bloom.svelte"),
	() => import("../../../src/routes/beheer/leerdoel/maken.svelte"),
	() => import("../../../src/routes/beheer/user/index.svelte"),
	() => import("../../../src/routes/about.svelte"),
	() => import("../../../src/routes/todos/index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/beheer/index.svelte
	[/^\/beheer\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/beheer/activiteit/index.svelte
	[/^\/beheer\/activiteit\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/beheer/activiteit/maken.svelte
	[/^\/beheer\/activiteit\/maken\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/beheer/leerdoel/index.svelte
	[/^\/beheer\/leerdoel\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/beheer/leerdoel/woorden-bloom.svelte
	[/^\/beheer\/leerdoel\/woorden-bloom\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/beheer/leerdoel/maken.svelte
	[/^\/beheer\/leerdoel\/maken\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/beheer/user/index.svelte
	[/^\/beheer\/user\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[10]], [c[1]]],

	// src/routes/todos/index.json.js
	[/^\/todos\.json$/],

	// src/routes/todos/index.svelte
	[/^\/todos\/?$/, [c[0], c[11]], [c[1]]],

	// src/routes/todos/[uid].json.js
	[/^\/todos\/([^/]+?)\.json$/]
];

export const fallback = [c[0](), c[1]()];