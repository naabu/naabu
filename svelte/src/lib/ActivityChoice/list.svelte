<script>
  import ActivityChoiceTeaser from "./teaser.svelte";
  // How do we get the data?
  // Two options:
  // 1. Algolia index
  // 2. Firestore query
  // 3. Machine learning algorithm

  export let activities = [];
  // New activity created
  // New users is there 
  // Store information about the user in firestore
  // Machine learning can use this data to give models and set the next sequence
  // Client will just look at the firestore.
</script>

<!-- This example requires Tailwind CSS v2.0+ -->

<h1 class="font-bold text-xl m-5"> Kies je pad </h1>
<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
{#each activities as activity}
  <!-- Get some grid going from tailwind -->
  <ActivityChoiceTeaser bind:activity/>
{/each}
</ul>