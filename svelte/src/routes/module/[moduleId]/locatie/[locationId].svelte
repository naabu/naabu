<script>
  import ActivitiesTeaserList from "$lib/Activity/Teasers/list.svelte";
  import GetModuleData from "$lib/Module/getModuleData.svelte";
  import { getStores, page } from "$app/stores";
import { filterSelectedActivities } from "$lib/Module/helper";
  
  let module;

  $:console.log(module);
  $:console.log($page.params.locationId);

  let userModule = null;
  let filteredActivities;

  $: if (module && userModule && $page.params.locationId) {
    filteredActivities = filterSelectedActivities(module, $page.params.locationId, userModule);
  }

  // $: if (userModule && userModule.selectedActivities) {
  //   displayAdventures = userModule.selectedActivities;
  // }

  // $: console.log(displayedAdventures);
</script>

<GetModuleData bind:module bind:userModule loadUserModule={true} />
{#if userModule && filteredActivities}
  <ActivitiesTeaserList
    bind:activities={filteredActivities}
    bind:moduleId={module.id}
    bind:locationId={$page.params.locationId}
  />
{/if}
