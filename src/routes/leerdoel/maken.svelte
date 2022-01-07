<script>
  import CreateGoal from "$lib/Goal/Components/create.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getStores, session } from "$app/stores";

  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
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
