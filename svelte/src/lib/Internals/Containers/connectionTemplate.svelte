<script>
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";

  export let goal;
  export let firebase;
  export let breadcrumbs;
  let mounted;
</script>

<GetGoalData bind:goal bind:firebase bind:mounted />
{#if mounted && goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  <slot />
{/if}
