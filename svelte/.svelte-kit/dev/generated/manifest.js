const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/curriculum-profiel/mijn-profiel.svelte"),
	() => import("../../../src/routes/curriculum-profiel/wijzigen.svelte"),
	() => import("../../../src/routes/curriculum-profiel/maken.svelte"),
	() => import("../../../src/routes/curriculum-profiel/[id]/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/verbinding-maken/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/verbinding-maken/[connectionGoalId]/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/avontuur-maken/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/avontuur-maken/[activityId]/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/avontuur-maken/[activityId]/form.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/dieper-inzicht/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/dieper-inzicht/goedkeuring.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/dieper-inzicht/prullenbak.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/dieper-inzicht/uitvoering.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/dieper-inzicht/werk-nodig.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/dieper-inzicht/[deeperunderstandingId]/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/specialisatie/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/specialisatie/goedkeuring.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/specialisatie/prullenbak.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/specialisatie/uitvoering.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/specialisatie/werk-nodig.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/specialisatie/[speciazationId]/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/geschiedenis.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/verbindingen/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/groot-idee/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/groot-idee/goedkeuring.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/groot-idee/prullenbak.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/groot-idee/uitvoering.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/groot-idee/werk-nodig.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/groot-idee/[bigideaId]/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/voorkennis/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/voorkennis/goedkeuring.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/voorkennis/prullenbak.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/voorkennis/uitvoering.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/voorkennis/werk-nodig.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/voorkennis/[prerequisiteId]/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/avonturen/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/avonturen/goedkeuring.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/avonturen/prullenbak.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/avonturen/uitvoering.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/avonturen/werk-nodig.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/avontuur/[adventureId]/bekijken/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/avontuur/[adventureId]/work/index.svelte"),
	() => import("../../../src/routes/leerdoel/[id]/overleg.svelte"),
	() => import("../../../src/routes/cypress/reset-curriculum-profile.svelte"),
	() => import("../../../src/routes/cypress/login-normal-user.svelte"),
	() => import("../../../src/routes/cypress/reset-map.svelte"),
	() => import("../../../src/routes/overleg/revisie/[goalId]/[revisionId]/aanmaken.svelte"),
	() => import("../../../src/routes/overleg/[goalId]/[talkId]/index.svelte"),
	() => import("../../../src/routes/overleg/[goalId]/[talkId]/[postId]/index.svelte"),
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
	() => import("../../../src/routes/test.svelte"),
	() => import("../../../src/routes/[goalId]/[adventureId]/index.svelte"),
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

	// src/routes/leerdoel/[id]/verbinding-maken/index.svelte
	[/^\/leerdoel\/([^/]+?)\/verbinding-maken\/?$/, [c[0], c[8]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/verbinding-maken/[connectionGoalId]/index.svelte
	[/^\/leerdoel\/([^/]+?)\/verbinding-maken\/([^/]+?)\/?$/, [c[0], c[9]], [c[1]], (m) => ({ id: d(m[1]), connectionGoalId: d(m[2])})],

	// src/routes/leerdoel/[id]/avontuur-maken/index.svelte
	[/^\/leerdoel\/([^/]+?)\/avontuur-maken\/?$/, [c[0], c[10]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/avontuur-maken/[activityId]/index.svelte
	[/^\/leerdoel\/([^/]+?)\/avontuur-maken\/([^/]+?)\/?$/, [c[0], c[11]], [c[1]], (m) => ({ id: d(m[1]), activityId: d(m[2])})],

	// src/routes/leerdoel/[id]/avontuur-maken/[activityId]/form.svelte
	[/^\/leerdoel\/([^/]+?)\/avontuur-maken\/([^/]+?)\/form\/?$/, [c[0], c[12]], [c[1]], (m) => ({ id: d(m[1]), activityId: d(m[2])})],

	// src/routes/leerdoel/[id]/dieper-inzicht/index.svelte
	[/^\/leerdoel\/([^/]+?)\/dieper-inzicht\/?$/, [c[0], c[13]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/dieper-inzicht/goedkeuring.svelte
	[/^\/leerdoel\/([^/]+?)\/dieper-inzicht\/goedkeuring\/?$/, [c[0], c[14]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/dieper-inzicht/prullenbak.svelte
	[/^\/leerdoel\/([^/]+?)\/dieper-inzicht\/prullenbak\/?$/, [c[0], c[15]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/dieper-inzicht/uitvoering.svelte
	[/^\/leerdoel\/([^/]+?)\/dieper-inzicht\/uitvoering\/?$/, [c[0], c[16]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/dieper-inzicht/werk-nodig.svelte
	[/^\/leerdoel\/([^/]+?)\/dieper-inzicht\/werk-nodig\/?$/, [c[0], c[17]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/dieper-inzicht/[deeperunderstandingId]/index.svelte
	[/^\/leerdoel\/([^/]+?)\/dieper-inzicht\/([^/]+?)\/?$/, [c[0], c[18]], [c[1]], (m) => ({ id: d(m[1]), deeperunderstandingId: d(m[2])})],

	// src/routes/leerdoel/[id]/specialisatie/index.svelte
	[/^\/leerdoel\/([^/]+?)\/specialisatie\/?$/, [c[0], c[19]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/specialisatie/goedkeuring.svelte
	[/^\/leerdoel\/([^/]+?)\/specialisatie\/goedkeuring\/?$/, [c[0], c[20]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/specialisatie/prullenbak.svelte
	[/^\/leerdoel\/([^/]+?)\/specialisatie\/prullenbak\/?$/, [c[0], c[21]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/specialisatie/uitvoering.svelte
	[/^\/leerdoel\/([^/]+?)\/specialisatie\/uitvoering\/?$/, [c[0], c[22]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/specialisatie/werk-nodig.svelte
	[/^\/leerdoel\/([^/]+?)\/specialisatie\/werk-nodig\/?$/, [c[0], c[23]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/specialisatie/[speciazationId]/index.svelte
	[/^\/leerdoel\/([^/]+?)\/specialisatie\/([^/]+?)\/?$/, [c[0], c[24]], [c[1]], (m) => ({ id: d(m[1]), speciazationId: d(m[2])})],

	// src/routes/leerdoel/[id]/geschiedenis.svelte
	[/^\/leerdoel\/([^/]+?)\/geschiedenis\/?$/, [c[0], c[25]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/verbindingen/index.svelte
	[/^\/leerdoel\/([^/]+?)\/verbindingen\/?$/, [c[0], c[26]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/groot-idee/index.svelte
	[/^\/leerdoel\/([^/]+?)\/groot-idee\/?$/, [c[0], c[27]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/groot-idee/goedkeuring.svelte
	[/^\/leerdoel\/([^/]+?)\/groot-idee\/goedkeuring\/?$/, [c[0], c[28]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/groot-idee/prullenbak.svelte
	[/^\/leerdoel\/([^/]+?)\/groot-idee\/prullenbak\/?$/, [c[0], c[29]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/groot-idee/uitvoering.svelte
	[/^\/leerdoel\/([^/]+?)\/groot-idee\/uitvoering\/?$/, [c[0], c[30]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/groot-idee/werk-nodig.svelte
	[/^\/leerdoel\/([^/]+?)\/groot-idee\/werk-nodig\/?$/, [c[0], c[31]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/groot-idee/[bigideaId]/index.svelte
	[/^\/leerdoel\/([^/]+?)\/groot-idee\/([^/]+?)\/?$/, [c[0], c[32]], [c[1]], (m) => ({ id: d(m[1]), bigideaId: d(m[2])})],

	// src/routes/leerdoel/[id]/voorkennis/index.svelte
	[/^\/leerdoel\/([^/]+?)\/voorkennis\/?$/, [c[0], c[33]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/voorkennis/goedkeuring.svelte
	[/^\/leerdoel\/([^/]+?)\/voorkennis\/goedkeuring\/?$/, [c[0], c[34]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/voorkennis/prullenbak.svelte
	[/^\/leerdoel\/([^/]+?)\/voorkennis\/prullenbak\/?$/, [c[0], c[35]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/voorkennis/uitvoering.svelte
	[/^\/leerdoel\/([^/]+?)\/voorkennis\/uitvoering\/?$/, [c[0], c[36]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/voorkennis/werk-nodig.svelte
	[/^\/leerdoel\/([^/]+?)\/voorkennis\/werk-nodig\/?$/, [c[0], c[37]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/voorkennis/[prerequisiteId]/index.svelte
	[/^\/leerdoel\/([^/]+?)\/voorkennis\/([^/]+?)\/?$/, [c[0], c[38]], [c[1]], (m) => ({ id: d(m[1]), prerequisiteId: d(m[2])})],

	// src/routes/leerdoel/[id]/avonturen/index.svelte
	[/^\/leerdoel\/([^/]+?)\/avonturen\/?$/, [c[0], c[39]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/avonturen/goedkeuring.svelte
	[/^\/leerdoel\/([^/]+?)\/avonturen\/goedkeuring\/?$/, [c[0], c[40]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/avonturen/prullenbak.svelte
	[/^\/leerdoel\/([^/]+?)\/avonturen\/prullenbak\/?$/, [c[0], c[41]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/avonturen/uitvoering.svelte
	[/^\/leerdoel\/([^/]+?)\/avonturen\/uitvoering\/?$/, [c[0], c[42]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/avonturen/werk-nodig.svelte
	[/^\/leerdoel\/([^/]+?)\/avonturen\/werk-nodig\/?$/, [c[0], c[43]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/leerdoel/[id]/avontuur/[adventureId]/bekijken/index.svelte
	[/^\/leerdoel\/([^/]+?)\/avontuur\/([^/]+?)\/bekijken\/?$/, [c[0], c[44]], [c[1]], (m) => ({ id: d(m[1]), adventureId: d(m[2])})],

	// src/routes/leerdoel/[id]/avontuur/[adventureId]/work/index.svelte
	[/^\/leerdoel\/([^/]+?)\/avontuur\/([^/]+?)\/work\/?$/, [c[0], c[45]], [c[1]], (m) => ({ id: d(m[1]), adventureId: d(m[2])})],

	// src/routes/leerdoel/[id]/overleg.svelte
	[/^\/leerdoel\/([^/]+?)\/overleg\/?$/, [c[0], c[46]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/cypress/reset-curriculum-profile.svelte
	[/^\/cypress\/reset-curriculum-profile\/?$/, [c[0], c[47]], [c[1]]],

	// src/routes/cypress/login-normal-user.svelte
	[/^\/cypress\/login-normal-user\/?$/, [c[0], c[48]], [c[1]]],

	// src/routes/cypress/reset-map.svelte
	[/^\/cypress\/reset-map\/?$/, [c[0], c[49]], [c[1]]],

	// src/routes/overleg/revisie/[goalId]/[revisionId]/aanmaken.svelte
	[/^\/overleg\/revisie\/([^/]+?)\/([^/]+?)\/aanmaken\/?$/, [c[0], c[50]], [c[1]], (m) => ({ goalId: d(m[1]), revisionId: d(m[2])})],

	// src/routes/overleg/[goalId]/[talkId]/index.svelte
	[/^\/overleg\/([^/]+?)\/([^/]+?)\/?$/, [c[0], c[51]], [c[1]], (m) => ({ goalId: d(m[1]), talkId: d(m[2])})],

	// src/routes/overleg/[goalId]/[talkId]/[postId]/index.svelte
	[/^\/overleg\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/, [c[0], c[52]], [c[1]], (m) => ({ goalId: d(m[1]), talkId: d(m[2]), postId: d(m[3])})],

	// src/routes/revisie/[id]/index.svelte
	[/^\/revisie\/([^/]+?)\/?$/, [c[0], c[53]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/revisie/[id]/wijzigen.svelte
	[/^\/revisie\/([^/]+?)\/wijzigen\/?$/, [c[0], c[54]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/revisie/[id]/diff/[oldId]/index.svelte
	[/^\/revisie\/([^/]+?)\/diff\/([^/]+?)\/?$/, [c[0], c[55]], [c[1]], (m) => ({ id: d(m[1]), oldId: d(m[2])})],

	// src/routes/beheer/index.svelte
	[/^\/beheer\/?$/, [c[0], c[56], c[57]], [c[1]]],

	// src/routes/beheer/activiteit/index.svelte
	[/^\/beheer\/activiteit\/?$/, [c[0], c[56], c[58]], [c[1]]],

	// src/routes/beheer/activiteit/maken.svelte
	[/^\/beheer\/activiteit\/maken\/?$/, [c[0], c[56], c[59]], [c[1]]],

	// src/routes/beheer/activiteit/[id]/index.svelte
	[/^\/beheer\/activiteit\/([^/]+?)\/?$/, [c[0], c[56], c[60]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/activiteit/[id]/dashboard.svelte
	[/^\/beheer\/activiteit\/([^/]+?)\/dashboard\/?$/, [c[0], c[56], c[61]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/activiteit/[id]/wijzigen.svelte
	[/^\/beheer\/activiteit\/([^/]+?)\/wijzigen\/?$/, [c[0], c[56], c[62]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/gebruiker/index.svelte
	[/^\/beheer\/gebruiker\/?$/, [c[0], c[56], c[63]], [c[1]]],

	// src/routes/beheer/leerdoel/index.svelte
	[/^\/beheer\/leerdoel\/?$/, [c[0], c[56], c[64]], [c[1]]],

	// src/routes/beheer/leerdoel/woorden-bloom.svelte
	[/^\/beheer\/leerdoel\/woorden-bloom\/?$/, [c[0], c[56], c[65]], [c[1]]],

	// src/routes/beheer/leerdoel/maken.svelte
	[/^\/beheer\/leerdoel\/maken\/?$/, [c[0], c[56], c[66]], [c[1]]],

	// src/routes/beheer/leerdoel/[id]/index.svelte
	[/^\/beheer\/leerdoel\/([^/]+?)\/?$/, [c[0], c[56], c[67]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/leerdoel/[id]/wijzigen.svelte
	[/^\/beheer\/leerdoel\/([^/]+?)\/wijzigen\/?$/, [c[0], c[56], c[68]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/test-ssr.svelte
	[/^\/beheer\/test-ssr\/?$/, [c[0], c[56], c[69]], [c[1]]],

	// src/routes/beheer/kaart/index.svelte
	[/^\/beheer\/kaart\/?$/, [c[0], c[56], c[70]], [c[1]]],

	// src/routes/beheer/kaart/maken.svelte
	[/^\/beheer\/kaart\/maken\/?$/, [c[0], c[56], c[71]], [c[1]]],

	// src/routes/beheer/kaart/[id]/wijzigen.svelte
	[/^\/beheer\/kaart\/([^/]+?)\/wijzigen\/?$/, [c[0], c[56], c[72]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/beheer/kaart/[id]/paden.svelte
	[/^\/beheer\/kaart\/([^/]+?)\/paden\/?$/, [c[0], c[56], c[73]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/kaart/[mapId]/locatie/[locationId].svelte
	[/^\/kaart\/([^/]+?)\/locatie\/([^/]+?)\/?$/, [c[0], c[74]], [c[1]], (m) => ({ mapId: d(m[1]), locationId: d(m[2])})],

	// src/routes/kaart/[id].svelte
	[/^\/kaart\/([^/]+?)\/?$/, [c[0], c[75]], [c[1]], (m) => ({ id: d(m[1])})],

	// src/routes/todos/index.json.js
	[/^\/todos\.json$/],

	// src/routes/todos/index.svelte
	[/^\/todos\/?$/, [c[0], c[76]], [c[1]]],

	// src/routes/todos/[uid].json.js
	[/^\/todos\/([^/]+?)\.json$/],

	// src/routes/test.svelte
	[/^\/test\/?$/, [c[0], c[77]], [c[1]]],

	// src/routes/[goalId]/[adventureId]/index.svelte
	[/^\/([^/]+?)\/([^/]+?)\/?$/, [c[0], c[78]], [c[1]], (m) => ({ goalId: d(m[1]), adventureId: d(m[2])})],

	// src/routes/[id].svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[79]], [c[1]], (m) => ({ id: d(m[1])})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];