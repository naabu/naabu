<script>
  import DataTableActivities from "$lib/Internals/Teachers/dataTableActivities.svelte";

 

  export let activities = [];
</script>

<DataTableActivities bind:activities  let:activityId let:index />
