<script>
  import { onMount } from "svelte";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";

  export let firebase;

  export let goal;
  export let mounted = false;
  export let goalId = $page.params.id;

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      await retrieveFirestoreData();
      mounted = true;
    }
  })();

  async function retrieveFirestoreData() {
    let db = await firebase.firestore();
    let ref = db.collection("goals").doc(goalId);
    let snap = await ref.get();
    if (snap.exists) {
      goal = snap.data();
      goal.id = ref.id;

      if (!goal.publishedAdventures) {
        goal.publishedAdventures = [];
      }
      if (!goal.needsApprovalAdventures) {
        goal.needsApprovalAdventures = [];
      }
      if (!goal.inProgressAdventures) {
        goal.inProgressAdventures = [];
      }
      if (!goal.needsWorkAdventures) {
        goal.needsWorkAdventures = [];
      }

      if (!goal.trashCanAdventures) {
        goal.trashCanAdventures = [];
      }

      if (!goal.publishedPrerequisites) {
        goal.publishedPrerequisites = [];
      }
      if (!goal.needsApprovalPrerequisites) {
        goal.needsApprovalPrerequisites = [];
      }
      if (!goal.inProgressPrerequisites) {
        goal.inProgressPrerequisites = [];
      }
      if (!goal.needsWorkPrerequisites) {
        goal.needsWorkPrerequisites = [];
      }

      if (!goal.trashCanPrerequisites) {
        goal.trashCanPrerequisites = [];
      }

      if (!goal.publishedSpecializations) {
        goal.publishedSpecializations = [];
      }
      if (!goal.needsApprovalSpecializations) {
        goal.needsApprovalSpecializations = [];
      }
      if (!goal.inProgressSpecializations) {
        goal.inProgressSpecializations = [];
      }
      if (!goal.needsWorkSpecializations) {
        goal.needsWorkSpecializations = [];
      }

      if (!goal.trashCanSpecializations) {
        goal.trashCanSpecializations = [];
      }

      if (!goal.publishedDeeperunderstandings) {
        goal.publishedDeeperunderstandings = [];
      }
      if (!goal.needsApprovalDeeperunderstandings) {
        goal.needsApprovalDeeperunderstandings = [];
      }
      if (!goal.inProgressDeeperunderstandings) {
        goal.inProgressDeeperunderstandings = [];
      }
      if (!goal.needsWorkDeeperunderstandings) {
        goal.needsWorkDeeperunderstandings = [];
      }

      if (!goal.trashCanDeeperunderstandings) {
        goal.trashCanDeeperunderstandings = [];
      }

      if (!goal.publishedBigideas) {
        goal.publishedBigideas = [];
      }
      if (!goal.needsApprovalBigideas) {
        goal.needsApprovalBigideas = [];
      }
      if (!goal.inProgressBigideas) {
        goal.inProgressBigideas = [];
      }
      if (!goal.needsWorkBigideas) {
        goal.needsWorkBigideas = [];
      }
      if (!goal.trashCanBigideas) {
        goal.trashCanBigideas = [];
      }
    }
  }
</script>
