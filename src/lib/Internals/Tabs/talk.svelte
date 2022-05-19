<script>
  import GoalTabs from "$lib/Internals/Tabs/GoalTabs.svelte";
  export let mainSelected = "goal";
  export let subSelected = "read";
  export let objectId;
</script>

<GoalTabs bind:goalId={objectId} bind:mainSelected bind:subSelected />
