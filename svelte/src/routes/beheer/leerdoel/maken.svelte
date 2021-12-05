<script>
  import CreateGoal from "$lib/Goal/create.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Firebase/store";
  import { getStores, session } from "$app/stores";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  let firebase;

  let breadcrumbs = [
    {
      url: "/beheer",
      value: "Beheer",
    },
    {
      url: "/beheer/leerdoel",
      value: "Leerdoel",
    },
    {
      url: "/beheer/leerdoel/maken",
      value: "Leerdoel maken",
    },
  ];

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
    }
  })();
</script>

{#if firebase}
  <ShowBreadcrumb bind:breadcrumbs />
  <CreateGoal bind:firebase />
{/if}
