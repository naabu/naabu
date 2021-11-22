<script>
  import ShowActivity from "$lib/Activity/show.svelte";
  import { goto } from "$app/navigation";
  import { getStores, page } from "$app/stores";
  export let activity;
  export let firebase;

  let redirect;

  $: {
    redirect = $page.query.get("redirect");
  }

  function goBack() {
    if ($page.query.get("redirect")) {
      goto($page.query.get("redirect"));
    }
  }
</script>

{#if activity}
  <ShowActivity bind:firebase bind:activity showFeedback={false} />
{/if}

{#if redirect}
  <div class="mt-8 mb-32">
    <button
      class="float-left mt-3 bg-white py-2 ml-auto px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      on:click|preventDefault={goBack}>Terug</button
    >
  </div>
{/if}
