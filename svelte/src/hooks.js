export function getSession(request) {
	return {
		environment: process.env['environment'],
    defaultMapId: process.env['defaultMapId'],
		fb: process.env['fb']
	};
}

export const handle = async ({ request, resolve }) => {
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}
	const response = await resolve(request);
	return response;
};
