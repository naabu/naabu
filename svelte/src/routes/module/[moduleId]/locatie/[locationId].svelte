<script>
  import ActivitiesTeaserList from "$lib/Activity/Teasers/list.svelte";
  import GetModuleData from "$lib/Module/getModuleData.svelte";
  import { getStores, session, page } from "$app/stores";
  import { filterSelectedActivities, getUserModule } from "$lib/Module/helper";

  let module;
  let firebase;

  $: console.log(module);
  $: console.log($page.params.locationId);

  let userModule = null;
  let filteredActivities;

  $: if (module && userModule && $page.params.locationId) {
    console.log("reactive");
    filteredActivities = filterSelectedActivities(
      module,
      $page.params.locationId,
      userModule
    );
    if (filteredActivities.length === 0) {
      setTimeout(async () => {
        userModule = await getUserModule(
          firebase,
          module.id,
          module,
          $session.player
        );
        console.log(userModule);
      }, 500);
    }
  }

  // $: (async () => {
  //   if (
  //     module &&
  //     userModule &&
  //     filteredActivities &&
  //     filteredActivities.length === 0
  //   ) {
  //     setTimeout(async () => {
  //       userModule = await getUserModule(
  //         firebase,
  //         module.id,
  //         module,
  //         $session.player
  //       );
  //     }, 500);
  //   }
  // })();

  // $: if (userModule && userModule.selectedActivities) {
  //   displayAdventures = userModule.selectedActivities;
  // }

  // $: console.log(displayedAdventures);
</script>

<GetModuleData
  bind:module
  bind:firebase
  bind:userModule
  loadUserModule={true}
/>
<div>
  <a
    href="/module/{$page.params.moduleId}"
    class="font-medium hover:underline text-indigo-600 hover:text-indigo-500"
    ><span aria-hidden="true">&#8592;</span> Ga terug naar leskaart</a
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
