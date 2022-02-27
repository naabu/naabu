<script>
  import DataTableActivities from "$lib/Internals/Teachers/dataTableActivities.svelte";
  import { t } from "svelte-intl-precompile";
  export let activities = [];
</script>

<DataTableActivities bind:activities let:goalId let:connectionId>
  <a
    slot="cta"
    href="/leerdoel/{goalId}/activiteiten/{connectionId}"
    class=" underline text-indigo-600 hover:text-indigo-900 text-right text-sm font-medium"
  >
    {$t("connection-with-goal")}
  </a>
</DataTableActivities>
