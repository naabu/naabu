<script>
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  import Connections from "$lib/Goal/Connection/List/bigideasInProgress.svelte";
  export let goal;
  export let firebase;
  export let mounted;
</script>

<GetGoalData bind:goal bind:firebase bind:mounted/>
{#if mounted}
  <Connections bind:goal bind:firebase />
{/if}