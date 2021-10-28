<script>
  import Post from "$lib/Talk/post.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";
  import ContainerBreadcrumpPageTitle from "$lib/Containers/breadcrumbPageTitle.svelte";
  import GetGoalData from "$lib/Goal/getGoalData.svelte";

  let firebase;
  let goal;
  let mounted = false;
  let post;
  let replies = [];

  onMount(async () => {
    firebase = await initFirebase($session.environment);

    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let ref = db
      .collection("talk")
      .doc($page.params.talkId)
      .collection("posts")
      .doc($page.params.postId);
    let snap = await ref.get();
    if (snap.exists) {
      post = snap.data();
      post.id = ref.id;

      let repliesRef = db
        .collection("talk")
        .doc($page.params.talkId)
        .collection("posts")
        .doc($page.params.postId)
        .collection("replies");
      let repliesSnap = await repliesRef.get();
      repliesSnap.forEach((replyDoc) => {
        let reply = replyDoc.data();
        reply.id = replyDoc.id;
        replies = [...replies, reply];
      });
    }
  }
  let breadcrumbs;
  $: if (post && goal) {
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
        url: "/overleg/" + goal.id + '/' + $page.params.talkId ,
        value: "Overleg",
      },
      {
        url: $page.path,
        value: post.title,
      },
    ];
  }
</script>

<GetGoalData bind:goal bind:goalId={$page.params.goalId} bind:firebase bind:mounted/>
{#if mounted}
  <ContainerBreadcrumpPageTitle bind:breadcrumbs title="{goal.title}"/>
 
  <Post
    bind:post
    bind:replies
    bind:talkId={$page.params.talkId}
    bind:goalId={$page.params.goalId}
    bind:firebase
  />
{/if}
