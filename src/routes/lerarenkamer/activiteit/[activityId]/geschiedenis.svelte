<script>
  import ShowRevisionHistory from "$lib/Internals/Revision/history.svelte";
  import GetRevisionListData from "$lib/Internals/Revision/getListData.svelte";
  import { getStores, page } from "$app/stores";
  import { t } from "svelte-intl-precompile";

  let firebase;
  let revisions;
</script>

<GetRevisionListData
  bind:firebase
  bind:revisions
  revisionType="activity"
  bind:sourceId={$page.params.activityId}
/>
{#if revisions}
  <ShowRevisionHistory bind:firebase bind:revisions />
{:else}
  {$t("loading")}
{/if}
