<script>
  import GoalTabs from "$lib/Internals/Tabs/GoalTabs.svelte";
  export let mainSelected = "goal";
  export let subSelected = "read";
  export let goal;
</script>

<GoalTabs bind:goalId={goal.id} bind:mainSelected bind:subSelected />
