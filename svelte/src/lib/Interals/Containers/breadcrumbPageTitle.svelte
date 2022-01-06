<script>
  import ShowBreadcrumb from "$lib/Goal/Breadcrumb/show.svelte";

  export let breadcrumbs = [];
  export let title = "";
</script>

<ShowBreadcrumb bind:breadcrumbs />

<h1
  class="mt-2 pb-4 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
>
  {title}
</h1>
