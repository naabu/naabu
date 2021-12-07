<script>
  import ActivitiesTeaserList from "$lib/Activity/Teasers/list.svelte";
  import GetModuleData from "$lib/Module/getModuleData.svelte";
  import { getStores, page } from "$app/stores";
  
  let module;
  let userModule = null;
  let displayAdventures = [];

  

  // $: if (userModule && userModule.selectedActivities) {
  //   displayAdventures = userModule.selectedActivities;
  // }

  $: console.log(userModule);
  // $: console.log(displayedAdventures);
</script>

<GetModuleData bind:module bind:userModule loadUserModule={true} />
{#if userModule && userModule.selectedActivities}
  <ActivitiesTeaserList
    bind:activities={userModule.selectedActivities}
    bind:moduleId={module.id}
    bind:locationId={$page.params.locationId}
  />
{/if}
