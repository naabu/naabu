<script>
  import { getStores, session } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  export let collection;
  export let userCheck = true;
  export let fieldUserId = "authorId";
  export let idCheck = false;
  export let subcollectionDelete = false;
  export let subcollection;
  export let ids;
  export let checkAnon = true;
  export let uid = null;
  export let titleCheck = false;
  export let title = null;
  let firebase;
  export let resetDone = false;
  
  export let showComplete = true;
  let mounted = false;
  let db;
  let feedbackstring = "<br> feedback: <br>";

  async function clear() {
    try {
      if ($session.user.uid) {
        let clearCollection = db.collection(collection);
        if (userCheck) {
          if (uid == null) {
            uid = $session.user.uid;
          }
          clearCollection = db
            .collection(collection)
            .where(fieldUserId, "==", uid);
        }
        if (idCheck && ids && ids.length > 0) {
          clearCollection = db
            .collection(collection)
            .where(firebase.firestore.FieldPath.documentId(), "in", ids);
        }
        if (titleCheck && title !== null) {
          clearCollection = db
            .collection(collection)
            .where("title", "==", title);
        }

        // clearCollection = db.collection("modules").where("authorId", "==", $session.user.uid);
        let querySnapshot = await clearCollection.get();
        let docRefArray = [];
        querySnapshot.forEach((updateDoc) => {
          docRefArray.push(updateDoc.id);
        });

        console.log(docRefArray);

        for (let i = 0; i < docRefArray.length; i++) {
          await db.collection(collection).doc(docRefArray[i]).delete();
        }
      }
    } catch (error) {
      console.error(error);
    }
    resetDone = true;
  }

  async function subcollectionClear() {
    try {
      if ($session.user.uid) {
        let clearCollection = db.collection(collection);
        let querySnapshot = await clearCollection.get();
        let docRefArray = [];
        querySnapshot.forEach((updateDoc) => {
          docRefArray.push(updateDoc.id);
        });
        for (let i = 0; i < docRefArray.length; i++) {
          let subcollectionQuery = db
            .collection(collection)
            .doc(docRefArray[i])
            .collection(subcollection)
            .where(firebase.firestore.FieldPath.documentId(), "in", ids);

          let subQuerySnapshot = await subcollectionQuery.get();
          let subDocRefArray = [];
          subQuerySnapshot.forEach((updateDoc) => {
            subDocRefArray.push(updateDoc.id);
          });
          for (let i2 = 0; i2 < subDocRefArray.length; i2++) {
            await db
              .collection(collection)
              .doc(docRefArray[i])
              .collection(subcollection)
              .doc(subDocRefArray[i2])
              .delete();
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
    resetDone = true;
  }

  $: (async () => {
    if (
      ($session.environment === "cypress" ||
        $session.environment === "test" ||
        $session.environment === "development") &&
      db &&
      $session.player &&
      $session.user &&
      (!checkAnon || !$session.user.isAnonymous)
    ) {
      if (subcollectionDelete) {
        await subcollectionClear();
      } else {
        await clear();
      }
    }
  })();

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      db = await firebase.firestore();
      mounted = true;
    }
  })();
</script>

{#if $session.environment === "cypress" || $session.environment === "test" || $session.environment === "development"}
  Now cleaning up the {collection}.
  {@html feedbackstring}

  {#if resetDone && showComplete}
    <div data-test="complete">The {collection} are cleared</div>
  {/if}
{/if}
