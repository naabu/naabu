<script>
  import UpdateContentMultiLine from "$lib/Update/Components/UpdateContentMultiLine.svelte";
  import CreatedIcon from "$lib/Update/Icons/CreatedIcon.svelte";
  import { t } from "svelte-intl-precompile";
  import ShowUpdateDifferences from "$lib/Update/Components/ShowUpdateDifferences.svelte";

  export let update;
  export let i;
  export let feedLength;
</script>

<UpdateContentMultiLine bind:i bind:feedLength bind:update>
  <svelte:fragment slot="icon">
    <CreatedIcon />
  </svelte:fragment>
  <svelte:fragment slot="aftername">
    - {$t("teacher")}
  </svelte:fragment>
  {$t("activity-connected-to-activity")}
  <ShowUpdateDifferences bind:update />
</UpdateContentMultiLine>
