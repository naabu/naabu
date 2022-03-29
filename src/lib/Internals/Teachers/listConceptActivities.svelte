<script>
  import DataTableActivities from "$lib/Internals/Teachers/dataTableActivities.svelte";

  export let firebase;

  export let activities = [];
</script>

<DataTableActivities bind:activities bind:firebase let:activityId let:index />
