<script>
  import BreadcrumbPageTitle from "$lib/Interals/Containers/breadcrumbPageTitle.svelte";

  export let breadcrumbs = [];
  export let title = "";
  export let mainTabs;
  export let subTabs;
  export let subSubTabs;
</script>

<BreadcrumbPageTitle bind:breadcrumbs bind:title/>
