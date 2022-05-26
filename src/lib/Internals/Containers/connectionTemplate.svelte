<script>
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";

  export let goal;
  ;
  export let breadcrumbs;
</script>

<GetGoalData bind:goal  />
{#if goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  <slot />
{/if}
