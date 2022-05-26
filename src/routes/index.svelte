<script>
  import ModuleTeaserList from "$lib/Module/Components/teaserList.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";
  
  ;
  let mounted = false;
  let modules = null;

  export let radioDefaultValue = "map";

  $: (async () => {
    if ($firebase) {
      firebase = $firebase;
      await retrieveAllModules();
      mounted = true;
    }
  })();

  async function retrieveAllModules() {
    let db = firebase.firestore();
    let collectionRef = db.collection("modules");
    let querySnapshot = await collectionRef.get();
    modules = [];
    querySnapshot.docs.map((doc) => {
      let module = doc.data();
      module.id = doc.id;
      modules = [...modules, module];
    });
  }
</script>

<svelte:head>
  <title>{$t("site-title")}</title>
</svelte:head>

{#if mounted}
  <ModuleTeaserList bind:modules />
{:else}
  {$t("loading")}
{/if}
