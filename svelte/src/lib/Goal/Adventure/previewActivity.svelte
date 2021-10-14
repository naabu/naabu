<script>
  import ShowActivity from "$lib/Activity/show.svelte";
  import MainTabs from "$lib/Tabs/goal.svelte";
  import { goto } from "$app/navigation";
  export let firebase;
  export let goal;
  export let activity;

  function goBackToActivitySearch() {
    goto("/leerdoel/" + goal.id + "/avontuur-maken");
  }
  function useThisActivity() {
    goto("/leerdoel/" + goal.id + "/avontuur-maken/" + activity.id + "/form");
  }
</script>

<MainTabs bind:goal mainSelected='adventures'/>

<ShowActivity bind:firebase bind:activity showFeedback={false} />

<div class="mt-8 mb-32">
  <button
    class="float-left mt-3bg-white py-2 ml-auto px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    on:click|preventDefault={goBackToActivitySearch}>Terug naar zoeken</button
  >

  <button
    class="float-right disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    on:click|preventDefault={useThisActivity}>Deze activiteit gebruiken</button
  >
</div>
