export function getSession(request) {
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
    fbMeasurementId: process.env['fbMeasurementId']
	};
}

export const handle = async ({ request, resolve }) => {
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}
	const response = await resolve(request);
	return response;
};
