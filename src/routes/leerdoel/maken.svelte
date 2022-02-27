<script>
  import CreateGoal from "$lib/Goal/Components/create.svelte";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
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
  let firebase;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
    }
  })();
</script>

{#if firebase}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={$t("create-goal")} />
  <CreateGoal bind:firebase />
{/if}
