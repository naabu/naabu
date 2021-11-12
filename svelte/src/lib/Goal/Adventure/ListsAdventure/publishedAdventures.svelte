<script>
  export let goal;
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/activityStatus.svelte";
  import DataTable from "./datatable.svelte"
  export let firebase;
</script>

<MainTabs bind:goal mainSelected="adventures" />
<SecondTabs bind:goal mainSelected="published" />

<DataTable bind:goalId={goal.id} bind:adventureArray={goal.publishedAdventures} bind:firebase/>