<script>
  import DataTableActivities from "$lib/Internals/Teachers/dataTableActivities.svelte";
  import { t } from "svelte-intl-precompile";
  export let activities = [];
 
</script>

<DataTableActivities  bind:activities let:goalId>
  <svelte:fragment slot="cta" let:activityId>
    <a
      href="/leerdoel/{goalId}/activiteiten/{activityId}"
      class=" underline text-indigo-600 hover:text-indigo-900 text-right text-sm font-medium"
    >
      {$t("connection-with-goal")}
    </a>
  </svelte:fragment>
</DataTableActivities>
