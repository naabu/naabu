<script>
  
  import { firebase } from "$lib/Internals/Firebase/store";
  import { t } from "svelte-intl-precompile";
  import { user, player } from "$lib/Internals/User/store";
  import DOMPurify from 'dompurify';
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
 
  export let resetDone = false;

  export let showComplete = true;
  let mounted = false;
  let db;
  let feedbackstring = "<br> "+ $t("feedback") + ": <br>";

  async function clear() {
    try {
      if ($user.uid) {
        let clearCollection = db.collection(collection);
        if (userCheck) {
          if (uid == null) {
            uid = $user.uid;
          }
          clearCollection = db
            .collection(collection)
            .where(fieldUserId, "==", uid);
        }
        if (idCheck && ids && ids.length > 0) {
          clearCollection = db
            .collection(collection)
            .where($firebase.firestore.FieldPath.documentId(), "in", ids);
        }
        if (titleCheck && title !== null) {
          clearCollection = db
            .collection(collection)
            .where("title", "==", title);
        }

        // clearCollection = db.collection("modules").where("authorId", "==", $user.uid);
        let querySnapshot = await clearCollection.get();
        let docRefArray = [];
        querySnapshot.forEach((updateDoc) => {
          docRefArray.push(updateDoc.id);
        });

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
      if ($user.uid) {
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
            .where($firebase.firestore.FieldPath.documentId(), "in", ids);

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
      ($page.data.session.environment === "cypress" ||
        $page.data.session.environment === "test" ||
        $page.data.session.environment === "development") &&
      db &&
      $player &&
      $user &&
      (!checkAnon || !$user.isAnonymous)
    ) {
      if (subcollectionDelete) {
        await subcollectionClear();
      } else {
        await clear();
      }
    }
  })();

  $: (async () => {
    if ($firebase) {
     
      db = await $firebase.firestore();
      mounted = true;
    }
  })();
</script>

{#if $page.data.session.environment === "cypress" || $page.data.session.environment === "test" || $page.data.session.environment === "development"}
  {$t("clearing-collection", { values: { collection: collection } })}
  {@html DOMPurify.sanitize(feedbackstring)}

  {#if resetDone && showComplete}
    <div data-test="complete">
      {$t("clearing-collection-complete", {
        values: { collection: collection },
      })}
    </div>
  {/if}
{/if}
