<script>
  import Talk from "$lib/Talk/show.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";
  import GetGoalData from "$lib/Goal/getGoalData.svelte";

  let firebase;

  let goal;
  let talk;
  let mounted = false;
  let posts = [];

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let ref = db.collection("talk").doc($page.params.talkId);
    let snap = await ref.get();
    if (snap.exists) {
      talk = snap.data();
      talk.id = ref.id;

      let postsRef = db.collection("talk").doc(talk.id).collection("posts");
      let postsSnap = await postsRef.get();
      postsSnap.forEach((postDoc) => {
        let post = postDoc.data();
        post.id = postDoc.id;
        posts = [...posts, post];
      });
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
        url: "/leerdoel/" + goal.id,
        value: "Leerdoel: " + goal.title,
      },
      {
        url: $page.path,
        value: "Overleg",
      },
    ];
  }
</script>

<GetGoalData
  bind:goal
  bind:goalId={$page.params.goalId}
  bind:firebase
  bind:mounted
/>
{#if mounted}
  {#if goal}
    <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  {/if}
  <Talk bind:talk bind:posts bind:firebase bind:goalId={$page.params.goalId} />
{/if}
