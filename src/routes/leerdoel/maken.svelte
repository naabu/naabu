<script>
  import CreateGoal from "$lib/Goal/Components/create.svelte";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { getStores, session } from "$app/stores";
  import { t } from "svelte-intl-precompile";

  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  let breadcrumbs = [
    {
      url: "/curriculum",
      value: $t("curriculum"),
    },
    {
      url: "/leerdoel/maken",
      value: $t("create-goal"),
    },
  ];
  ;

  $: (async () => {
    if ($firebase) {
      firebase = $firebase;
    }
  })();
</script>

{#if firebase}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={$t("create-goal")} />
  <CreateGoal  />
{/if}
