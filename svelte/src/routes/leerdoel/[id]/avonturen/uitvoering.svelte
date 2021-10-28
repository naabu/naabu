<script>
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  import AdventureList from "$lib/Goal/Adventure/ListsAdventure/inProgressAdventures.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";
  import { getStores, page } from "$app/stores";
  export let goal;
  export let firebase;
  export let mounted;
  let breadcrumbs;
  $: if (goal) {
    breadcrumbs = [
      {
        url: "/curriculum",
        value: "Curriculum",
      },
      {
        url: "/leerdoel/" + goal.id,
        value: "Leerdoel: " + goal.title,
      },
      {
        url: "/leerdoel/" + goal.id + '/avonturen',
        value: "Adventuren",
      },     {
        url: $page.path,
        value: "In uitvoering",
      },
    ];
  }
</script>

<GetGoalData bind:goal bind:firebase bind:mounted/>
{#if mounted}  
<ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
 
  <AdventureList bind:goal bind:firebase />
{/if}