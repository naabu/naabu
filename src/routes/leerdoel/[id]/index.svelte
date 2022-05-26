<script>
  import Show from "$lib/Goal/Components/show.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { t } from "svelte-intl-precompile";

 

  let goal;
  let mounted = false;

  $: (async () => {
    if ($firebase) {
     
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
    let ref = db.collection("goals").doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      goal = snap.data();
      goal.id = ref.id;
    }
  }
  let breadcrumbs;
  $: if (goal) {
    breadcrumbs = [
      {
        url: "/curriculum",
        value: $t("curriciulum"),
      },
      {
        url: "/leerdoel/" + goal.id,
        value: $t("goal") + ": " + goal.title,
      },
      {
        url: $page.url.pathname,
        value: $t("overview"),
      },
    ];
  }
</script>

{#if mounted}
  {#if goal}
    <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />

    <Show bind:goal />
  {:else}
    {$t("goals-not-found")}
  {/if}
{:else}
  {$t("loading")}
{/if}
