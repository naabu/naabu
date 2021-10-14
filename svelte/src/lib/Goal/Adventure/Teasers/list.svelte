<script>
  import Teaser from "./teaser.svelte";

  export let adventures = [];
</script>


<h1 class="font-bold text-xl m-5"> Kies je pad </h1>
<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
{#each adventures as adventure}
  <!-- Get some grid going from tailwind -->
  <Teaser bind:adventure/>
{/each}
</ul>