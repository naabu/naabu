<script>
  import PlayAdventure from "$lib/Goal/Adventure/play.svelte";
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { initFirebase } from "$lib/firebase";

  let firebase;
  let goal;
  let adventureRef;
  let adventure;
  let mounted = false;

  onMount(async () => {
    firebase = await initFirebase($session.environment);
    await retrieveFirestoreData();
    mounted = true;
  });

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    // let ref = db.collection('goals').doc($page.params.goalId);
    // let snap = await ref.get();
    // if (snap.exists) {
    //   goal = snap.data();
    //   goal.id = ref.id;
    // }

    adventureRef = db
      .collection("goals")
      .doc($page.params.goalId)
      .collection("adventures")
      .doc($page.params.adventureId);
    let adventureSnap = await adventureRef.get();
    if (adventureSnap.exists) {
      adventure = adventureSnap.data();
      adventure.goalId = $page.params.goalId;
      adventure.id = adventureRef.id;

      let battleCol = db.collection("goals").doc(adventure.goalId).collection("battles");
      const querySnapshot = await battleCol.get();
      adventure.battles = [];
      querySnapshot.forEach((doc) => {
        let battleObject = doc.data();
        battleObject.name = doc.id;
        adventure.battles = [...adventure.battles, battleObject];
      });
    }
  }
</script>

{#if mounted && adventure}
  <PlayAdventure bind:firebase bind:adventure />
{/if}
