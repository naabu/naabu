<script>
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  import SearchGoalForConnection from "$lib/Goal/Connection/search.svelte";
  export let goal;
  export let firebase;
  export let mounted;
</script>

<GetGoalData bind:goal bind:firebase bind:mounted/>
{#if mounted}
  <SearchGoalForConnection bind:goal bind:firebase />
{/if}