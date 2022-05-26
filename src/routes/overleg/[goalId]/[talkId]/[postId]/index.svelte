<script>
  import Post from "$lib/Goal/Talk/Components/post.svelte";
  import { getStores, page } from "$app/stores";
  import { firebase } from "$lib/Internals/Firebase/store";
  import ContainerBreadcrumpPageTitle from "$lib/Internals/Containers/breadcrumbPageTitle.svelte";
  import GetGoalData from "$lib/Goal/Data/getGoalData.svelte";
  import { t } from "svelte-intl-precompile";

 
  let goal;
  let mounted = false;
  let post;
  let replies = [];

  $: (async () => {
    if ($firebase) {
     $firebase = $firebase;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await $firebase.firestore();
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
        value: $t("curriculum"),
      },
      {
        url: "/leerdoel/" + goal.id,
        value: $t("goal") + ": " + goal.title,
      },
      {
        url: "/overleg/" + goal.id + "/" + $page.params.talkId,
        value: $t("overview"),
      },
      {
        url: $page.url.pathname,
        value: post.title,
      },
    ];
  }
</script>

<GetGoalData
  bind:goal
  bind:goalId={$page.params.goalId}
  
  bind:mounted
/>
{#if mounted}
   {#if goal}
    <ContainerBreadcrumpPageTitle bind:breadcrumbs title={goal.title} />
  {/if}
  
  <Post
    bind:post
    bind:replies
    bind:talkId={$page.params.talkId}
    bind:goalId={$page.params.goalId}
    
  />
{/if}
