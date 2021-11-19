<script>
  import ShowRevisionHistory from "$lib/Revision/history.svelte";
  import GetRevisionListData from "$lib/Revision/getListData.svelte";
  import { getStores, page } from "$app/stores";

  let firebase;
  let revisions;
  $:console.log(revisions);
</script>

<GetRevisionListData bind:firebase bind:revisions revisionType="activity" bind:sourceId={$page.params.activityId}  />
{#if revisions}
  <ShowRevisionHistory bind:firebase bind:revisions />
{:else}
  Loading...
{/if}
