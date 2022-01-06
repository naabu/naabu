<script>
  import ActivityDiff from "$lib/Revision/activityDiff.svelte";
  import GoalDiff from "$lib/Revision/goalDiff.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  import { getNextAndPreviousRevisions } from "$lib/Revision/helper";
  import ContainerBreadcrumpPageTitle from "$lib/Interals/Containers/breadcrumbPageTitle.svelte";
  import { getDefaultGoalBreadcrumbs } from "$lib/Goal/helper";
  import GetRevisionListData from "$lib/Revision/getListData.svelte";
  import ShowRevisionHistory from "$lib/Revision/history.svelte";
  import { getTeacherMenuitems } from "$lib/Teachers/helper";
  import Sidebar from "$lib/Interals/Containers/sidebar.svelte";
  import { getDefaultEmptyActivity } from "$lib/Activity/helper";
  import { goto } from "$app/navigation";
  import SaveActivityRevision from "$lib/Revision/saveActivityRevision.svelte";

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
        url: $page.path,
        value: "Verschil versies",
      },
    ];
  }

  let revisionNew;
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

  // let compareActivityEmpty;

  $: if (revisionNew && revisionNew.revisionType === "activity") {
    menuitems = getTeacherMenuitems($page.path, latestRevisionStatus);
    // compareActivityEmpty = getDefaultEmptyActivity();
    // compareActivityEmpty.difficulty = "";
  }

  // $: if ($page.params.id && $page.params.oldId && mounted) {
  //   loading = true;
  //   goBackRevision = null;
  //   goForwardRevision = null;
  //   retrieveFirestoreData();
  //   loading = false;
  // }

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
      // TODO change to learning goal revision type.
      if (!revisionNew.revisionType || revisionNew.revisionType === "goal") {
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
          revisionNew.id
        );
        goForwardRevision = returnRevisions.nextRevision;
        goBackRevision = returnRevisions.previousPreviousRevision;
      }
    }
    if (revisionNew && revisionNew.revisionType === "activity") {
    }
  }
</script>

{#if mounted && revisionNew}
  {#if !revisionNew.revisionType || revisionNew.revisionType === "goal"}
    {#if goal}
      <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
      <GoalDiff
        bind:revisionNew
        revisionOld={{}}
        bind:goForwardRevision
        bind:goBackRevision
        bind:loading
      />
    {/if}
  {:else}
    <GetRevisionListData
      bind:firebase
      bind:revisions
      revisionType="activity"
      bind:sourceId={revisionNew.revisionSourceId}
    />

    <Sidebar bind:menuitems>
      <span slot="title"> Wijzigingen activiteit </span>

      <span slot="cta-button">
        <div class="ml-4 mr-auto w-full flex">
          <p class="pt-2 text-sm text-gray-500">
            <a
              href="/lerarenkamer/activiteit/{revisionNew.revisionSourceId}"
              class="hover:underline"
            >
              Terug naar activiteit
            </a>
          </p>
          <button
            data-cy="show-all-activity-revisions-button"
            class="z-10 ml-auto mr-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click={() => (toggleShowAllHistory = !toggleShowAllHistory)}
          >
            Bekijk hele geschiedenis
          </button>
        </div>
        <!-- <div class="w-full flex">
          <button
            class="z-10 mr-auto ml-4 pl-2 pr-2 bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click={() =>
              goto("/lerarenkamer/activiteit/" + revisionNew.revisionSourceId)}
          >
            Terug naar activiteit
          </button>
          <button
            class="z-10 ml-auto mr-4 pl-2 pr-2 bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click={() => (toggleShowAllHistory = !toggleShowAllHistory)}
          >
            Bekijk hele geschiedenis
          </button>
        </div> -->
      </span>

      <span slot="content">
        <!-- <div class="w-full flex m-4"> -->
        <!-- <button
            class="ml-auto mr-4 pl-2 pr-2 bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click={() => (toggleShowAllHistory = !toggleShowAllHistory)}
          >
            Bekijk hele geschiedenis
          </button> -->
        <!-- </div> -->
        <ActivityDiff
          bind:revisionNew
          revisionOld={{}}
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
