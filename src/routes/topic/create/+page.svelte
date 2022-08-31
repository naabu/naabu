<script>
    import CreateTopic from "$lib/Topic/Create.svelte";
    import { onMount } from "svelte";
    import { firebase } from "$lib/Internals/Firebase/store";
    
    import { t } from "svelte-intl-precompile";
  
    import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
    let breadcrumbs = [
      {
        url: "/curriculum",
        value: $t("curriculum"),
      },
      {
        url: "/topic/create",
        value: $t("create-topic"),
      },
    ];
  
    $: (async () => {
      if ($firebase) {
        
      }
    })();
  </script>
  
  {#if $firebase}
    <ContainerBreadcrumpPageTitle bind:breadcrumbs title={$t("create-topic")} />
    <CreateTopic />
  {/if}
  