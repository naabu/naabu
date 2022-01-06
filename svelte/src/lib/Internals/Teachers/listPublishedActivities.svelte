<script>
  import DataTableActivities from "$lib/Internals/Teachers/dataTableActivities.svelte";

  export let activities = [];
</script>

<DataTableActivities bind:activities let:goalId let:connectionId>
  <a
    slot="cta"
    href="/leerdoel/{goalId}/activiteiten/{connectionId}"
    class=" underline text-indigo-600 hover:text-indigo-900 text-right text-sm font-medium"
  >
    Koppeling met leerdoel
  </a>
</DataTableActivities>
