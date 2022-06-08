<script>
  import UpdateContentMultiLine from "$lib/Update/Components/UpdateContentMultiLine.svelte";
  import UpdatedIcon from "$lib/Update/Icons/UpdatedIcon.svelte";
  import { t } from "svelte-intl-precompile";
  import ShowUpdateDifferences from "$lib/Update/Components/ShowUpdateDifferences.svelte";

  export let update;
  export let i;
  export let feedLength;
  export let showConnectionInfo;
</script>

<UpdateContentMultiLine bind:i bind:feedLength bind:update bind:showConnectionInfo>
  <svelte:fragment slot="icon">
    <UpdatedIcon />
  </svelte:fragment>
  <svelte:fragment slot="aftername">
    - {$t("teacher")}
  </svelte:fragment>
  {$t("activity-updated")}
  <ShowUpdateDifferences bind:update />
</UpdateContentMultiLine>
