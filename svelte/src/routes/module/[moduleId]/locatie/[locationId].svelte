<script>
  import ActivitiesTeaserList from "$lib/Activity/Teasers/list.svelte";
  import GetModuleData from "$lib/Module/getModuleData.svelte";
  import { getStores, page } from "$app/stores";
  import { filterSelectedActivities } from "$lib/Module/helper";

  let module;

  $: console.log(module);
  $: console.log($page.params.locationId);

  let userModule = null;
  let filteredActivities;

  $: if (module && userModule && $page.params.locationId) {
    filteredActivities = filterSelectedActivities(
      module,
      $page.params.locationId,
      userModule
    );
  }

  // $: if (userModule && userModule.selectedActivities) {
  //   displayAdventures = userModule.selectedActivities;
  // }

  // $: console.log(displayedAdventures);
</script>

<GetModuleData bind:module bind:userModule loadUserModule={true} />
<div>
  <a
    href="/module/{$page.params.moduleId}"
    class="font-medium hover:underline text-indigo-600 hover:text-indigo-500"
    ><span aria-hidden="true">&#8592;</span> Ga terug naar module</a
  >
  {#if userModule && userModule.newUnlockedLocation}
    <span
      class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
    >
      Nieuwe locatie ontgrendeld!
    </span>
  {/if}
</div>

{#if userModule && filteredActivities}
  <ActivitiesTeaserList
    bind:activities={filteredActivities}
    bind:moduleId={module.id}
    bind:locationId={$page.params.locationId}
  />
{/if}
