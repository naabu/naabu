<script>
  import ShowActivity from "$lib/Activity/Components/show.svelte";
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  export let activity;
  export let module;
  export let locationId;

  async function storeLowLevelObject(lowLevelDataObject) {
    let db = await $firebase.firestore();
    let collectionRef = db.collection("lowLevelData");
    let result = await collectionRef.add(lowLevelDataObject);
  }

  async function lowLevelData(event) {
    let lowLevelDataObject = event.detail.lowLevelData;
    lowLevelDataObject.moduleId = module.id;
    lowLevelDataObject.moduleAuthorId = module.authorId;
    lowLevelDataObject.moduleLocationId = locationId;
    lowLevelDataObject.studentId = $session.user.uid;
    storeLowLevelObject(lowLevelDataObject);
  }
</script>

<ShowActivity bind:activity on:lowLevelData={lowLevelData} />
