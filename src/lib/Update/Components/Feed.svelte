<script>
  import ActivityRemoved from "$lib/Update/Updates/ActivityRemoved.svelte";
  import ActivityUpdatedTeacher from "$lib/Update/Updates/ActivityUpdatedTeacher.svelte";
  import Comment from "$lib/Update/Updates/Comment.svelte";
  import CommentTeacher from "$lib/Update/Updates/CommentTeacher.svelte";
  import CreatedTeacher from "$lib/Update/Updates/CreatedTeacher.svelte";
  import StatusChangeByUser from "$lib/Update/Updates/StatusChangeByUser.svelte";
  export let updates;
  let feedLength = 0;
  export let showConnectionInfo = null;
  $:console.log(showConnectionInfo);
  $: feedLength = updates.length;
</script>

{#if updates}
  <div class="max-w-lg mx-auto px-6 mt-16">
    <div class="flow-root">
      <ul class="-mb-8">
        {#each updates as update, i}
          {#if update.type === "comment"}
            <Comment bind:update {i} {feedLength} bind:showConnectionInfo />
          {:else if update.type === "comment-teacher"}
            <CommentTeacher bind:update {i} {feedLength} bind:showConnectionInfo />
          {:else if update.type === "status-change-by-user"}
            <StatusChangeByUser bind:update {i} {feedLength} bind:showConnectionInfo/>
          {:else if update.type === "created-teacher"}
            <CreatedTeacher bind:update {i} {feedLength} bind:showConnectionInfo />
          {:else if update.type === "activity-updated-teacher"}
            <ActivityUpdatedTeacher bind:update {i} {feedLength} bind:showConnectionInfo/>
          {:else if update.type === "activity-removed"}
            <ActivityRemoved bind:update {i} {feedLength} bind:showConnectionInfo/>
          {/if}
        {/each}
      </ul>
    </div>
  </div>
{/if}
