<script>
  import CreateGoal from "$lib/Goal/create.svelte";
  import { onMount } from "svelte";
  import { initFirebase } from "$lib/firebase";
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

  onMount(async () => {
    firebase = await initFirebase($session.environment);
  });
</script>

{#if firebase}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title="Leerdoel maken" />
  <CreateGoal bind:firebase />
{/if}
