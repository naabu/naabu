<script>
  import Teaser from "$lib/Activity/Teasers/teaser.svelte";

  export let activities = [];
  export let moduleId;
  export let locationId;
</script>

<h1 class="font-bold text-xl m-5">Kies je pad</h1>

<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {#each activities as activity}
    <Teaser bind:activity bind:moduleId bind:locationId />
  {/each}
  {#if activities.length === 0}
    <div class="flex flex-col mt-5">
      Activiteiten aan het laden... even geduld aub.
      De eerste keer laden kan een aantal seconden duren. 
    </div>
  {/if}
</ul>
