<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { t } from "svelte-intl-precompile";

  let goal;

  $: (async () => {
    if ($firebase) {
      await retrieveFirestoreData();
    }
  })();

  async function retrieveFirestoreData() {
    let db = $firebase.firestore();
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
        value: $t("curriculum"),
      },
      {
        url: $page.url.pathname,
        value: $t("goal-discuss-page-load"),
      },
    ];
  }
</script>

<ContainerBreadcrumpPageTitle
  bind:breadcrumbs
  title={$t("goal-discuss-page-load")}
/>

{$t("loading")}
