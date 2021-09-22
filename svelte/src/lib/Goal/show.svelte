<script>
  export let goal;
  import MainTabs from "$lib/Tabs/goal.svelte";
</script>

<MainTabs bind:goal />

<div class="mt-8">
  Titel: {goal.title}
</div>

<div class="mt-8">
  Omschrijving: {goal.description}
</div>

<div class="mt-16">
  <b> TODO: change later </b>
</div>
