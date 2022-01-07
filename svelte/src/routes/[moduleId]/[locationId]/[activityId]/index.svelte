<script>
  import ShowActivity from "$lib/Activity/Components/show.svelte";
  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";

  export let activity;

  let firebase;
</script>

<GetActivityData bind:firebase bind:activity />
{#if activity}
  <div class="mt-8 mb-32">
    <ShowActivity bind:firebase bind:activity />
  </div>
{/if}
