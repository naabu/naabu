<script>
  import CreateGoal from "$lib/Goal/Components/create.svelte";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { getStores, session } from "$app/stores";
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  import { t } from "svelte-intl-precompile";
 

  let breadcrumbs = [
    {
      url: "/beheer",
      value: $t("management"),
    },
    {
      url: "/beheer/leerdoel",
      value: $t("goal"),
    },
    {
      url: "/beheer/leerdoel/maken",
      value: $t("create-goal"),
    },
  ];

  $: (async () => {
    if ($firebase) {
     
    }
  })();
</script>

{#if $firebase}
  <ShowBreadcrumb bind:breadcrumbs />
  <CreateGoal  />
{/if}
