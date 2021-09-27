<script>
	import {goto} from "$app/navigation";
  import { onMount } from 'svelte';
  import { getStores, session, page } from "$app/stores"
  import { initFirebase } from "$lib/firebase";

  let firebase;

	let goal;
  let mounted = false;

  onMount(async() => {
    firebase = await initFirebase($session.environment);

    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
		let db = await firebase.firestore();
		let ref = db.collection('goals').doc($page.params.id);
    let snap = await ref.get();
    if (snap.exists) {
      goal = snap.data();
      if (goal.talkId) {
        await goto("/overleg/" + goal.talkId);
      }
      else {
        let talkResult = await db.collection("talk").add({type: "goal"});
        goal.talkId = talkResult.id;
        await ref.set(goal);
        await goto("/overleg/" + goal.talkId);
      }
    }
	}
</script>

Loading...