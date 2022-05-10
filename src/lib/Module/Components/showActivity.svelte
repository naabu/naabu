<script>
  import ShowActivity from "$lib/Activity/Components/show.svelte";
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  export let firebase;
  export let activity;
  export let module;
  export let locationId;
  export let db;

  
  onMount(async () => {
    db = await firebase.firestore();
    
  });

  async function storeLowLevelObject(lowLevelDataObject) {
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

<ShowActivity bind:firebase bind:activity on:lowLevelData={lowLevelData}/>

