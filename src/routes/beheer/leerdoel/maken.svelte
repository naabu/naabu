<script>
  import CreateGoal from "$lib/Goal/Components/create.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getStores, session } from "$app/stores";
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  let firebase;

  let breadcrumbs = [
    {
      url: "/beheer",
      value: $t("management"),
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
