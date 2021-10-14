<script>
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  import OverviewConnection from "$lib/Goal/Connection/overview.svelte";
  export let goal;
  export let firebase;
  export let mounted;
</script>

<GetGoalData bind:goal bind:firebase bind:mounted/>
{#if mounted && goal}
  <OverviewConnection bind:goal bind:firebase />
{/if}