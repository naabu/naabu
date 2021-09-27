const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/curriculum-profiel/mijn-profiel.svelte"),
	() => import("../../../src/routes/curriculum-profiel/wijzigen.svelte"),
	() => import("../../../src/routes/curriculum-profiel/maken.svelte"),
	() => import("../../../src/routes/curriculum-profiel/[id]/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/geschiedenis.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/overleg.svelte"),
	() => import("../../../src/routes/cypress/login-normal-user.svelte"),
	() => import("../../../src/routes/cypress/reset-map.svelte"),
	() => import("../../../src/routes/overleg/[talkId]/index.svelte"),
	() => import("../../../src/routes/overleg/[talkId]/[postId]/index.svelte"),
	() => import("../../../src/routes/revisie/[id]/index.svelte"),
	() => import("../../../src/routes/revisie/[id]/wijzigen.svelte"),
	() => import("../../../src/routes/revisie/[id]/diff/[oldId]/index.svelte"),
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
	() => import("../../../src/routes/beheer/test-ssr.svelte"),
	() => import("../../../src/routes/beheer/kaart/index.svelte"),
	() => import("../../../src/routes/beheer/kaart/maken.svelte"),
	() => import("../../../src/routes/beheer/kaart/[id]/wijzigen.svelte"),
	() => import("../../../src/routes/beheer/kaart/[id]/paden.svelte"),
	() => import("../../../src/routes/kaart/[mapId]/locatie/[locationId].svelte"),
	() => import("../../../src/routes/kaart/[id].svelte"),
	() => import("../../../src/routes/todos/index.svelte"),
	() => import("../../../src/routes/post/[id]/index.svelte"),
	() => import("../../../src/routes/[id].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/curriculum-profiel/mijn-profiel.svelte
	[/^\/curriculum-profiel\/mijn-profiel\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/curriculum-profiel/wijzigen.svelte
	[/^\/curriculum-profiel\/wijzigen\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/curriculum-profiel/maken.svelte
	[/^\/curriculum-profiel\/maken\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/curriculum-profiel/[id]/index.svelte
	[/^\/curriculum-profiel\/([^/]+?)\/?$/, [c[0], c[6]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/index.svelte
	[/^\/leerdoel\/([^/]+?)\/?$/, [c[0], c[7]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/geschiedenis.svelte
	[/^\/leerdoel\/([^/]+?)\/geschiedenis\/?$/, [c[0], c[8]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/overleg.svelte
	[/^\/leerdoel\/([^/]+?)\/overleg\/?$/, [c[0], c[9]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/cypress/login-normal-user.svelte
	[/^\/cypress\/login-normal-user\/?$/, [c[0], c[10]], [c[1]]],

	// src/routes/cypress/reset-map.svelte
	[/^\/cypress\/reset-map\/?$/, [c[0], c[11]], [c[1]]],

	// src/routes/overleg/[talkId]/index.svelte
	[/^\/overleg\/([^/]+?)\/?$/, [c[0], c[12]], [c[1]], (m) => ({ talkId: d(m[1])})],

	// src/routes/overleg/[talkId]/[postId]/index.svelte
	[/^\/overleg\/([^/]+?)\/([^/]+?)\/?$/, [c[0], c[13]], [c[1]], (m) => ({ talkId: d(m[1]), postId: d(m[2])})],

	// src/routes/revisie/[id]/index.svelte
	[/^\/revisie\/([^/]+?)\/?$/, [c[0], c[14]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/revisie/[id]/wijzigen.svelte
	[/^\/revisie\/([^/]+?)\/wijzigen\/?$/, [c[0], c[15]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/revisie/[id]/diff/[oldId]/index.svelte
	[/^\/revisie\/([^/]+?)\/diff\/([^/]+?)\/?$/, [c[0], c[16]], [c[1]], (m) => ({ id: d(m[1]), oldId: d(m[2])})],

	// src/routes/beheer/index.svelte
	[/^\/beheer\/?$/, [c[0], c[17], c[18]], [c[1]]],

	// src/routes/beheer/activiteit/index.svelte
	[/^\/beheer\/activiteit\/?$/, [c[0], c[17], c[19]], [c[1]]],

	// src/routes/beheer/activiteit/maken.svelte
	[/^\/beheer\/activiteit\/maken\/?$/, [c[0], c[17], c[20]], [c[1]]],

	// src/routes/beheer/activiteit/[id]/index.svelte
	[/^\/beheer\/activiteit\/([^/]+?)\/?$/, [c[0], c[17], c[21]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/activiteit/[id]/dashboard.svelte
	[/^\/beheer\/activiteit\/([^/]+?)\/dashboard\/?$/, [c[0], c[17], c[22]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/activiteit/[id]/wijzigen.svelte
	[/^\/beheer\/activiteit\/([^/]+?)\/wijzigen\/?$/, [c[0], c[17], c[23]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/gebruiker/index.svelte
	[/^\/beheer\/gebruiker\/?$/, [c[0], c[17], c[24]], [c[1]]],

	// src/routes/beheer/leerdoel/index.svelte
	[/^\/beheer\/leerdoel\/?$/, [c[0], c[17], c[25]], [c[1]]],

	// src/routes/beheer/leerdoel/woorden-bloom.svelte
	[/^\/beheer\/leerdoel\/woorden-bloom\/?$/, [c[0], c[17], c[26]], [c[1]]],

	// src/routes/beheer/leerdoel/maken.svelte
	[/^\/beheer\/leerdoel\/maken\/?$/, [c[0], c[17], c[27]], [c[1]]],

	// src/routes/beheer/leerdoel/[id]/index.svelte
	[/^\/beheer\/leerdoel\/([^/]+?)\/?$/, [c[0], c[17], c[28]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/leerdoel/[id]/wijzigen.svelte
	[/^\/beheer\/leerdoel\/([^/]+?)\/wijzigen\/?$/, [c[0], c[17], c[29]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/test-ssr.svelte
	[/^\/beheer\/test-ssr\/?$/, [c[0], c[17], c[30]], [c[1]]],

	// src/routes/beheer/kaart/index.svelte
	[/^\/beheer\/kaart\/?$/, [c[0], c[17], c[31]], [c[1]]],

	// src/routes/beheer/kaart/maken.svelte
	[/^\/beheer\/kaart\/maken\/?$/, [c[0], c[17], c[32]], [c[1]]],

	// src/routes/beheer/kaart/[id]/wijzigen.svelte
	[/^\/beheer\/kaart\/([^/]+?)\/wijzigen\/?$/, [c[0], c[17], c[33]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/kaart/[id]/paden.svelte
	[/^\/beheer\/kaart\/([^/]+?)\/paden\/?$/, [c[0], c[17], c[34]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/kaart/[mapId]/locatie/[locationId].svelte
	[/^\/kaart\/([^/]+?)\/locatie\/([^/]+?)\/?$/, [c[0], c[35]], [c[1]], (m) => ({ mapId: d(m[1]), locationId: d(m[2])})],

	// src/routes/kaart/[id].svelte
	[/^\/kaart\/([^/]+?)\/?$/, [c[0], c[36]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/todos/index.json.js
	[/^\/todos\.json$/],

	// src/routes/todos/index.svelte
	[/^\/todos\/?$/, [c[0], c[37]], [c[1]]],

	// src/routes/todos/[uid].json.js
	[/^\/todos\/([^/]+?)\.json$/],

	// src/routes/post/[id]/index.svelte
	[/^\/post\/([^/]+?)\/?$/, [c[0], c[38]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/[id].svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[39]], [c[1]], (m) => ({ id: d(m[1])})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];