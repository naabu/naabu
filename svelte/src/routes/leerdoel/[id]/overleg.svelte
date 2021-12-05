<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";

  let firebase;

  let goal;
  let mounted = false;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let ref = db.collection("goals").doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      goal = snap.data();
      if (goal.talkId) {
        await goto("/overleg/" + ref.id + "/" + goal.talkId);
      } else {
        let talkResult = await db.collection("talk").add({ type: "goal" });
        goal.talkId = talkResult.id;
        await ref.set(goal);
        await goto("/overleg/" + ref.id + "/" + +goal.talkId);
      }
    }
  }
  let breadcrumbs;
  $: if (goal) {
    breadcrumbs = [
      {
        url: "/curriculum",
        value: "Curriculum",
      },
      {
        url: $page.path,
        value: "Leerdoel overleg pagina laden",
      },
    ];
  }
</script>

<ContainerBreadcrumpPageTitle
  bind:breadcrumbs
  title="Leerdoel overleg pagina laden"
/>

Loading...
