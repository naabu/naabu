<script>
  import ShowActivity from "$lib/Activity/Components/show.svelte";
  import { user } from "$lib/Internals/User/store";
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
    lowLevelDataObject.studentId = $user.uid;
    storeLowLevelObject(lowLevelDataObject);
  }
</script>

<ShowActivity bind:activity on:lowLevelData={lowLevelData} />
