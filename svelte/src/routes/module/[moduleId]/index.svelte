<script>
  import Show from "$lib/Map/show.svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  // import { getMap, getUserMap } from "$lib/Map/helper";
  import GetModuleData from "$lib/Module/getModuleData.svelte";

  let firebase;
  let module;
  let userModule;

  // let userMap = null;
  // let mapId = $page.params.id;

  // $: async () => {
  //   if ($session.player) {
  //     userMap = await getUserMap(firebase, mapId, map, $session.player);
  //   }
  // };

  $: if (firebase) {
    // console.log("firebase found");
    // let anonymousUser = firebase.auth().currentUser;
    // if (anonymousUser === null) {
    //   console.log("attempt to log in anonymously");
    //   firebase
    //     .auth()
    //     .signInAnonymously()
    //     .then(() => {
    //       console.log("Yeah signed in anonymously");
    //     })
    //     .catch((error) => {
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       // ...
    //     });
    // }
  }

  let breadcrumbs = [
    {
      url: "/",
      value: "Reis",
    },
    {
      url: "/kaart/" + $page.params.id,
      value: "Kaart bekijken",
    },
  ];

  // $: if ($session.player && firebase) {
  //   asynGetUserMap();
  // }

  // const asynGetUserMap = async () => {
  //   userMap = await getUserMap(firebase, mapId, map, $session.player);
  // };

  // $: (async () => {
  //   if ($firebaseStore) {
  //     firebase = $firebaseStore;
  //     await asynGetUserMap();
  //     mounted = true;
  //   }
  // })();

  // async function retrieveFirestoreData() {
  //   let mapId = $page.params.id;
  //   map = await getMap(firebase, mapId);
  // }

  $: if (module) {
    module.title = module.moduleName;
  }

  $: if (userModule) {
    userModule.newUnlockedLocation = false;
    let db = firebase.firestore();
    let userModuleRef = db
      .collection("modules/" + $page.params.moduleId + "/players")
      .doc(userModule.id);
    userModuleRef.update({newUnlockedLocation: false});
  }
</script>

<GetModuleData bind:firebase bind:module bind:userModule />
{#if module && module.mapId}
  <Show bind:map={module} bind:userMap={userModule} isModule=true />
{:else}
  Loading...
{/if}
