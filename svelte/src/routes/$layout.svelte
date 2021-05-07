<script context="module">
	// see https://kit.svelte.dev/docs#loading
	export function load({ page, fetch, session, context }) {
		return {
			props: {
				session: session
			}
		}
	};

</script>

<script>
	// , getFirestore, getAuth, googleProvider
	import {firebaseApp} from '$lib/firebase';
	import {getFirebaseAuth} from '$lib/firebase';
	import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
	// console.log(firebaseApp);
	
	import Header from '$lib/Header/index.svelte';
	import '../app.postcss';
	export let session;

	$:console.log(session);
	
	let user;

	function logout() {
		console.log('login logic here');

	}

	async function login() {
		console.log('login logic here');
		const auth = getFirebaseAuth(session.environment);
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		console.log(result);
		
		// signInWithPopup(auth, GoogleAuthProvider);
		// console.log(getFirebaseAuth());
		// getAuth(session.environment).signInWithPopup(googleProvider);
	}
</script>

<Header />

<main>

	<section>
		{#if user}
			<Profile {...user} />
			<button on:click={ logout }>Logout</button>
			<hr>
			<Todos uid={user.uid} />
		{:else}
			<button on:click={login}>
				Signin with Google
			</button>
		{/if}
	</section>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
