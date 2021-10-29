<script>
  import CreatePostForm from "$lib/Talk/createPost.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import MainTabs from "$lib/Tabs/talk.svelte";
  import GetGoalData from "$lib/Goal/getGoalData.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/helper";

  let firebase;
  let revision;
  let talk;
  let goal;
  let mounted = false;
  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: "/revisie/" + $page.params.revisionId + "/diff/" + $page.params.oldRevId,
        value: "Verschil versies",
      },
      {
        url: $page.path,
        value: "Overleg verschillen revisies",
      },
    ];
  }

  onMount(async () => {
    firebase = await initFirebase($session.environment);

    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let refG = db.collection("goals").doc($page.params.goalId);
    let snapG = await refG.get();
    if (snapG.exists) {
      goal = snapG.data();
      goal.id = $page.params.goalId;
      if (goal.talkId) {
        let refT = db.collection("talk").doc(goal.talkId);
        let snapT = await refT.get();
        if (snapT.exists) {
          talk = snapT.data();
          talk.id = refT.id;
        }
      }
    }

    let revisionRef = db.collection("revisions").doc($page.params.revisionId);
    let revisionSnap = await revisionRef.get();
    if (revisionSnap.exists) {
      revision = revisionSnap.data();
      revision.id = revisionRef.id;
    }
  }
</script>

{#if mounted && goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  {#if talk.type === "goal"}
    <MainTabs
      bind:objectId={$page.params.goalId}
      talkType={talk.type}
      talkId={talk.id}
    />
  {/if}
  <CreatePostForm
    goalId={$page.params.goalId}
    bind:talk
    bind:revision
    bind:firebase
  />
{/if}
