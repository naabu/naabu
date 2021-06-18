const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/beheer/__layout.svelte"),
	() => import("../../../src/routes/beheer/index.svelte"),
	() => import("../../../src/routes/beheer/activiteit/index.svelte"),
	() => import("../../../src/routes/beheer/activiteit/maken.svelte"),
	() => import("../../../src/routes/beheer/activiteit/[id]/index.svelte"),
	() => import("../../../src/routes/beheer/activiteit/[id]/dashboard.svelte"),
	() => import("../../../src/routes/beheer/activiteit/[id]/wijzigen.svelte"),
	() => import("../../../src/routes/beheer/gebruiker/index.svelte"),
	() => import("../../../src/routes/beheer/leerdoel/index.svelte"),
	() => import("../../../src/routes/beheer/leerdoel/woorden-bloom.svelte"),
	() => import("../../../src/routes/beheer/leerdoel/maken.svelte"),
	() => import("../../../src/routes/beheer/leerdoel/[id]/index.svelte"),
	() => import("../../../src/routes/beheer/leerdoel/[id]/wijzigen.svelte"),
	() => import("../../../src/routes/about.svelte"),
	() => import("../../../src/routes/todos/index.svelte"),
	() => import("../../../src/routes/[id].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/beheer/index.svelte
	[/^\/beheer\/?$/, [c[0], c[3], c[4]], [c[1]]],

	// src/routes/beheer/activiteit/index.svelte
	[/^\/beheer\/activiteit\/?$/, [c[0], c[3], c[5]], [c[1]]],

	// src/routes/beheer/activiteit/maken.svelte
	[/^\/beheer\/activiteit\/maken\/?$/, [c[0], c[3], c[6]], [c[1]]],

	// src/routes/beheer/activiteit/[id]/index.svelte
	[/^\/beheer\/activiteit\/([^/]+?)\/?$/, [c[0], c[3], c[7]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/activiteit/[id]/dashboard.svelte
	[/^\/beheer\/activiteit\/([^/]+?)\/dashboard\/?$/, [c[0], c[3], c[8]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/activiteit/[id]/wijzigen.svelte
	[/^\/beheer\/activiteit\/([^/]+?)\/wijzigen\/?$/, [c[0], c[3], c[9]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/gebruiker/index.svelte
	[/^\/beheer\/gebruiker\/?$/, [c[0], c[3], c[10]], [c[1]]],

	// src/routes/beheer/leerdoel/index.svelte
	[/^\/beheer\/leerdoel\/?$/, [c[0], c[3], c[11]], [c[1]]],

	// src/routes/beheer/leerdoel/woorden-bloom.svelte
	[/^\/beheer\/leerdoel\/woorden-bloom\/?$/, [c[0], c[3], c[12]], [c[1]]],

	// src/routes/beheer/leerdoel/maken.svelte
	[/^\/beheer\/leerdoel\/maken\/?$/, [c[0], c[3], c[13]], [c[1]]],

	// src/routes/beheer/leerdoel/[id]/index.svelte
	[/^\/beheer\/leerdoel\/([^/]+?)\/?$/, [c[0], c[3], c[14]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/leerdoel/[id]/wijzigen.svelte
	[/^\/beheer\/leerdoel\/([^/]+?)\/wijzigen\/?$/, [c[0], c[3], c[15]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[16]], [c[1]]],

	// src/routes/todos/index.json.js
	[/^\/todos\.json$/],

	// src/routes/todos/index.svelte
	[/^\/todos\/?$/, [c[0], c[17]], [c[1]]],

	// src/routes/todos/[uid].json.js
	[/^\/todos\/([^/]+?)\.json$/],

	// src/routes/[id].svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[18]], [c[1]], (m) => ({ id: d(m[1])})]
];

export const fallback = [c[0](), c[1]()];