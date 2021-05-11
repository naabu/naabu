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
	// import {firebaseApp} from '$lib/firebase';
	import {getFirebaseAuth, getFirebaseFirestore} from '$lib/firebase';
	import {signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";
	import { doc, setDoc, getDoc } from "firebase/firestore"; 

	import Header from '$lib/Header/index.svelte';
	import '../app.postcss';
	export let session;

	$:console.log(session);

	// functions.logger.log("Hello from info. Here's an object:", session);

	let user;

	async function logout() {
		console.log('logout logic here');
		const auth = await getFirebaseAuth(session.environment);
		// let result = await signOut(auth);

	}

	async function login() {
		console.log('login logic here');
		const auth = await getFirebaseAuth(session.environment);
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		console.log(result);
		user = result.user;
	}

	async function createDocument(){
		const firestore = await getFirebaseFirestore(session.environment);
		console.log(firestore);
		// Add a new document in collection "cities"
		try {
			let thedoc = await doc(firestore, "cities", "LA");
			console.log(thedoc);
			// let retrievDoc = await getDoc(thedoc);
			// console.log('here2');
			// console.log(retrievDoc);
			const docData = {
				name: "Los Angeles",
				state: "CA",
				country: "USA"
			}
			try {
				let editDoc = await setDoc(thedoc, docData);
				console.log("Document written with ID: ", editDoc.id);
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
