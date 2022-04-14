<script>
  import ShowModuleActivity from "$lib/Module/Components/showActivity.svelte";
  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";
  import GetModuleData from "$lib/Module/Data/getModuleData.svelte";
  import { getStores, page } from "$app/stores";
  export let activity;
  let module;
  let firebase;
  let locationId = $page.params.locationId;
</script>

<GetActivityData bind:firebase bind:activity />
<GetModuleData bind:firebase bind:module />
{#if activity}
  <div class="mt-8 mb-32">
    <ShowModuleActivity
      bind:firebase
      bind:activity
      bind:module
      bind:locationId
    />
  </div>
{/if}
