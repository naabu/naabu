import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';

// TODO rewrite to support firebase auth cookies.
// https://firebase.google.com/docs/auth/admin/manage-cookies


export function getSession(request) {
	return {
		environment: process.env['ENVIRONMENT'],
	};
}

export const handle = async ({ request, render }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || uuid();

		// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}
	const response = await render(request);

	if (!cookies.userid || !cookies.user) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
	}
	
	return response;
};
