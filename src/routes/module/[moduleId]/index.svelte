<script>
  import Show from "$lib/Module/Map/Components/show.svelte";
  import { getStores, page } from "$app/stores";
  // import { getMap, getUserMap } from "$lib/Module/Map/Components/helper";
  import GetModuleData from "$lib/Module/Data/getModuleData.svelte";
  import { t } from "svelte-intl-precompile";

  let firebase;
  let module;
  let userModule;

  let breadcrumbs = [
    {
      url: "/",
      value: $t("the-journey"),
    },
    {
      url: "/kaart/" + $page.params.id,
      value: $t("show-map"),
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
  {$t("loading")}
{/if}
