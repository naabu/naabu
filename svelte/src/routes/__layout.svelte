<script>
	// , getFirestore, getAuth, googleProvider
	import { getFirebaseApp } from '$lib/firebase';
	import { getFirebaseAuth } from '$lib/firebase';
	import { onAuthStateChanged} from "firebase/auth";
  import { getStores, session } from "$app/stores"
	import { onMount } from 'svelte';
	import Header from '$lib/Header/index.svelte';
	import '../app.postcss';

	let user = null;
	onMount(async () => {
		const firebaseApp = await getFirebaseApp();
		const auth = await getFirebaseAuth($session.environment);
		await onAuthStateChanged(auth, async (newUser) => {
			if (newUser) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				user = newUser;
        user.idTokenResult = await user.getIdTokenResult();
        // Set token in a cookie so it will be send to the server next time on full refresh?
			} else {
				user = null;
			}
			$session.user = user;
		});
	});
</script>

<Header />

<main class="mx-auto mb-5py-6 px-4 sm:p-6 lg:pb-8 max-w-7xl">
	<section>
	</section>
	<slot />
</main>

<style>
	/* main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	} */

	/* footer {
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
	} */
</style>
