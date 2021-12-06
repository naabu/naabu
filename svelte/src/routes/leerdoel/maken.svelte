<script>
  import CreateGoal from "$lib/Goal/create.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Firebase/store";
  import { getStores, session } from "$app/stores";

  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";
  let breadcrumbs = [
    {
      url: "/curriculum",
      value: "Curriculum",
    },
    {
      url: "/leerdoel/maken",
      value: "Leerdoel maken",
    },
  ];
  let firebase;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
    }
  })();
</script>

{#if firebase}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title="Leerdoel maken" />
  <CreateGoal bind:firebase />
{/if}
