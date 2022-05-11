<script>
  import { getStores, session } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  let firebase;
  let created = false;
  let ready = false;

  function getData(activityId, goalId, connectionType = "goal-activity") {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp();
    let data = {
      authorId: $session.user.uid,
      createdAt: timestamp,
      fields: [
        {
          title: "Beschrijving",
          value: "test",
        },
        {
          title: "Moeilijkheid",
          value: "Heel makkelijk",
        },
        {
          title: "Type",
          value: "Uitleg",
        },
      ],

      inNeedsForApprovalAt: timestamp,
      inProgressAt: timestamp,
      lastUpdatesAt: timestamp,
      linkId: activityId,
      sourceType: "goal",
      linkType: "activity",
      modifiedAt: timestamp,
      publishedAt: timestamp,
      status: "published",
      sourceId: goalId,
      title: activityId + "connection",
      type: connectionType,
      updatedAt: timestamp,
    };
    return data;
  }

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      if (
        ($session.environment === "cypress" ||
        $session.environment === "test" ||
          $session.environment === "development") &&
        $session.user &&
        !$session.user.isAnonymous &&
        !created
      ) {
        created = true;
        let db = await firebase.firestore();

        try {
          await db
            .collection("connections")
            .doc("connection_activity11")
            .set(getData("activity11", "cypress-test-goal-1"));
          await db
            .collection("connections")
            .doc("connection_activity12")
            .set(getData("activity12", "cypress-test-goal-1"));
          await db
            .collection("connections")
            .doc("connection_activity13")
            .set(getData("activity13", "cypress-test-goal-1"));
          await db
            .collection("connections")
            .doc("connection_activity21")
            .set(getData("activity21", "cypress-test-goal-2"));
          await db
            .collection("connections")
            .doc("connection_activity22")
            .set(getData("activity22", "cypress-test-goal-2"));
          await db
            .collection("connections")
            .doc("connection_activity23")
            .set(getData("activity23", "cypress-test-goal-2"));
          ready = true;
        } catch (e) {
          console.log(e);
        }
      }
    }
  })();
</script>

Creating new connections <br />

{#if ready}
  <div data-test="complete">6 connections successfully created!</div>
{/if}
