<script>
  import ActivitiesTeaserList from "$lib/Activity/Components/teaserList.svelte";
  import GetModuleData from "$lib/Module/Data/getModuleData.svelte";
  import { getStores, session, page } from "$app/stores";
  import { filterSelectedActivities, getUserModule } from "$lib/Module/Components/helper";
  import { t } from "svelte-intl-precompile";
  import { firebase } from "$lib/Internals/Firebase/store";

  let module;
  let userModule = null;
  let filteredActivities;
  let timer = null;
  $: if (
    module &&
    userModule &&
    $page.params.locationId &&
    (!filteredActivities || filteredActivities.length === 0)
  ) {
    filteredActivities = filterSelectedActivities(
      module,
      $page.params.locationId,
      userModule
    );
    if (filteredActivities.length === 0) {
      if (timer == null) {
        timer = setInterval(async () => {
          userModule = await getUserModule(
           $firebase,
            module.id,
            module,
            $session.player
          );
        }, 500);
      }
    } else if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }
</script>

<GetModuleData
  bind:module
  
  bind:userModule
  loadUserModule={true}
/>
<div>
  <a
    data-test="back-to-course-button"
    href="/module/{$page.params.moduleId}"
    class="font-medium hover:underline text-indigo-600 hover:text-indigo-500"
    ><span aria-hidden="true">&#8592;</span>{$t("go-back-to-map")}</a
  >
  {#if userModule && userModule.newUnlockedLocation}
    <span
      data-test="new-location-unlocked"
      class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
    >
    {$t("new-location-unlocked")}
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
