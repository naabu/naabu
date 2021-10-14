<script>
  import ShowActivity from "$lib/Activity/show.svelte";
  export let firebase;
  export let adventure;
</script>

<div class="mt-8 mb-32">
  <ShowActivity bind:firebase bind:activity={adventure} />
</div>
