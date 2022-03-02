<script>
  import Talk from "$lib/Goal/Talk/Components/show.svelte";
  import { getStores, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import { t } from "svelte-intl-precompile";

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
        value: $t("curriculum"),
      },
      {
        url: "/leerdoel/" + goal.id,
        value: $t("goal") + ": " + goal.title,
      },
      {
        url: $page.path,
        value: $t("overview"),
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
