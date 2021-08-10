<!-- 
<script context="module" >
  import { initFirebase } from "$lib/firebase";

  export async function load({session}) {
    let firebase = await initFirebase(session.environment);
    return {
      props: {
        firebase: firebase
      },
    };
  }
</script> -->

<script>
  import { getStores, session } from "$app/stores"
	import { onMount } from 'svelte';
	import Header from '$lib/Header/index.svelte';
	import '../app.postcss';
  export let firebase;
  import { initFirebase } from "$lib/firebase";
 // import firebase from "firebase/app";
 
  
	let user = null;
	onMount(async () => {
    let firebase = await initFirebase($session.environment);
    firebase.auth().onAuthStateChanged(async (newUser) => {
      if (newUser) {
				user = newUser;
        user.idTokenResult = await user.getIdTokenResult();
      } else {
				user = null;
			}
      $session.user = user;
    });
	});
</script>

<Header bind:firebase />

<main class="mx-auto mb-5py-6 px-4 sm:p-6 lg:pb-8 max-w-7xl">
	<section>
	</section>
	<slot />
</main>