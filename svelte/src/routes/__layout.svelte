<script>
	// , getFirestore, getAuth, googleProvider
	import {firebaseApp} from '$lib/firebase';
	import {getFirebaseAuth, getFirebaseFirestore} from '$lib/firebase';
	import {getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence} from "firebase/auth";
	import { doc, setDoc, getDoc } from "firebase/firestore"; 
	import { getStores, navigating, page, session } from '$app/stores';
	import { onMount } from 'svelte';
	import Header from '$lib/Header/index.svelte';
	import '../app.postcss';

	$:console.log($session);

	

	// functions.logger.log("Hello from info. Here's an object:", session);
	// const auth = getAuth(firebaseApp);


	let user = null;
	// console.log(auth.currentUser);
	onMount(async () => {
		const auth = getAuth(firebaseApp);
		onAuthStateChanged(auth, (newUser) => {
			console.log('onAuthStateChanged called' + newUser);
			if (newUser) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = newUser.uid;
				// ...
				console.log(uid);
				user = newUser;
				// $session.user = user;
			} else {
				user = null;
			}
		});
	});
	$:console.log(user);



	async function logout() {
		console.log('logout logic here');
		const auth = await getFirebaseAuth($session.environment);
		let result = await signOut(auth);
	}

	async function login() {
		console.log('login logic here');
	
		const auth = await getFirebaseAuth($session.environment);
		await setPersistence(auth, browserLocalPersistence);
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
	}

	async function createDocument(){
		const firestore = await getFirebaseFirestore($session.environment);
		// Add a new document in collection "cities"
		try {
			let thedoc = await doc(firestore, "goals", "test");
			console.log(thedoc);
			// let retrievDoc = await getDoc(thedoc);
			// console.log('here2');
			// console.log(retrievDoc);
			const docData = {
				name: "Los Angeles",
				state: "CA",
				country: "USA test"
			}
			try {
				await setDoc(thedoc, docData);
			} catch (e) {
				console.error("Error adding document: ", e);
			}
		}
		catch (e) {
			console.log('here3');
			console.error("Error finding document: ", e);
		}
	}
</script>

<Header />

<main>

	<section>
		{#if user}
			<button on:click={ logout }>Logout</button>
			<hr>
		{:else}
			<button on:click={login}>
				Signin with Google
			</button>
		{/if}
		<button on:click={createDocument}>
			Create document
		</button>
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
