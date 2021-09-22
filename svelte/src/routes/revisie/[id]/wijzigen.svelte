<script>
   import EditRevision from '$lib/Revision/edit.svelte';
   import { onMount } from 'svelte';
   import { getStores, session, page } from "$app/stores"
   import { initFirebase } from "$lib/firebase";
   let firebase;
   let ref;
   let battleCol;
 
   onMount(async() => {
     firebase = await initFirebase($session.environment);
     let db = await firebase.firestore();
     ref = db.collection('revisions').doc($page.params.id);
     battleCol = db.collection('revisions/' + $page.params.id + "/battles")
   });
 
 
 </script>
 
 {#if firebase && ref}
   <EditRevision bind:revisionRef={ref} bind:battleCol bind:firebase/>
 {/if}