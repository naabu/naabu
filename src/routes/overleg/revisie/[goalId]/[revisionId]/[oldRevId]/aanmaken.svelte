<script>
  import CreatePostForm from "$lib/Goal/Talk/Components/createPost.svelte";
  import { getStores, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import MainTabs from "$lib/Internals/Tabs/talk.svelte";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import { t } from "svelte-intl-precompile";

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
        url:
          "/revisie/" +
          $page.params.revisionId +
          "/diff/" +
          $page.params.oldRevId,
        value: $t("difference-versions"),
      },
      {
        url: $page.path,
        value: $t("overview-difference-revisions"),
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
      revision.revisionId = revisionRef.id;
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
