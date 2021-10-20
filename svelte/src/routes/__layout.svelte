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
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import Header from "$lib/Header/index.svelte";
  import "../app.postcss";
  import { initFirebase } from "$lib/firebase";

  let user = null;
  let player = null;
  let firebase;

  async function getPlayer(user) {
    let db = await firebase.firestore();
    let ref = db.collection("players").doc(user.uid);
    let snap = await ref.get();
    if (snap.exists) {
      player = snap.data();
    } else {
      const data = {
        currentMapId: $session.defaultMapId,
      };
      try {
        let collectionRef = db.collection("players");
        let result = await collectionRef.doc(user.uid).set(data);
        player = data;
      } catch (e) {
        console.log(e);
      }
    }
    if (player !== null) {
      player.id = user.uid;
    }
    return player;
  }

  $:console.log($session);

  onMount(async () => {
    firebase = await initFirebase($session.environment);

    firebase.auth().onAuthStateChanged(async (newUser) => {
      if (newUser) {
        user = newUser;
        user.idTokenResult = await user.getIdTokenResult();
        player = await getPlayer(user);
      } else {
        user = null;
        player = null;
      }
      $session.user = user;
      $session.player = player;
      if (player && player.currentMapId) {
        $session.defaultMapId = player.currentMapId;
      }
    });
  });
</script>

<Header bind:firebase />

<main class="mx-auto mb-5py-6 px-4 sm:p-6 lg:pb-8 max-w-7xl">
  <section />
  <slot />
</main>
