import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';

// TODO rewrite to support firebase auth cookies.
// https://firebase.google.com/docs/auth/admin/manage-cookies


export function getSession(request) {
	return {
		environment: process.env['ENVIRONMENT'],
		user: null,
	};
}

export const handle = async ({ request, render }) => {
	const cookies = cookie.parse(request.headers.cookie || '');

  // Fix SSR with Firebase authentication.
  // 	request.locals.firebaseAuthInformation = cookies.firebaseAuthInformation
  // firebaseAuthInformation = JWT token.

	request.locals.userid = cookies.userid || uuid();

		// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

  // Here Svelte magic happens!
	const response = await render(request);

	if (!cookies.userid || !cookies.user) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
    // response.headers['set-cookie'] = 'firebaseAuthInformation=${request.locals.firebaseAuthInformation}; Path=/; HttpOnly`

	}
	
	return response;
};
