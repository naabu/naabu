<script>
  import SearchGoalForConnection from "$lib/Goal/Connection/Components/search.svelte";
  import ConnectionTemplate from "$lib/Internals/Containers/connectionTemplate.svelte";
  import { getStores, session, page } from "$app/stores";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import { onMount } from "svelte";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";
  let goal;
  let firebase;
  let breadcrumbs;
  let listLinkedGoalIds;
  let mounted = false;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: $page.path,
        value: $t("create-connection-search-goal"),
      },
    ];
  }

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let collections = [
      "prerequisites",
      "deeperunderstandings",
      "bigideas",
      "specializations",
    ];
    listLinkedGoalIds = [];

    for (let i = 0; i < collections.length; i++) {
      let collection = collections[i];
      let query = db
        .collection("goals")
        .doc($page.params.id)
        .collection(collection);

      let querySnapshot = await query.get();

      querySnapshot.forEach((docSnap) => {
        let data = docSnap.data();
        listLinkedGoalIds = [...listLinkedGoalIds, data.connectionGoalId];
      });
    }
    listLinkedGoalIds = [...new Set(listLinkedGoalIds)];
  }
</script>

<ConnectionTemplate bind:goal bind:firebase bind:breadcrumbs>
  {#if mounted}
    <SearchGoalForConnection bind:goal bind:firebase bind:listLinkedGoalIds />
  {:else}
    {$t("loading")}
  {/if}
</ConnectionTemplate>
