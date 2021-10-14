<script>
  import ShowActivity from "$lib/Activity/show.svelte";
  import MainTabs from "$lib/Tabs/goal.svelte";
  import { goto } from "$app/navigation";
  export let firebase;
  export let goal;
  export let activity;
  export let adventure;

  function goBackToAdventure() {
    goto("/leerdoel/" + goal.id + "/avontuur/" + adventure.id + "/work");
  }
  // function useThisActivity() {
  //   goto("/leerdoel/" + goal.id + "/avontuur-maken/" + activity.id + "/form");
  // }
</script>

<MainTabs bind:goal mainSelected="adventures" />

<div class="mt-8 mb-32">
  <ShowActivity bind:firebase bind:activity={adventure} showFeedback={false} />
  <div class="flex mt-4">
    <button
      class="mr-auto mt-3bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      on:click|preventDefault={goBackToAdventure}
      >Terug naar avontuur pagina</button
    >
  </div>
</div>
