<script>
  import Diff from "$lib/Revision/diff.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import { getNextAndPreviousRevisions } from "$lib/Revision/helper";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/helper";

  let goal;
  let firebase;
  let breadcrumbs;

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: $page.path,
        value: "Verschil versies",
      },
    ];
  }

  let revisionNew;
  let revisionOld;
  let goBackRevision;
  let goForwardRevision;

  let mounted = false;
  let loading = false;

  const update = async () => {
    loading = true;
    goBackRevision = null;
    goForwardRevision = null;
    await retrieveFirestoreData();
    loading = false;
  };

  $: if ($page.params.id && $page.params.oldId && mounted) {
    update();
  }

  // $: if ($page.params.id && $page.params.oldId && mounted) {
  //   loading = true;
  //   goBackRevision = null;
  //   goForwardRevision = null;
  //   retrieveFirestoreData();
  //   loading = false;
  // }

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    mounted = true;
    await retrieveFirestoreData();
  });

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let newRef = db.collection("revisions").doc($page.params.id);
    let newSnap = await newRef.get();
    if (newSnap.exists) {
      revisionNew = newSnap.data();
      revisionNew.id = newRef.id;
      let battleCol = db
        .collection("revisions")
        .doc(revisionNew.id)
        .collection("battles");
      const querySnapshot = await battleCol.get();
      revisionNew.battles = [];
      querySnapshot.forEach((doc) => {
        let battleObject = doc.data();
        battleObject.name = doc.id;
        revisionNew.battles = [...revisionNew.battles, battleObject];
      });
    }
    let oldRef = db.collection("revisions").doc($page.params.oldId);
    let oldSnap = await oldRef.get();
    if (oldSnap.exists) {
      revisionOld = oldSnap.data();
      revisionOld.id = oldRef.id;
      let battleCol = db
        .collection("revisions")
        .doc(revisionOld.id)
        .collection("battles");
      const querySnapshot = await battleCol.get();
      revisionOld.battles = [];
      querySnapshot.forEach((doc) => {
        let battleObject = doc.data();
        battleObject.name = doc.id;
        revisionOld.battles = [...revisionOld.battles, battleObject];
      });
    }

    let goalSnap = await db.collection("goals").doc(revisionNew.goalId).get();
    if (goalSnap.exists) {
      goal = goalSnap.data();
      goal.id = revisionNew.goalId;

      let returnRevisions = getNextAndPreviousRevisions(
        goal.revisionList,
        revisionNew.id
      );
      goForwardRevision = returnRevisions.nextRevision;
      goBackRevision = returnRevisions.previousPreviousRevision;
    }
  }
</script>

{#if mounted && revisionNew && revisionOld && goal}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />

  <Diff
    bind:revisionNew
    bind:revisionOld
    bind:goForwardRevision
    bind:goBackRevision
    bind:loading
  />
{/if}
