<script>
  import { firebase } from "$lib/Internals/Firebase/store";

  import nl from "javascript-time-ago/locale/nl.json";
  import en from "javascript-time-ago/locale/en.json";
  export let goal;
  import MainTabs from "$lib/Internals/Tabs/goal.svelte";
  import Feed from "$lib/Update/Components/Feed.svelte";
  import TimeAgo from "javascript-time-ago";
  import { t, locale } from "svelte-intl-precompile";
  import { sortOnCreatedAt } from "$lib/Internals/Revision/helper";
  import { formatToTimeAgo } from "$lib/Internals/Misc/helper";

 
  let updates;
  let collectUpdates = true;
  let loaded = false;
  let timeAgo;

  $: (async () => {
    if ($firebase && !loaded) {
     $firebase = $firebase;
      TimeAgo.addLocale(en);
      TimeAgo.addLocale(nl);
      timeAgo = new TimeAgo($locale);
      await retrieveFirestoreData();
      updateTimeAgo();
      loaded = true;
    }
  })();

  function updateTimeAgo() {
    if (firebase && updates) {
      for (let i = 0; i < updates.length; i++) {
        updates[i].createdAtTimeAgo = formatToTimeAgo(
          updates[i].createdAt,
         $firebase,
          timeAgo,
          $t
        );
      }
    }
  }

  async function retrieveFirestoreData() {
    if (collectUpdates) {
      let db = await $firebase.firestore();
      updates = [];
      let updatesCol = db
        .collection("updates")
        .where("connectionSourceType", "==", "goal")
        .where("connectionSourceId", "==", goal.id);
      const querySnapshot = await updatesCol.get();
      querySnapshot.forEach((updateDoc) => {
        let updateObject = updateDoc.data();
        updateObject.id = updateDoc.id;
        updates = [...updates, updateObject];
      });
      sortOnCreatedAt(updates);
      collectUpdates = false;
    }
  }
</script>

<MainTabs bind:goal />

{#if updates}
  <Feed bind:updates showConnectionInfo="link" />
{/if}
