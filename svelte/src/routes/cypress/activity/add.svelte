<script>
  import { getStores, session } from "$app/stores";
  import { firebaseStore } from "$lib/Firebase/store";
  let firebase;
  let created = false;
  let ready = false;

  function getData(title, difficulity, goalId, hasQuiz = false) {
    let data = {
      authorId: $session.user.uid,
      connectionId: "connection_" + title.replace(/ +/g, ""),
      connectionStatus: "published",
      description: "test",
      descriptionRaw: "test",
      difficulty: difficulity,
      quizzes: [],
      goalId: goalId,
      goalTitle: "Cypress Test Goal",
      status: "published",
      svg: "",
      title: title,
      type: "explanation",
      video: {
        vimeoId: 604675909,
      },
    };
    if (hasQuiz) {
      data.quizzes = [
        {
          answers: [
            { answer: "1", correct: false },
            { answer: "2", correct: true },
          ],
          id: "sg1dr",
          question: "1+1=",
          timeInVideo: 2,
          type: "multiple_choice",
        },
      ];
    }
    return data;
  }

  $: (async () => {
    if ($firebaseStore) {
      firebase = $firebaseStore;
      if (
        ($session.environment === "cypress" ||
          $session.environment === "development") &&
        $session.user &&
        !$session.user.isAnonymous &&
        !created
      ) {
        created = true;
        let db = await firebase.firestore();

        try {
          await db
            .collection("activities")
            .doc("activity11")
            .set(getData("activity 11", 1, "cypress-test-goal-1", true));
          await db
            .collection("activities")
            .doc("activity12")
            .set(getData("activity 12", 2, "cypress-test-goal-1", false));
          await db
            .collection("activities")
            .doc("activity13")
            .set(getData("activity 13", 3, "cypress-test-goal-1", false));
          await db
            .collection("activities")
            .doc("activity21")
            .set(getData("activity 21", 1, "cypress-test-goal-2", false));
          await db
            .collection("activities")
            .doc("activity22")
            .set(getData("activity 22", 2, "cypress-test-goal-2", false));
          await db
            .collection("activities")
            .doc("activity23")
            .set(getData("activity 23", 3, "cypress-test-goal-2", false));
          ready = true;
        } catch (e) {
          console.log(e);
        }
      }
    }
  })();
</script>

Creating a new activities <br />

{#if ready}
  <div data-test="complete">6 activities successfully created!</div>
{/if}
