function getSession() {
	return {
		environment: process.env['environment'],
    defaultMapId: process.env['defaultMapId'],
		fb: process.env['fb'],
    fbApiKey: process.env['fbApiKey'],
    fbAuthDomain: process.env['fbAuthDomain'],
    fbProjectId: process.env['fbProjectId'],
    fbStorageBucket: process.env['fbStorageBucket'],
    fbMessagingSenderId: process.env['fbMessagingSenderId'],
    fbAppI: process.env['fbAppI'],
    fbMeasurementId: process.env['fbMeasurementId'],
    defaultLanguage: process.env["defaultLanguage"],
	};
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  let session = getSession();
  event.locals.session = session;
	if (event.url.searchParams.has('_method')) {
		event.method = event.url.searchParams.get('_method').toUpperCase();
	}
	const response = await resolve(event, {
    ssr: false,
  });
	return response;
};
