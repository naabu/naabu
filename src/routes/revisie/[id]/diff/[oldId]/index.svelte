<script>
  import ActivityDiff from "$lib/Internals/Revision/ActivityDiff.svelte";
  import GoalDiff from "$lib/Internals/Revision/goalDiff.svelte";
  import { getStores, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { getNextAndPreviousRevisions } from "$lib/Internals/Revision/helper";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/Components/helper";
  import GetRevisionListData from "$lib/Internals/Revision/getListData.svelte";
  import ShowRevisionHistory from "$lib/Internals/Revision/history.svelte";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { goto } from "$app/navigation";
  import SaveActivityRevision from "$lib/Internals/Revision/saveActivityRevision.svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";

  let menuitems;

  let goal;
  let firebase;
  let breadcrumbs;
  let revisions;
  let toggleShowAllHistory = false;
  let latestRevisionId;
  let latestRevisionStatus;

  $: if (revisions) {
    if (revisions.length > 0) {
      latestRevisionId = revisions[0].revisionId;
      latestRevisionStatus = revisions[0].status;
    }
  }

  $: if (goal) {
    breadcrumbs = getDefaultGoalBreadcrumbs(goal);

    breadcrumbs = [
      ...breadcrumbs,
      {
        url: $page.url.pathname,
        value: $t("difference-versions"),
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

  $: if (revisionNew && revisionNew.revisionType === "activity") {
    menuitems = getTeacherMenuitems($page.url.pathname, $t, latestRevisionStatus);
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
    let newRef = db.collection("revisions").doc($page.params.id);
    let newSnap = await newRef.get();
    if (newSnap.exists) {
      revisionNew = newSnap.data();
      revisionNew.revisionId = newRef.id;
      if (!revisionNew.revisionType || revisionNew.revisionType === "goal") {
        let battleCol = db
          .collection("revisions")
          .doc(revisionNew.revisionId)
          .collection("battles");
        const querySnapshot = await battleCol.get();
        revisionNew.battles = [];
        querySnapshot.forEach((doc) => {
          let battleObject = doc.data();
          battleObject.name = doc.id;
          revisionNew.battles = [...revisionNew.battles, battleObject];
        });
      }
    }
    let oldRef = db.collection("revisions").doc($page.params.oldId);
    let oldSnap = await oldRef.get();
    if (oldSnap.exists) {
      revisionOld = oldSnap.data();
      revisionOld.revisionId = oldRef.id;
      if (!revisionOld.revisionType || revisionNew.revisionType === "goal") {
        let battleCol = db
          .collection("revisions")
          .doc(revisionOld.revisionId)
          .collection("battles");
        const querySnapshot = await battleCol.get();
        revisionOld.battles = [];
        querySnapshot.forEach((doc) => {
          let battleObject = doc.data();
          battleObject.name = doc.id;
          revisionOld.battles = [...revisionOld.battles, battleObject];
        });
      }
    }

    if (
      revisionNew &&
      (!revisionNew.revisionType || revisionNew.revisionType === "goal")
    ) {
      let goalSnap = await db.collection("goals").doc(revisionNew.goalId).get();
      if (goalSnap.exists) {
        goal = goalSnap.data();
        goal.id = revisionNew.goalId;

        let returnRevisions = getNextAndPreviousRevisions(
          goal.revisionList,
          revisionNew.revisionId
        );
        goForwardRevision = returnRevisions.nextRevision;
        goBackRevision = returnRevisions.previousPreviousRevision;
      }
    }
    if (revisionNew && revisionNew.revisionType === "activity") {
    }
  }
</script>

{#if mounted && revisionNew && revisionOld}
  {#if !revisionNew.revisionType || revisionNew.revisionType == "goal"}
    {#if goal}
      <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
      <GoalDiff
        bind:revisionNew
        bind:revisionOld
        bind:goForwardRevision
        bind:goBackRevision
        bind:loading
      />
    {/if}
  {:else if revisionNew.revisionType == "activity"}
    <GetRevisionListData
      bind:firebase
      bind:revisions
      revisionType="activity"
      bind:sourceId={revisionNew.revisionSourceId}
    />

    <Sidebar bind:menuitems>
      <span slot="title">{$t("edits-activity")} </span>

      <span slot="cta-button">
        <div class="ml-4 mr-auto w-full flex justify-between">
          <p class="pt-2 text-sm text-gray-500">
            <a
              href="/lerarenkamer/activiteit/{revisionNew.revisionSourceId}"
              class="hover:underline"
            >
              {$t("back-to-activity")}
            </a>
          </p>
          <Button
            dataTest="show-all-activity-revisions-button"
            extraClasses={["z-10"]}
            on:click={() => (toggleShowAllHistory = !toggleShowAllHistory)}
            content={$t("show-complete-history")}
          />
        </div>
      </span>

      <span slot="content">
        <ActivityDiff
          bind:revisionNew
          bind:revisionOld
          bind:goForwardRevision
          bind:goBackRevision
          bind:loading
        />

        <ShowRevisionHistory
          bind:firebase
          bind:revisions
          bind:toggle={toggleShowAllHistory}
          bind:activeRevisionId={revisionNew.revisionId}
        />
        {#if latestRevisionId && revisionNew.revisionId !== latestRevisionId}
          <SaveActivityRevision
            bind:firebase
            bind:latestRevisionId
            bind:revision={revisionNew}
          />
        {/if}
      </span>
    </Sidebar>
  {/if}
{/if}
