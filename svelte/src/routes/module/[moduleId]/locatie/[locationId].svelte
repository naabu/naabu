<script>
  import ActivitiesTeaserList from "$lib/Activity/Teasers/list.svelte";
  import GetModuleData from "$lib/Module/getModuleData.svelte";
  import { getStores, page } from "$app/stores";
import { filterSelectedActivities } from "$lib/Module/helper";
  
  let module;

  $:console.log(module);
  $:console.log($page.params.locationId);

  let userModule = null;

  $: if (module && userModule && $page.params.locationId) {
    userModule = filterSelectedActivities(module, $page.params.locationId, userModule);
  }

  // $: if (userModule && userModule.selectedActivities) {
  //   displayAdventures = userModule.selectedActivities;
  // }

  $: console.log(userModule);

  // $: console.log(displayedAdventures);
</script>

<GetModuleData bind:module bind:userModule loadUserModule={true} />
{#if userModule && userModule.filteredActivities}
  <ActivitiesTeaserList
    bind:activities={userModule.filteredActivities}
    bind:moduleId={module.id}
    bind:locationId={$page.params.locationId}
  />
{/if}
