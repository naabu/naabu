<script>
  import ManagementTabs from "$lib/Tabs/management.svelte";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  import { getStores, page, session } from "$app/stores"
	import { onMount } from 'svelte';
  import Notification from "../Misc/notification.svelte";
  import { firebaseStore } from "$lib/Firebase/store";

  let firebase;
  

  let db;
  let displayNotification = false;
  let notificationText = {
    title: "Export succesvol gekopieerd!",
    description: "Je kan nu export in Python gebruiken",
  }

  let breadcrumbs = [ 
    {
      url: '/beheer',
      value: 'Beheer'
    }
  ];

  async function trigger() {
    // We can put data in the firestore collection Name + timestamp.
    let docRef = db.collection('triggers').doc('data-export');
    let snap = await docRef.get();
    if (snap.exists) {
      docRef.update({"lastTriggerTimestamp": Date.now()});
    }
    else {
      docRef.set({"lastTriggerTimestamp": Date.now()});
    }
  }

  async function exportActivityData() {
    let docRef = db.collection('triggers').doc('data-export');
    let snap = await docRef.get();
    if (snap.exists) {
      let data = snap.data();
      if (data.output1) {
        navigator.clipboard.writeText(data.output1);
        displayNotification = true;
      }
    }
  }

  async function exportGoalData() {
    let docRef = db.collection('triggers').doc('data-export');
    let snap = await docRef.get();
    if (snap.exists) {
      let data = snap.data();
      if (data.output2) {
        navigator.clipboard.writeText(data.output1);
        displayNotification = true;
      }
    }
  }

	onMount(async() => {
    firebase = await initFirebase($session.environment);
    db = await firebase.firestore();
  });

</script>



<Notification bind:displayNotification bind:notificationText time=4000 />
<ShowBreadcrumb bind:breadcrumbs/>
<ManagementTabs />

 <br/>

 {#if $session.user && $session.user.idTokenResult.claims.canDebugDevelopment}
  <button on:click={trigger} class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Trigger Functions</button>
  <button on:click={exportActivityData} class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Get activities export in JSON</button>
  <button on:click={exportGoalData} class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Get goals export in JSON</button>
{/if}

TODO: Maybe some dashboards here. Related to activity?