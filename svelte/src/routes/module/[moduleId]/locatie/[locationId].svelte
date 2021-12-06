<script>
  import AdventureTeaserList from "$lib/Goal/Adventure/Teasers/list.svelte";
  import GetModuleData from "$lib/Module/getModuleData.svelte";

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
{#if displayAdventures}
  <!-- <AdventureTeaserList bind:adventures={displayAdventures} /> -->
{/if}
