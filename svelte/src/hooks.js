import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';

// TODO rewrite to support firebase auth cookies.
// https://firebase.google.com/docs/auth/admin/manage-cookies


export function getSession(request) {
	return {
		environment: process.env['ENVIRONMENT'],
    jwt: 'ThisIsNotAJWTToken',
		user: null,
	};
}

export const handle = async ({ request, resolve }) => {
  console.log(request);
	const cookies = cookie.parse(request.headers.cookie || '');

  let jwt = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoibmllbHN2YW5kZXJtb2xlbkBnbWFpbC5jb20iLCJwaWN0dXJlIjoiIiwiY2FuTW9kZXJhdGUiOnRydWUsImVtYWlsIjoibmllbHN2YW5kZXJtb2xlbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXV0aF90aW1lIjoxNjIyNDU4NDkzLCJ1c2VyX2lkIjoiY1piR3hUcnNsT2NNWkRwYm9SVU1CdWJQQlczbiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibmllbHN2YW5kZXJtb2xlbkBnbWFpbC5jb20iXSwiZ29vZ2xlLmNvbSI6WyI5NTgzMjIyMzk1NjYyMzk1NTU4MDUxNzI4MzY3ODUyMTc2NTIyMzg3Il19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9LCJpYXQiOjE2MjI0NTg0OTMsImV4cCI6MTYyMjQ2MjA5MywiYXVkIjoiZXhwd2lzIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V4cHdpcyIsInN1YiI6ImNaYkd4VHJzbE9jTVpEcGJvUlVNQnViUEJXM24ifQ."

  // Fix SSR with Firebase authentication.
  // 	request.locals.firebaseAuthInformation = cookies.firebaseAuthInformation
  // firebaseAuthInformation = JWT token.

	request.locals.jwt = jwt
  // signInWithCustomToken

		// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

  // Here Svelte magic happens!
	const response = await resolve(request);

	// if (!cookies.userid || !cookies.user) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `jwt=${request.locals.jwt}; Path=/; HttpOnly`;
    // response.headers['set-cookie'] = 'firebaseAuthInformation=${request.locals.firebaseAuthInformation}; Path=/; HttpOnly`

	// }
	
	return response;
};
