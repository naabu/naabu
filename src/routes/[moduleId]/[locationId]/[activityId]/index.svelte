<script>
  import ShowModuleActivity from "$lib/Module/Components/showActivity.svelte";
  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";
  import GetModuleData from "$lib/Module/Data/getModuleData.svelte";
  import { getStores, page } from "$app/stores";
  export let activity;
  let module;
  ;
  let locationId = $page.params.locationId;
</script>

<GetActivityData  bind:activity />
<GetModuleData  bind:module />
{#if activity}
  <div class="mt-8 mb-32">
    <ShowModuleActivity
      
      bind:activity
      bind:module
      bind:locationId
    />
  </div>
{/if}
