<script>
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  import AdventureList from "$lib/Goal/Adventure/ListsAdventure/inTrashAdventures.svelte";
  export let goal;
  export let firebase;
  export let mounted;
</script>

<GetGoalData bind:goal bind:firebase bind:mounted/>
{#if mounted}
  <AdventureList bind:goal bind:firebase />
{/if}