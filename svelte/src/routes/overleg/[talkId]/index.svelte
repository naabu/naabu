<script>
  import Talk from "$lib/Talk/show.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";

  let firebase;

  let talk;
  let mounted = false;
  let posts = [];

  onMount(async () => {
    firebase = await initFirebase($session.environment);

    await retrieveFirestoreData();
    mounted = true;
  });

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
        posts.push(post);
      });
    }
  }
</script>

{#if mounted}
  <Talk bind:talk bind:posts bind:firebase/>
{/if}
