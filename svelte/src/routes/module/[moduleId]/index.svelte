<script>
  import Show from "$lib/Map/show.svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  // import { getMap, getUserMap } from "$lib/Map/helper";
  import GetModuleData from "$lib/Module/getModuleData.svelte";

  let firebase;
  let module;
  let userModule;

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

  $: if (module && module.title !== module.moduleName) {
    module.title = module.moduleName;
  }

  let done = false;
  $: if (userModule && !done) {
    done = true;
    userModule.newUnlockedLocation = false;
    let db = firebase.firestore();
    let userModuleRef = db
      .collection("modules/" + $page.params.moduleId + "/players")
      .doc(userModule.id);
    userModuleRef.update({ newUnlockedLocation: false });
  }
</script>

<GetModuleData bind:firebase bind:module bind:userModule />
{#if module && module.mapId}
  <Show bind:map={module} bind:userMap={userModule} isModule="true" />
{:else}
  Loading...
{/if}
