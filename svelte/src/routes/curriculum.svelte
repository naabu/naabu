
<script>
	import ListGoals from '$lib/Goal/list.svelte';
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";
  let breadcrumbs = [
    {
      url: "/curriculum",
      value: "Curriculum",
    }
  ];
</script>
  
<ContainerBreadcrumpPageTitle bind:breadcrumbs title="Leerdoelen zoeken"/>
<ListGoals/>
