<script>
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  import PrerequisitConnections from "$lib/Goal/Connection/List/prerequisiteNeedsApproval.svelte";
  export let goal;
  export let firebase;
  export let mounted;
</script>

<GetGoalData bind:goal bind:firebase bind:mounted/>
{#if mounted}
  <PrerequisitConnections bind:goal bind:firebase />
{/if}