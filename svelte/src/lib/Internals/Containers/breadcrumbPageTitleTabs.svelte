<script>
  import BreadcrumbPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";

  export let breadcrumbs = [];
  export let title = "";
  export let mainTabs;
  export let subTabs;
  export let subSubTabs;
</script>

<BreadcrumbPageTitle bind:breadcrumbs bind:title/>
