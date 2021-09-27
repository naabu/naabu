<script>
  import Post from "$lib/Talk/post.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";

  let firebase;
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
    let ref = db.collection("talk").doc($page.params.talkId).collection("posts").doc($page.params.postId);
    let snap = await ref.get();
    if (snap.exists) {
      post = snap.data();
      post.id = ref.id;

      let repliesRef = db.collection("talk").doc($page.params.talkId).collection("posts").doc($page.params.postId).collection('replies');
      let repliesSnap = await repliesRef.get();
      repliesSnap.forEach((replyDoc) => {
        let reply = replyDoc.data();
        reply.id = replyDoc.id;
        replies.push(reply);
      });
    }
  }
</script>

{#if mounted}
  <Post bind:post bind:replies bind:talkId={$page.params.talkId} bind:firebase/>
{/if}
