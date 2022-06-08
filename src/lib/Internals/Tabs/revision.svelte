<script>
  import GoalTabs from "$lib/Internals/Tabs/GoalTabs.svelte";
  export let mainSelected = "goal";
  export let subSelected = "read";
  export let revision;

</script>
  
<GoalTabs bind:goalId={revision.goalId} bind:mainSelected bind:subSelected/>
