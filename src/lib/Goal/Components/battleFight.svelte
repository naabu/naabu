<script>
  // import$firebase from "firebase/app";
  import { page } from "$app/stores";
  import Transition from "svelte-class-transition";
  import { onMount } from "svelte";
  import { hasSpecialClaims } from "$lib/Internals/User/helper.js";
  import Button from "$lib/Internals/Button/Button.svelte";
  import RadioQuestion from "$lib/Internals/Quiz/RadioQuestion.svelte";
  import { t } from "svelte-intl-precompile";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user } from "$lib/Internals/User/store";
  
  export let activity;
  export let toggle = false;

 

  let toggleResultScreen;
  let toggleRound;
  let toggleReady;
  let toggleQuiz;
  let countdownTimer;
  let battleTime;
  let timer;
  let battleTimer;
  let quiz;
  let countdown;
  setDefaultValues();


  function retrieveQuizFromBattles() {
    if (
      activity &&
      activity.battles &&
      activity.battles.length > 0 &&
      activity.battles[0].quizzes.length > 0
    ) {
      let returnQuiz = activity.battles[0].quizzes[0];
      returnQuiz.selectedAnswer = null;

      countdownTimer = setInterval(() => {
        countdown = countdown - 1;
      }, 1000);

      battleTimer = setInterval(() => {
        timer = timer - 1;
        setCircleDasharray();
      }, 1000);

      return returnQuiz;
    }
    return null;
  }

  function setDefaultValues() {
    toggleResultScreen = false;
    toggleRound = false;
    toggleReady = false;
    toggleQuiz = false;
    countdownTimer = null;
    battleTime = 33;
    timer = battleTime;
    battleTimer = null;
    countdown = 3;
  }

  $: if (toggle === true) {
    quiz = retrieveQuizFromBattles();
  }

  function setCircleDasharray() {
    if (timer <= battleTime - 3) {
      const circleDasharray = `${(
        ((timer - 1) / (battleTime - 3)) *
        283
      ).toFixed(0)} 283`;
      if (toggleQuiz) {
        document
          .getElementById("base-timer-path-remaining")
          .setAttribute("stroke-dasharray", circleDasharray);
      }
    }
  }

  $: if (countdown <= 2 && countdown > 0) {
    toggleRound = true;
  } else {
    toggleRound = false;
  }

  $: if (countdown <= 1 && countdown > 0) {
    toggleReady = true;
  } else {
    toggleReady = false;
  }

  $: if (countdown > 0) {
    toggleQuiz = false;
  } else {
    toggleQuiz = true;
    if (countdownTimer !== null) {
      clearTimeout(countdownTimer);
    }
  }

  $: if (timer <= 0) {
    if (quiz) {
      checkCorrectAnswer(quiz);
    }
    if (battleTimer !== null) {
      clearTimeout(battleTimer);
    }
  }

  function checkCorrectAnswer(quiz) {
    let score = -1;
    if (
      quiz.selectedAnswer !== null &&
      quiz.answers[quiz.selectedAnswer].correct === true
    ) {
      quiz.correct = true;
      score = 0.7 * (timer / (battleTime - 5)) + 0.3;
    } else {
      quiz.correct = false;
    }
    if (score > 1) {
      score = 1;
    }
    toggleResultScreen = true;
    toggleQuiz = false;

    storeBattleResult(score);

    clearTimeout(battleTimer);

    setTimeout(() => {
      toggle = false;
      setDefaultValues();
    }, 2000);

    return quiz;
  }

  async function storeBattleResult(score) {
    let db = $firebase.firestore()
    let data = {
      time: Date.now(),
      activityId: activity.id,
      battleId: activity.battles[0].name,
      type: "battle-result",
      score: score,
    };

    let userHasSpecialClaims = hasSpecialClaims($user);

    if ($user && !userHasSpecialClaims) {
      try {
        data.uid = $user.uid;
        let collectionRef = db.collection("battleResult");
        let result = collectionRef.add(data);
      } catch (e) {
        console.log(e);
      }
    }
  }
</script>

{#if quiz !== null}
  <Transition
    {toggle}
    inTransition="ease-out duration-300"
    inState="opacity-0"
    onState="opacity-100"
    outTransition="ease-in duration-200"
    outState="opacity-0"
  >
    <div
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">&#8203;</span
        >

        <Transition
          {toggle}
          inTransition="ease-out duration-300"
          inState="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          onState="opacity-100 translate-y-0 sm:scale-100"
          outTransition="ease-in duration-200"
          outState="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          >
            <div>
              <div
                class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white"
              >
                <svg
                  class="animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  width="164.158"
                  height="145.156"
                  viewBox="0 0 164.158 145.156"
                >
                  <g
                    id="Mask_Group_1"
                    data-name="Mask Group 1"
                    transform="translate(0.158 0.156)"
                  >
                    <g
                      id="Sizing_Rectangle"
                      data-name="Sizing Rectangle"
                      fill="rgba(0,0,0,0)"
                      stroke="rgba(0,0,0,0)"
                      stroke-width="1"
                    >
                      <rect width="163.64" height="144.548" stroke="none" />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="162.64"
                        height="143.548"
                        fill="none"
                      />
                    </g>
                    <path
                      id="rgba_206_179_6_1_"
                      data-name="rgba(206,179,6,1)"
                      d="M112.5,32l2.5.5-2.5.5Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_2"
                      data-name="rgba(206,179,6,1)"
                      d="M117.5,33l2.5.5-2.5.5Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_3"
                      data-name="rgba(206,179,6,1)"
                      d="M114.5,39l3,4Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_4"
                      data-name="rgba(206,179,6,1)"
                      d="M137.5,46l1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_5"
                      data-name="rgba(206,179,6,1)"
                      d="M139.5,49l1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_6"
                      data-name="rgba(206,179,6,1)"
                      d="M123.5,52l1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_7"
                      data-name="rgba(206,179,6,1)"
                      d="M125.5,55l1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_8"
                      data-name="rgba(206,179,6,1)"
                      d="M14.5,72l-1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_9"
                      data-name="rgba(206,179,6,1)"
                      d="M133.5,76l.5,4.5h-1Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_10"
                      data-name="rgba(206,179,6,1)"
                      d="M49.5,77l1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_11"
                      data-name="rgba(206,179,6,1)"
                      d="M41.5,80l.5,2.5H41Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_12"
                      data-name="rgba(206,179,6,1)"
                      d="M51.5,80l1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_13"
                      data-name="rgba(206,179,6,1)"
                      d="M36.5,82,40,84.5l-1.5.5Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_14"
                      data-name="rgba(206,179,6,1)"
                      d="M53.5,83l1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_15"
                      data-name="rgba(206,179,6,1)"
                      d="M27.5,84v3Q24.5,85.5,27.5,84Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_16"
                      data-name="rgba(206,179,6,1)"
                      d="M29.5,85l2,3Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_17"
                      data-name="rgba(206,179,6,1)"
                      d="M42.5,85q2.3-.7,1.5,1.5L41.5,88V87l1.5-.5Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_18"
                      data-name="rgba(206,179,6,1)"
                      d="M145.5,85l.5,5.5h-1Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_19"
                      data-name="rgba(206,179,6,1)"
                      d="M39.5,86l.5,2.5L37.5,91,36,89.5Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_20"
                      data-name="rgba(206,179,6,1)"
                      d="M55.5,86l1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_21"
                      data-name="rgba(206,179,6,1)"
                      d="M132.5,87l.5,2.5h-1Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_22"
                      data-name="rgba(206,179,6,1)"
                      d="M5.5,88,6,92.5H5Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_23"
                      data-name="rgba(206,179,6,1)"
                      d="M57.5,89l1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_24"
                      data-name="rgba(206,179,6,1)"
                      d="M144.5,95l.5,2.5h-1Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_25"
                      data-name="rgba(206,179,6,1)"
                      d="M142.5,102l-5,6Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_26"
                      data-name="rgba(206,179,6,1)"
                      d="M131.5,104l-.5,1.5,3.5,4.5-4.5-4.5Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_27"
                      data-name="rgba(206,179,6,1)"
                      d="M9.5,107l.5,2.5H9Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_28"
                      data-name="rgba(206,179,6,1)"
                      d="M125.5,108l-1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_29"
                      data-name="rgba(206,179,6,1)"
                      d="M67.5,109l.5,5.5H67Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_30"
                      data-name="rgba(206,179,6,1)"
                      d="M122.5,112l-4,5Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_31"
                      data-name="rgba(206,179,6,1)"
                      d="M129.5,112l-1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_32"
                      data-name="rgba(206,179,6,1)"
                      d="M11.5,115l.5,2.5H11Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_33"
                      data-name="rgba(206,179,6,1)"
                      d="M124.5,115l-1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_34"
                      data-name="rgba(206,179,6,1)"
                      d="M14.5,125l1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_35"
                      data-name="rgba(206,179,6,1)"
                      d="M62.5,125l-2,3Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_36"
                      data-name="rgba(206,179,6,1)"
                      d="M16.5,128l3,4Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_37"
                      data-name="rgba(206,179,6,1)"
                      d="M58.5,128l-1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_38"
                      data-name="rgba(206,179,6,1)"
                      d="M32.5,135l-1,2Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_206_179_6_1_39"
                      data-name="rgba(206,179,6,1)"
                      d="M34.5,135l2.5,1.5-3,.5Z"
                      fill="#ceb306"
                    />
                    <path
                      id="rgba_1_1_1_0.03_"
                      data-name="rgba(1,1,1,0.03)"
                      d="M0,0,136,.5,0,24Z"
                      fill="rgba(1,1,1,0.03)"
                    />
                    <path
                      id="rgba_1_1_1_0.03_2"
                      data-name="rgba(1,1,1,0.03)"
                      d="M142.5,0h21l.5.5v64h-1Z"
                      fill="rgba(1,1,1,0.03)"
                    />
                    <path
                      id="rgba_1_1_1_0.03_3"
                      data-name="rgba(1,1,1,0.03)"
                      d="M163.5,68l.5,77-35-.5,27-28,2-4-8-17Z"
                      fill="rgba(1,1,1,0.03)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_"
                      data-name="rgba(255,255,255,0.5)"
                      d="M136.5,0l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_2"
                      data-name="rgba(255,255,255,0.5)"
                      d="M131.5,1l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_3"
                      data-name="rgba(255,255,255,0.5)"
                      d="M125.5,2l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_4"
                      data-name="rgba(255,255,255,0.5)"
                      d="M119.5,3l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_5"
                      data-name="rgba(255,255,255,0.5)"
                      d="M114.5,4l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_6"
                      data-name="rgba(255,255,255,0.5)"
                      d="M108.5,5l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_7"
                      data-name="rgba(255,255,255,0.5)"
                      d="M102.5,6l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_8"
                      data-name="rgba(255,255,255,0.5)"
                      d="M97.5,7l3.5.5L97.5,8Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_9"
                      data-name="rgba(255,255,255,0.5)"
                      d="M91.5,8l3.5.5L91.5,9Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_10"
                      data-name="rgba(255,255,255,0.5)"
                      d="M85.5,9l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_11"
                      data-name="rgba(255,255,255,0.5)"
                      d="M80.5,10l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_12"
                      data-name="rgba(255,255,255,0.5)"
                      d="M74.5,11l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_13"
                      data-name="rgba(255,255,255,0.5)"
                      d="M68.5,12l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_14"
                      data-name="rgba(255,255,255,0.5)"
                      d="M63.5,13l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_15"
                      data-name="rgba(255,255,255,0.5)"
                      d="M57.5,14l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_16"
                      data-name="rgba(255,255,255,0.5)"
                      d="M51.5,15l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_17"
                      data-name="rgba(255,255,255,0.5)"
                      d="M46.5,16l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_18"
                      data-name="rgba(255,255,255,0.5)"
                      d="M40.5,17l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_19"
                      data-name="rgba(255,255,255,0.5)"
                      d="M34.5,18l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_20"
                      data-name="rgba(255,255,255,0.5)"
                      d="M29.5,19l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_21"
                      data-name="rgba(255,255,255,0.5)"
                      d="M23.5,20l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_22"
                      data-name="rgba(255,255,255,0.5)"
                      d="M17.5,21l3.5.5-3.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_23"
                      data-name="rgba(255,255,255,0.5)"
                      d="M11.5,22l4.5.5-4.5.5Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_24"
                      data-name="rgba(255,255,255,0.5)"
                      d="M6.5,23l3.5.5L6.5,24Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_25"
                      data-name="rgba(255,255,255,0.5)"
                      d="M.5,24l3.5.5L.5,25Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_26"
                      data-name="rgba(255,255,255,0.5)"
                      d="M151.5,28,156,42.5h-1l-4-12Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_27"
                      data-name="rgba(255,255,255,0.5)"
                      d="M163.5,65l.5,2.5h-1Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_28"
                      data-name="rgba(255,255,255,0.5)"
                      d="M161.5,71l.5,1.5-12,24,4,8h-1l-4-9Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_255_255_255_0.5_29"
                      data-name="rgba(255,255,255,0.5)"
                      d="M156.5,110l1.5,3.5L128.5,145,0,144.5l128.5-.5,7.5-7.5,19-20,2-4Z"
                      fill="rgba(255,255,255,0.5)"
                    />
                    <path
                      id="rgba_251_216_1_1_"
                      data-name="rgba(251,216,1,1)"
                      d="M100.5,32q26.2-1.2,36.5,13.5l10,20v12L146,81l-6,1q-1.5,3.7,1.5,3l4-2,.5,1.5-1,1-1,14-7.5,8.5-5-4-1.5,1.5,4,4-1.5,1.5L117,119q-1.1-2.7,1.5-2A39.887,39.887,0,0,0,130,100.5l3-11,1-13-3-14L114.5,39q-5.1-4.9-14-6Z"
                      fill="#fbd801"
                    />
                    <path
                      id="rgba_251_216_1_1_2"
                      data-name="rgba(251,216,1,1)"
                      d="M30.5,66q11.2-.2,15.5,6.5l2,3a160.71,160.71,0,0,1,19,31v11A19.778,19.778,0,0,1,59.5,128l-5,3h-3l-12,5H35l1-4-3,1.5L31.5,136q-11-1-15.5-8.5l-4-8v-4l-5-16-1-14L10,76h2q-1.1-2.7,1.5-2l7-5ZM39,79,26,86q1,2,3,0l3,2q3,1,4-2l-1-3,4,2,3-2Q44,77,39,79ZM16,80l-2,1L9,87v7l9,29q3,5,11,7l5-2-1-7A144.6,144.6,0,0,1,19,85Zm27,5-3,1-4,4,2,1,6-4Q45,84,43,85Z"
                      fill="#fbd801"
                    />
                    <path
                      id="rgba_254_254_254_1_"
                      data-name="rgba(254,254,254,1)"
                      d="M140.5,10q5.7-1.8,3.5,4.5l2,4,5,24h-1L143,11h-1.5L126,26.5V29q2.7-1.1,2,1.5l18,18V50l3,1.5,5,8v11L149.5,77q.6-11.1-2.5-18.5A50.2,50.2,0,0,0,131.5,37q-6.7-5.3-17.5-6.5l5.5-.5,9,4L125,29.5v-4ZM145,50l1,2Q147,49,145,50Zm2,2q-2,5,2,7l2,15,2-5V62l-4-9Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_2"
                      data-name="rgba(254,254,254,1)"
                      d="M140.5,15,147,39.5,144.5,41,143,38l-3-1.5.5-2.5,3,4,.5-5.5L141,21l-6,4.5V29q2.7-1.1,2,1.5l1,2-6-5,1-2-2-1Zm-.5,3q-2,3,1,2Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_3"
                      data-name="rgba(254,254,254,1)"
                      d="M98.5,29l12.5.5L99.5,30,97,32.5v7l7,21h-1L97,49,79,53,76.5,63,76,57.5,79.5,52l11-4H98q-1.6-2.1-1-7.5l-2-3v-5Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_4"
                      data-name="rgba(254,254,254,1)"
                      d="M15.5,34q8.3-1,11.5,2-1.4-4,5.5-2L34,37q2.7-1.1,2,1.5l1,4-10,9q.7,3-3,1.5v2q-2.7-1.1-2,1.5L12.5,65h-3l-1-1L5,67.5l-1,8L5.5,78l7-9,15-6h10A21.966,21.966,0,0,1,51,72.5L52,76q2.7-1.1,2,1.5L57.5,82,63,78.5l-1-4L75.5,64l.5,1.5-13,10,2,3L58.5,84H56A39.382,39.382,0,0,0,43.5,67l-8-3h-5l-11,3L9,74.5,5.5,81Q1.1,77.9,3,68.5L5,64q2.7,1.1,2-1.5L7.5,60l4,3L33,44.5q-.7-2.2,1.5-1.5L36,40.5,29.5,35q-1,3-6,2l-6-2A13.26,13.26,0,0,0,9,40.5Q6.5,44,8,51.5l1,3-8,12L.5,71,0,66.5,3,60q3.3,1.3,2-3.5l3-3-1-1-1-8A13.26,13.26,0,0,1,11.5,36ZM69,36l4,9q-1,2,2,1l-2-7Zm5,36-4,3v1l5-2Q76,71,74,72Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_5"
                      data-name="rgba(254,254,254,1)"
                      d="M69.5,34q5.3-1.7,3.5,3.5Q77.3,40,76,47q-3.8,1-5-1.5l-3-10Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_6"
                      data-name="rgba(254,254,254,1)"
                      d="M99,35l2,.5v2l5,20,3.5,4.5,10-3,2.5,1q-1,4.3,2,5.5v4L121.5,73l-5,1V73l5.5-2,1-4.5q-.7-2.2-4.5-1.5l-8,4-1-2,3-2h2l4-2q1.3,2.3,2.5-.5-.5-3-4.5-2.5-1.5,4.3-7.5,3l-.5,2L104,55.5Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_7"
                      data-name="rgba(254,254,254,1)"
                      d="M102.5,36q8.6,1.9,13.5,7.5l12,18,2,4v4h-1L127,62q-2.7,1.1-2-1.5L112.5,42,109,41q1.3-3.3-3.5-2Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_8"
                      data-name="rgba(254,254,254,1)"
                      d="M82,37h4v9H81V41.5Zm1,1v7h2V39Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_9"
                      data-name="rgba(254,254,254,1)"
                      d="M16.5,38q7.4-.9,10,3l4-3L32,40.5,30.5,40q-2.6-.7-1.5,2H25v2.5L19.5,50,18,48.5l5-6q-1.4-3.1-6.5-2.5L13,42.5l-1,5L14.5,52q2.3.8,1.5-1.5h1L11.5,57l.5-1.5q.6-4.6-2-6v-6L12,40Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_10"
                      data-name="rgba(254,254,254,1)"
                      d="M55,44h4.5L66,48l2.5,4L73,53v5H68.5L67,55H64.5L55,47.5Zm1,1v2l9,6q2,1,1-1l-7-7Zm12,8,1,4q4,1,3-1Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_11"
                      data-name="rgba(254,254,254,1)"
                      d="M151.5,44q2.3,1.8,1.5,6.5l3,3q-.6,4.6,2,6v11a25.561,25.561,0,0,1-9,13q1.5,18-7.5,25.5l-1.5.5,3.5,1.5q2.3-3,7.5-2l2,3.5v3l-3.5,1.5-3-2q-1.5,2.5-7,1-1.4-2.6-6-2-5.4,7.1-17,8l-3.5-1q-2.9-2.9-2-10.5h1q-.6,8.1,4.5,10.5,11.8-2.7,19-10,2,4,8,4l5.5-2,1.5,3q2.8-1.2.5-2.5V111h-5.5l-6.5,1-1-2.5,3-1.5v-2q2.7,1.1,2-1.5l4-8,1-14q9.2-5.3,9-20l-6-14Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_12"
                      data-name="rgba(254,254,254,1)"
                      d="M91.5,52Q96,51,97,53.5l5,10-5,11L90,84H88q1.1,2.7-1.5,2l-4,2L80,85.5,78,77l13-9.5L84.5,59l-5,4,.5-1.5L81,55Zm.5,1L82,58h4l6,8v3l-2,3L80,79l2,6q-1,2,3,1,10-8,15-22l-5-9Q96,52,92,53ZM84,65l-2,1-2,3,4-2Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_13"
                      data-name="rgba(254,254,254,1)"
                      d="M57,58h4.5L69,61.5V65H62.5L62,67H59.5L49,62.5q-1.8-5.7,4.5-3.5L57,60Zm1,1v3l-5-2q-4-1-3,2,4,3,11,3l1-3,3,2q3,1,2-1Q64,59,58,59Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_14"
                      data-name="rgba(254,254,254,1)"
                      d="M104.5,62,109,73.5V77q-6.9,1-10-1Zm.5,4-4,9,6,1Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_15"
                      data-name="rgba(254,254,254,1)"
                      d="M83.5,63,86,64.5,82.5,70l-3,2-2-1-2,4-5,3L66,76.5Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_16"
                      data-name="rgba(254,254,254,1)"
                      d="M130.5,71l.5,15.5h-1Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_17"
                      data-name="rgba(254,254,254,1)"
                      d="M111,73l2,.5-1,1v10l1,1v12h-1Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_18"
                      data-name="rgba(254,254,254,1)"
                      d="M.5,75Q.3,81.2,4,83.5v13l6,20v4A28.687,28.687,0,0,0,20.5,135L31,138q-1,3.8,1.5,5,12.1,1.6,20-1l3.5,1-1.5-3-6.5-.5,7.5-.5q2.5,1.2,1.5,5H31.5L30,142.5,28.5,139,20,137v-2H17v-2q-2.7,1.1-2-1.5l-5-6v-4l-4-11v-5l-3-6v-15Q-1.6,82,.5,75Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_19"
                      data-name="rgba(254,254,254,1)"
                      d="M97.5,78l9,2,2.5-1-.5,11-.5-9q-6.7,1.4-9.5-2l-5,7-3,2-6,4h-4Q75.2,89.1,76,82l-7.5,3-2-3L64,86l-4,1.5,2,.5v2.5l7,12,1,6.5h4q-1.2-3,2.5-2a8.692,8.692,0,0,0,4.5-7l4,1.5v4L83,109q-3-1-2,2H78.5L70,116.5l-1,6L66,128H64q1.1,2.7-1.5,2l-8,5h-3L40,139.5l4,1-9.5.5-1-2a84.332,84.332,0,0,0,24-7l8.5-7.5,3-6V114l8.5-3,4.5-3.5,2-5-3-.5q.8,4.7-3.5,6l-8,4L68,103.5l-9-17L66.5,80q.5,3.5,5,3l4-3L79,88.5,81.5,91q9-2.5,13.5-9.5Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_20"
                      data-name="rgba(254,254,254,1)"
                      d="M13.5,81q3.8-.7,4.5,1.5l2,9,12,27,2,8q-1.2,3.8-7.5,2.5L21,126v-2q-2.7,1.1-2-1.5l-5-11v-4l-5-19Zm.5,2-4,7,5,15v5l3,7q-1,3,2,2v3l8,6h3l1-2-5-14-3-4L17,85Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_21"
                      data-name="rgba(254,254,254,1)"
                      d="M129.5,88l.5,5.5-6,14-7,9.5q-3.7,1.3-2-4.5-3-4-2-12h1l2.5,13.5,6.5-7.5,5-10Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_22"
                      data-name="rgba(254,254,254,1)"
                      d="M99,91l2,.5-1,5,3,7-2,3,5.5,3.5.5-2.5-5-13,2.5-.5,5.5,3.5,1,11h-1L109,97l-5-1,5,11.5V111h-4.5L99,106.5l2-5Q97.4,98.4,99,91Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_254_254_254_1_23"
                      data-name="rgba(254,254,254,1)"
                      d="M104.5,91q3.8-.7,4.5,1.5l-2.5.5Z"
                      fill="#fefefe"
                    />
                    <path
                      id="rgba_255_255_255_1_"
                      data-name="rgba(255,255,255,1)"
                      d="M140.5,0q2.6-.8,1.5,2.5l21,62v4l-14,28,8,17L128.5,144h-71l-.5-3.5q-1.7-3.2-8.5-1.5-1.7,2.8-8,1v-1l14-4,9.5-5v-2q2.7,1.1,2-1.5,4-3,4-10l2.5-2.5h3q1.2-3.8,5.5-3v-2q2.7,1.1,2-1.5,3-1,2-6L81,100a8.4,8.4,0,0,1-4.5,7q-3.7-1-2.5,2H70l-1-6.5-7-12V88l-2-.5L64,86l2.5-4,2,3L76,82q-.8,7.1,4.5,10h4L92,88q-1.1-2.7,1.5-2l5-7q2.8,3.4,9.5,2l1,10.5-1.5-.5H99v7.5l2,4-2,4,5.5,4.5H109v-3.5L104,96l5,1q-.9,7.6,2,12.5v7l2,4.5,6.5,1a32.235,32.235,0,0,0,14-8h3q2.3,3.2,9,2l2-1,4,2q2.3-.7,1.5-4.5l-2-3.5-9.5,2-1-2,3.5-2.5,5-12v-11a25.561,25.561,0,0,0,9-13v-11q-2.6-1.4-2-6l-3-3v-4l-2-3v-5l-2-4L144,10h-3.5L125,25.5q-1,7,4,8l-1.5.5-8-4-21-1q-4.7,1.2-3.5,8.5l4,11L97.5,48h-7L78,53.5q-3,3-2,10L74.5,65,62,74.5l1,4L57.5,82,54,76q-2.7,1.1-2-1.5L44.5,66q-5.5-4.5-17-3l-3,2-9,2L7,74.5,5.5,78Q3.1,75.9,4,70.5L8.5,64l4,1L22,56.5q-.7-2.6,2-1.5V53q3.7,1.5,3-1.5l10-9L36,37q-2.7,1.1-2-1.5-1.6-3-7-1.5,1.1,2.7-1.5,2-2.6-3.4-10-2L8,39.5q-2.7,3.3-2,10l2,4Q4,54.9,5,60q-2.7-1.1-2,1.5L.5,66,0,25l44.5-8h5l6-2,11-1,6-2,11-1,6-2,11-1,6-2,11-1,6-2,11-1ZM70,34l-2,2,3,10q1,2,5,1,1-7-3-9Q75,32,70,34Zm12,3-1,5v4h5V37ZM55,44v4l10,7h2l2,3h4V53l-4-1-3-4-6-4Zm2,14v2l-3-1q-7-2-5,4l11,4h2l1-2h6V62l-7-4Z"
                      fill="#fff"
                    />
                    <path
                      id="rgba_255_255_255_1_2"
                      data-name="rgba(255,255,255,1)"
                      d="M139.5,18l1,2Q137.7,20.7,139.5,18Z"
                      fill="#fff"
                    />
                    <path
                      id="rgba_255_255_255_1_3"
                      data-name="rgba(255,255,255,1)"
                      d="M100.5,36l5,3H109q-1.1,2.7,1.5,2l4.5,3.5L125,62q2.7-1.1,2,1.5l3,7v17q-2.6,2.9-2,9l-5,10-6.5,7.5L113,99.5,112,74q8,1.7,11-2.5l1-6q-3-1.2-2-5.5l-5.5-1-7,3L106,57.5l-4-14v-4Z"
                      fill="#fff"
                    />
                    <path
                      id="rgba_255_255_255_1_4"
                      data-name="rgba(255,255,255,1)"
                      d="M144.5,50q2.3-.7,1.5,1.5l3,1.5,4,8.5v7L150.5,74,149,58.5Z"
                      fill="#fff"
                    />
                    <path
                      id="rgba_255_255_255_1_5"
                      data-name="rgba(255,255,255,1)"
                      d="M91.5,53q4.4-1.5,3.5,1.5l5,9Q95.4,77.9,84.5,86q-3.3,1.1-2.5-1.5l-2-6L90,72l2-3.5v-3L85.5,58l-4,1,2-3Z"
                      fill="#fff"
                    />
                    <path
                      id="rgba_255_255_255_1_6"
                      data-name="rgba(255,255,255,1)"
                      d="M83.5,65l.5,2-4.5,2,2-3Z"
                      fill="#fff"
                    />
                    <path
                      id="rgba_255_255_255_1_7"
                      data-name="rgba(255,255,255,1)"
                      d="M104.5,66,107,76l-6-1.5Z"
                      fill="#fff"
                    />
                    <path
                      id="rgba_255_255_255_1_8"
                      data-name="rgba(255,255,255,1)"
                      d="M73.5,72q2.6-.7,1.5,2l-5.5,2V75Z"
                      fill="#fff"
                    />
                    <path
                      id="rgba_255_255_255_1_9"
                      data-name="rgba(255,255,255,1)"
                      d="M.5,81,3,84.5v15l3,6,2,13q2.8,1.7,2,7l5,7.5q3-1,2,2h3v2h2.5l7.5,3.5,1,3L0,144Z"
                      fill="#fff"
                    />
                    <path
                      id="rgba_255_255_255_1_10"
                      data-name="rgba(255,255,255,1)"
                      d="M13.5,83,17,84.5l7,23,3,4,5,14L31,128H27.5L20,121.5V119q-3,1.3-2-2.5l-3-7v-5l-5-15Z"
                      fill="#fff"
                    />
                    <path
                      id="rgba_231_230_226_1_"
                      data-name="rgba(231,230,226,1)"
                      d="M143.5,15l.5,2.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_2"
                      data-name="rgba(231,230,226,1)"
                      d="M135.5,17l-9,10Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_3"
                      data-name="rgba(231,230,226,1)"
                      d="M139.5,21l1.5.5L135.5,26Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_4"
                      data-name="rgba(231,230,226,1)"
                      d="M145.5,23l.5,2.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_5"
                      data-name="rgba(231,230,226,1)"
                      d="M139.5,24l1.5,6.5h-1q.8-2.2-1.5-1.5L137,26.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_6"
                      data-name="rgba(231,230,226,1)"
                      d="M130.5,25l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_7"
                      data-name="rgba(231,230,226,1)"
                      d="M131.5,27l6.5,5.5-1-2,2,1L136.5,35,134,33.5l1-2-1.5.5L131,30.5l1-2h-2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_8"
                      data-name="rgba(231,230,226,1)"
                      d="M144.5,28l.5,2.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_9"
                      data-name="rgba(231,230,226,1)"
                      d="M109.5,30l4.5.5-4.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_10"
                      data-name="rgba(231,230,226,1)"
                      d="M128.5,30l11,12Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_11"
                      data-name="rgba(231,230,226,1)"
                      d="M147.5,31l.5,2.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_12"
                      data-name="rgba(231,230,226,1)"
                      d="M143.5,32l.5,2.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_13"
                      data-name="rgba(231,230,226,1)"
                      d="M99.5,33l.5,1.5-2,1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_14"
                      data-name="rgba(231,230,226,1)"
                      d="M139.5,34l.5,2-2.5,1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_15"
                      data-name="rgba(231,230,226,1)"
                      d="M17.5,35l2.5.5-2.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_16"
                      data-name="rgba(231,230,226,1)"
                      d="M128.5,35l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_17"
                      data-name="rgba(231,230,226,1)"
                      d="M142.5,36q3,1.5,0,3l-2,1,1-2,1.5-.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_18"
                      data-name="rgba(231,230,226,1)"
                      d="M146.5,36l.5,2.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_19"
                      data-name="rgba(231,230,226,1)"
                      d="M12.5,37l-3,4Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_20"
                      data-name="rgba(231,230,226,1)"
                      d="M30.5,37l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_21"
                      data-name="rgba(231,230,226,1)"
                      d="M97.5,37l.5,2.5H97Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_22"
                      data-name="rgba(231,230,226,1)"
                      d="M131.5,37l7,8Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_23"
                      data-name="rgba(231,230,226,1)"
                      d="M14.5,38l1.5.5L13.5,40Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_24"
                      data-name="rgba(231,230,226,1)"
                      d="M28.5,38l-2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_25"
                      data-name="rgba(231,230,226,1)"
                      d="M33.5,38,36,41.5l-2,1,1-2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_26"
                      data-name="rgba(231,230,226,1)"
                      d="M109.5,38l3.5,2.5L110.5,39Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_27"
                      data-name="rgba(231,230,226,1)"
                      d="M29,40l2.5,1,1.5-.5L30.5,44l.5-1.5L30.5,41l-1.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_28"
                      data-name="rgba(231,230,226,1)"
                      d="M145.5,40q3.3-1.1,2.5,1.5l-3,2,1.5-2.5-3,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_29"
                      data-name="rgba(231,230,226,1)"
                      d="M11.5,41l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_30"
                      data-name="rgba(231,230,226,1)"
                      d="M14.5,41l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_31"
                      data-name="rgba(231,230,226,1)"
                      d="M73.5,41,75,43.5H74Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_32"
                      data-name="rgba(231,230,226,1)"
                      d="M114.5,41l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_33"
                      data-name="rgba(231,230,226,1)"
                      d="M16.5,42q4.4-1.5,3.5,1.5L15.5,49q-3.4.9-1.5-4.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_34"
                      data-name="rgba(231,230,226,1)"
                      d="M84.5,42l.5,3-2-.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_35"
                      data-name="rgba(231,230,226,1)"
                      d="M150.5,43l.5,2.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_36"
                      data-name="rgba(231,230,226,1)"
                      d="M25.5,44l2,1,1.5-.5L26.5,46,25,45.5l1,2L24.5,47l-1.5.5.5,1.5L22,48.5l1,2L20.5,52l-2-3,3,2L21,49.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_37"
                      data-name="rgba(231,230,226,1)"
                      d="M32.5,44l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_38"
                      data-name="rgba(231,230,226,1)"
                      d="M116.5,44l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_39"
                      data-name="rgba(231,230,226,1)"
                      d="M147.5,44l1.5.5L146.5,46Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_40"
                      data-name="rgba(231,230,226,1)"
                      d="M9.5,45l.5,2.5H9Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_41"
                      data-name="rgba(231,230,226,1)"
                      d="M56.5,45,58,47.5l-2-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_42"
                      data-name="rgba(231,230,226,1)"
                      d="M58.5,45l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_43"
                      data-name="rgba(231,230,226,1)"
                      d="M139.5,46l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_44"
                      data-name="rgba(231,230,226,1)"
                      d="M27.5,48l-4,5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_45"
                      data-name="rgba(231,230,226,1)"
                      d="M62.5,48l2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_46"
                      data-name="rgba(231,230,226,1)"
                      d="M60.5,49l2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_47"
                      data-name="rgba(231,230,226,1)"
                      d="M93.5,49l3.5.5-3.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_48"
                      data-name="rgba(231,230,226,1)"
                      d="M119.5,49l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_49"
                      data-name="rgba(231,230,226,1)"
                      d="M141.5,49l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_50"
                      data-name="rgba(231,230,226,1)"
                      d="M13.5,50l3,2q1.7-2.8,3.5,1.5l-3-1,1,2L15.5,56,14,55.5l1,2-2-1,3-4Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_51"
                      data-name="rgba(231,230,226,1)"
                      d="M94.5,51,97,52.5,95.5,52Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_52"
                      data-name="rgba(231,230,226,1)"
                      d="M149.5,52l2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_53"
                      data-name="rgba(231,230,226,1)"
                      d="M9.5,53l.5,1.5-4,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_54"
                      data-name="rgba(231,230,226,1)"
                      d="M68.5,53,72,55.5,71.5,57l-2-3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_55"
                      data-name="rgba(231,230,226,1)"
                      d="M102.5,55l.5,1.5-2,1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_56"
                      data-name="rgba(231,230,226,1)"
                      d="M18.5,56l-5,6Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_57"
                      data-name="rgba(231,230,226,1)"
                      d="M98.5,56l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_58"
                      data-name="rgba(231,230,226,1)"
                      d="M11.5,57,13,59.5q-1.2,2.8-2.5.5-2.2.8-1.5-1.5l3,1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_59"
                      data-name="rgba(231,230,226,1)"
                      d="M103.5,58l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_60"
                      data-name="rgba(231,230,226,1)"
                      d="M125.5,58l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_61"
                      data-name="rgba(231,230,226,1)"
                      d="M6.5,59,8,61.5,6.5,61,3,63.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_62"
                      data-name="rgba(231,230,226,1)"
                      d="M79.5,59l1,3L83,60.5q-2,4.5-4,1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_63"
                      data-name="rgba(231,230,226,1)"
                      d="M84.5,59l4,5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_64"
                      data-name="rgba(231,230,226,1)"
                      d="M50,60l3,.5-2,1,2,1-1.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_65"
                      data-name="rgba(231,230,226,1)"
                      d="M116.5,60l2.5.5-4,2,.5,1.5,3-2,2.5.5q-1.2,2.8-2.5.5l-3,2L114,62.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_66"
                      data-name="rgba(231,230,226,1)"
                      d="M103,61l2,.5L103.5,65Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_67"
                      data-name="rgba(231,230,226,1)"
                      d="M83.5,62,87,64.5l-1,2,.5,1.5-2,1,.5-1.5,1-3L83.5,63l-1.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_68"
                      data-name="rgba(231,230,226,1)"
                      d="M128.5,62l1.5,2.5-2-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_69"
                      data-name="rgba(231,230,226,1)"
                      d="M156.5,62l.5,5.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_70"
                      data-name="rgba(231,230,226,1)"
                      d="M154.5,63l.5,4.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_71"
                      data-name="rgba(231,230,226,1)"
                      d="M80.5,64l-2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_72"
                      data-name="rgba(231,230,226,1)"
                      d="M111.5,64l-.5,1.5q.7,3-3,1.5l.5-2Q110,67.5,111.5,64Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_73"
                      data-name="rgba(231,230,226,1)"
                      d="M2.5,65,2,66.5,1.5,68,1,66.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_74"
                      data-name="rgba(231,230,226,1)"
                      d="M121.5,65l1.5,3.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_75"
                      data-name="rgba(231,230,226,1)"
                      d="M43.5,67l6,7Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_76"
                      data-name="rgba(231,230,226,1)"
                      d="M73.5,67l-2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_77"
                      data-name="rgba(231,230,226,1)"
                      d="M112.5,67l2.5.5L109,70l.5-2Q111,70.5,112.5,67Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_78"
                      data-name="rgba(231,230,226,1)"
                      d="M130.5,67l.5,3.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_79"
                      data-name="rgba(231,230,226,1)"
                      d="M75.5,68l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_80"
                      data-name="rgba(231,230,226,1)"
                      d="M89.5,68l-2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_81"
                      data-name="rgba(231,230,226,1)"
                      d="M117,68q3-1,2,2Q116,71,117,68Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_82"
                      data-name="rgba(231,230,226,1)"
                      d="M2.5,70,3,75.5H2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_83"
                      data-name="rgba(231,230,226,1)"
                      d="M69.5,70l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_84"
                      data-name="rgba(231,230,226,1)"
                      d="M.5,71,1,74.5H0Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_85"
                      data-name="rgba(231,230,226,1)"
                      d="M71.5,71l-2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_86"
                      data-name="rgba(231,230,226,1)"
                      d="M78.5,71l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_87"
                      data-name="rgba(231,230,226,1)"
                      d="M85.5,71l-2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_88"
                      data-name="rgba(231,230,226,1)"
                      d="M98.5,71,98,72.5,97.5,74,97,72.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_89"
                      data-name="rgba(231,230,226,1)"
                      d="M110.5,71q2.8,1.3.5,2.5l-.5,4.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_90"
                      data-name="rgba(231,230,226,1)"
                      d="M119.5,71l-1,2-1.5-.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_91"
                      data-name="rgba(231,230,226,1)"
                      d="M11.5,72l-2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_92"
                      data-name="rgba(231,230,226,1)"
                      d="M76.5,72l2,3L77,74.5,76.5,76,76,74.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_93"
                      data-name="rgba(231,230,226,1)"
                      d="M65.5,73l-2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_94"
                      data-name="rgba(231,230,226,1)"
                      d="M113.5,73l2.5.5-2.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_95"
                      data-name="rgba(231,230,226,1)"
                      d="M152.5,73l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_96"
                      data-name="rgba(231,230,226,1)"
                      d="M67.5,74l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_97"
                      data-name="rgba(231,230,226,1)"
                      d="M74.5,75l.5,2-2.5,1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_98"
                      data-name="rgba(231,230,226,1)"
                      d="M80.5,75l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_99"
                      data-name="rgba(231,230,226,1)"
                      d="M131.5,75l.5,7.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_100"
                      data-name="rgba(231,230,226,1)"
                      d="M148.5,75l1,2,1.5-.5L148,78Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_101"
                      data-name="rgba(231,230,226,1)"
                      d="M8.5,76l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_102"
                      data-name="rgba(231,230,226,1)"
                      d="M67.5,77q4-.5,4.5,2.5L69.5,78Q66.5,78.5,67.5,77Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_103"
                      data-name="rgba(231,230,226,1)"
                      d="M97.5,77l1.5.5L96.5,79Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_104"
                      data-name="rgba(231,230,226,1)"
                      d="M104.5,77l2.5.5-2.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_105"
                      data-name="rgba(231,230,226,1)"
                      d="M152.5,77l-4,5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_106"
                      data-name="rgba(231,230,226,1)"
                      d="M52.5,78l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_107"
                      data-name="rgba(231,230,226,1)"
                      d="M75.5,79q2.6-.8,1.5,2.5H76L75.5,80l-4,3,2-3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_108"
                      data-name="rgba(231,230,226,1)"
                      d="M93.5,79l-3,4Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_109"
                      data-name="rgba(231,230,226,1)"
                      d="M104.5,79l2.5.5-2.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_110"
                      data-name="rgba(231,230,226,1)"
                      d="M4.5,80l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_111"
                      data-name="rgba(231,230,226,1)"
                      d="M2.5,81,5,84.5H4Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_112"
                      data-name="rgba(231,230,226,1)"
                      d="M54.5,81l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_113"
                      data-name="rgba(231,230,226,1)"
                      d="M94.5,81l-6,7Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_114"
                      data-name="rgba(231,230,226,1)"
                      d="M60.5,82l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_115"
                      data-name="rgba(231,230,226,1)"
                      d="M62.5,83l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_116"
                      data-name="rgba(231,230,226,1)"
                      d="M147.5,83l.5,6.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_117"
                      data-name="rgba(231,230,226,1)"
                      d="M59.5,85,59,86.5,58.5,88,58,86.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_118"
                      data-name="rgba(231,230,226,1)"
                      d="M109.5,85l.5,9-2-.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_119"
                      data-name="rgba(231,230,226,1)"
                      d="M80.5,86l2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_120"
                      data-name="rgba(231,230,226,1)"
                      d="M130.5,87l.5,4.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_121"
                      data-name="rgba(231,230,226,1)"
                      d="M79.5,88,83,90.5l-1.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_122"
                      data-name="rgba(231,230,226,1)"
                      d="M86.5,88l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_123"
                      data-name="rgba(231,230,226,1)"
                      d="M59.5,89l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_124"
                      data-name="rgba(231,230,226,1)"
                      d="M111.5,90l.5,2.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_125"
                      data-name="rgba(231,230,226,1)"
                      d="M9.5,91l.5,2.5H9Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_126"
                      data-name="rgba(231,230,226,1)"
                      d="M101.5,91l2.5.5L100.5,93Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_127"
                      data-name="rgba(231,230,226,1)"
                      d="M110.5,98l.5,2.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_128"
                      data-name="rgba(231,230,226,1)"
                      d="M112.5,98l.5,4.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_129"
                      data-name="rgba(231,230,226,1)"
                      d="M144.5,102l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_130"
                      data-name="rgba(231,230,226,1)"
                      d="M102.5,104q2.3-.7,1.5,1.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_131"
                      data-name="rgba(231,230,226,1)"
                      d="M125.5,104l.5,1.5-2,1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_132"
                      data-name="rgba(231,230,226,1)"
                      d="M80.5,105l-2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_133"
                      data-name="rgba(231,230,226,1)"
                      d="M111.5,105l.5,4.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_134"
                      data-name="rgba(231,230,226,1)"
                      d="M101.5,106l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_135"
                      data-name="rgba(231,230,226,1)"
                      d="M81.5,107l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_136"
                      data-name="rgba(231,230,226,1)"
                      d="M123.5,108l-2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_137"
                      data-name="rgba(231,230,226,1)"
                      d="M78.5,109l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_138"
                      data-name="rgba(231,230,226,1)"
                      d="M137.5,109l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_139"
                      data-name="rgba(231,230,226,1)"
                      d="M8.5,110l.5,2.5H8Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_140"
                      data-name="rgba(231,230,226,1)"
                      d="M134.5,111l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_141"
                      data-name="rgba(231,230,226,1)"
                      d="M136.5,111l2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_142"
                      data-name="rgba(231,230,226,1)"
                      d="M112.5,112l.5,2.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_143"
                      data-name="rgba(231,230,226,1)"
                      d="M114.5,112l.5,2.5h-1Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_144"
                      data-name="rgba(231,230,226,1)"
                      d="M120.5,112l-2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_145"
                      data-name="rgba(231,230,226,1)"
                      d="M140.5,112l3.5.5-3.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_146"
                      data-name="rgba(231,230,226,1)"
                      d="M69.5,113l2.5.5-2.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_147"
                      data-name="rgba(231,230,226,1)"
                      d="M140.5,114l3.5.5-3.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_148"
                      data-name="rgba(231,230,226,1)"
                      d="M149.5,114l2.5.5Q149.9,117.8,149.5,114Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_149"
                      data-name="rgba(231,230,226,1)"
                      d="M68.5,116l.5,2.5H68Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_150"
                      data-name="rgba(231,230,226,1)"
                      d="M126.5,116l-1,2-1.5-.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_151"
                      data-name="rgba(231,230,226,1)"
                      d="M10.5,118l.5,2.5H10Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_152"
                      data-name="rgba(231,230,226,1)"
                      d="M122.5,118l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_153"
                      data-name="rgba(231,230,226,1)"
                      d="M116.5,120l3.5.5-3.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_154"
                      data-name="rgba(231,230,226,1)"
                      d="M65.5,124l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_155"
                      data-name="rgba(231,230,226,1)"
                      d="M22.5,126l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_156"
                      data-name="rgba(231,230,226,1)"
                      d="M33.5,127l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_157"
                      data-name="rgba(231,230,226,1)"
                      d="M14.5,128l1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_158"
                      data-name="rgba(231,230,226,1)"
                      d="M61.5,128l-1,2Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_159"
                      data-name="rgba(231,230,226,1)"
                      d="M28.5,129l2.5.5-2.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_160"
                      data-name="rgba(231,230,226,1)"
                      d="M18.5,132l2,3Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_161"
                      data-name="rgba(231,230,226,1)"
                      d="M33.5,138l2.5.5-2.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_162"
                      data-name="rgba(231,230,226,1)"
                      d="M44.5,140l6.5.5-6.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_163"
                      data-name="rgba(231,230,226,1)"
                      d="M31.5,141l2.5,1.5-1.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_231_230_226_1_164"
                      data-name="rgba(231,230,226,1)"
                      d="M46.5,142l2.5.5-2.5.5Z"
                      fill="#e7e6e2"
                    />
                    <path
                      id="rgba_104_100_91_1_"
                      data-name="rgba(104,100,91,1)"
                      d="M141.5,11,145,21.5l6,28,5,11v9a27,27,0,0,1-9,14v11l-2,7-6.5,7.5-1.5.5q.8,4.3,6.5,3.5,2-2.8,6.5-2l1,3.5-2.5-1.5-9,1q-.5-3.5-5-3l-14,9h-5l-2.5-3.5-2-18L110,96l-7.5-3-.5,3.5,5,12-1.5.5-4.5-3.5,1.5-.5,1.5.5-4-12q.8-2.2,4.5-1.5l5.5,2-1-15q-7.2,1-11.5-2l-10,11q-1.4,2.6-6,2Q76,87,77,79l-7.5,4q-3-6-6,0L58,86.5l10,18,1,7.5a18.454,18.454,0,0,0,12-6.5l1.5-3.5.5,2.5L79.5,109l-7,4H69q-.3,9.8-6.5,15l-6,4-11,4L33,138l.5,3h17l3-1,2.5,1.5q-1.2,2.8-2.5.5l-19,1L31,140.5q1.1-3.3-1.5-2.5-8.6-1.9-13.5-7.5l-4-6-3-10v-4l-5-16v-9l1-2q-5.8-3.7-4-15L6.5,61,7,62.5Q1.5,66,2,75.5L5.5,82a24.126,24.126,0,0,1,8-11l5-3,15-4Q45.1,65.9,50,74.5L56,85l9-5-1-4.5,13-11L79,54l11.5-4h6L103,60.5v5l-4,10,1.5,1.5,6,1,2.5-1-1-8.5-4-8-6-19-1-8L98,31q3-2,10.5-1,1.7,2.8,8,1l11,4L139,45.5l8,14,2,8v7l-1,4,3-2q4.2-4.3,4-13l-3-9-10-10V43q-2.7,1.1-2-1.5l-14-14,10-10,4-5Zm-.5,4L131,25l1,1-1,2,1,2,3,2q-1,2,2,1,1,2,2,0l-4-6,6-5,3,15-3-3-3,2,3,2q-1,2,2,1l2,3,2-1-1,2,1,2h2l-7-28Zm-1,9-3,4,4,3Zm-38,7-3,1-1,3,4,16,7,19,12-5q2,1,1,5-2,4-9,3l-3-1,2,31,1,1,1,11,3,4,7-2,11-7-3-5,6,3,6-7,2-18-2,1h-4l7-4q2-26-12-36,1-3-2-2V40l-13-7Zm47,15-1,3h2ZM95,51,83,54q-5,2-4,9l6-3,6,8L78,78l2,9,3,2,4-2q10-8,15-22L97,53ZM84,62,68,74l-2,3,5,2,3-2q2,1,1-1h2l1-2-1-2,3,1V72h2V71l5-3-1-1,1-2ZM29,66,15,72Q7,77,5,89l6,29,5,11q5,6,16,8l2-4h1l-1,4,8-1,19-8a27.287,27.287,0,0,0,7-13v-5l-2-6L49,76A22.816,22.816,0,0,0,38,66Z"
                      fill="#68645b"
                    />
                    <path
                      id="rgba_104_100_91_1_2"
                      data-name="rgba(104,100,91,1)"
                      d="M100.5,33q12.3,2.7,18.5,11.5l12,19,2,8v15l-2,10-5,11-8.5,9.5-.5-2,4-2.5,8-14,2-7,1-16-3-13L114.5,41q-5.4-5.3-14.5-6ZM117,68q-1,3,2,2Q120,67,117,68Zm-2,1,1,2Q117,68,115,69Z"
                      fill="#68645b"
                    />
                    <path
                      id="rgba_104_100_91_1_3"
                      data-name="rgba(104,100,91,1)"
                      d="M29.5,35,33,37.5l2,4L11.5,63,6,58.5l4-5q-3-3-2-10L13.5,37l8-1,5,2ZM19,37l-4,1L9,46l3,8-1,2,1,2V57h2l2-3q2,1,1-1,2-2,0-3l-2,1-3-4,1-3,5-4,5,2-5,7,2,2V50h2V49l3-2,1-2-1-3,3,1,3-2v2l2-1-2-5-4,3Zm-2,5-3,3q-2,5,2,4l4-5Q21,41,17,42ZM10,58q-2,3,1,2Z"
                      fill="#68645b"
                    />
                    <path
                      id="rgba_104_100_91_1_4"
                      data-name="rgba(104,100,91,1)"
                      d="M70.5,36,75,44.5,73,45l-3-6.5Z"
                      fill="#68645b"
                    />
                    <path
                      id="rgba_104_100_91_1_5"
                      data-name="rgba(104,100,91,1)"
                      d="M83,39q3-1.2,2,2.5L83.5,44Z"
                      fill="#68645b"
                    />
                    <path
                      id="rgba_104_100_91_1_6"
                      data-name="rgba(104,100,91,1)"
                      d="M57.5,45,66,51l-.5,2L57,46.5Z"
                      fill="#68645b"
                    />
                    <path
                      id="rgba_104_100_91_1_7"
                      data-name="rgba(104,100,91,1)"
                      d="M68.5,54,71,55.5,70.5,57Z"
                      fill="#68645b"
                    />
                    <path
                      id="rgba_104_100_91_1_8"
                      data-name="rgba(104,100,91,1)"
                      d="M58,59l9,3-.5,2-6-2,.5,1.5q.8,2.3-1.5,1.5L51,61.5l3.5-.5,4,2,.5-1.5Z"
                      fill="#68645b"
                    />
                    <path
                      id="rgba_104_100_91_1_9"
                      data-name="rgba(104,100,91,1)"
                      d="M116.5,61q4.4-1.5,3.5,1.5l-1.5-.5-6,3-1-1L109,65.5l1.5-2.5,4,1Z"
                      fill="#68645b"
                    />
                    <path
                      id="rgba_104_100_91_1_10"
                      data-name="rgba(104,100,91,1)"
                      d="M40.5,79l1.5.5L41,84q-3.4.8-4.5-2L34,83.5,35,87l-2.5,1-3-3-1,1L27,85.5Z"
                      fill="#68645b"
                    />
                    <path
                      id="rgba_104_100_91_1_11"
                      data-name="rgba(104,100,91,1)"
                      d="M40.5,86l2.5.5L37.5,90Z"
                      fill="#68645b"
                    />
                  </g>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Veldslag
                </h3>
                <div class="mt-2" />
              </div>
            </div>
            <div class="relative mt-5 sm:mt-6">
              <Transition
                bind:toggle={toggleRound}
                inTransition="ease-out duration-300"
                inState="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                onState="opacity-100 translate-y-0 sm:scale-100"
                outTransition="ease-in duration-200"
                outState="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <svg
                  class="absolute max-w-full left-1/2 transform -translate-x-1/2 mx-auto mt-14 mb-16"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="274.103"
                  height="29.158"
                  viewBox="0 0 274.103 29.158"
                >
                  <defs>
                    <linearGradient
                      id="linear-gradient1"
                      x1="0.5"
                      x2="0.5"
                      y2="1"
                      gradientUnits="objectBoundingBox"
                    >
                      <stop offset="0" stop-color="#fff" />
                      <stop offset="1" stop-color="#555836" />
                    </linearGradient>
                  </defs>
                  <path
                    id="Path_126"
                    data-name="Path 126"
                    d="M28.554-30.4l11.217-6.7V-43.46H2.624v25.736h11.12V-37.1h14.81ZM42.879-17.724H82.406V-43.46H42.879ZM71.286-37.147v13.062H54.048V-37.147ZM113.92-43.46v19.375H96.682V-43.46H85.514v25.736H125.04V-43.46ZM176.27-17.329h0V-43.46H165.15V-28.5L142.813-43.46H128.148v25.736h18.7l3.18-6.264H139.268V-35.594L166.516-17.5Zm3.108-.4h32.437a8.848,8.848,0,0,0,3.5-.607,6.2,6.2,0,0,0,2.258-1.578,5.89,5.89,0,0,0,1.214-2.137,7.627,7.627,0,0,0,.364-2.282V-36.9a5.373,5.373,0,0,0-.68-2.671,6.944,6.944,0,0,0-1.748-2.064,8.584,8.584,0,0,0-2.379-1.335,7.258,7.258,0,0,0-2.525-.486H179.377Zm11.168-6.361V-37.147h16.9a3.3,3.3,0,0,0,.364.51.756.756,0,0,1,.17.413v11.168a1.474,1.474,0,0,1-.583.971Zm83.181,6.361H262.558V-37.147h-5.341a14.636,14.636,0,0,1-.437-1.675q-.194-.947-.34-1.87t-.243-1.675q-.1-.753-.146-1.093h17.675Z"
                    transform="translate(-1.124 44.96)"
                    stroke="red"
                    stroke-width="3"
                    fill="url(#linear-gradient1)"
                  />
                </svg>
              </Transition>

              <Transition
                bind:toggle={toggleReady}
                inTransition="ease-out duration-300"
                inState="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                onState="opacity-100 translate-y-0 sm:scale-100"
                outTransition="ease-in duration-200"
                outState="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <svg
                  class="absolute max-w-full  left-1/2 transform -translate-x-1/2 mx-auto mt-40 mb-10"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="254.644"
                  height="32.741"
                  viewBox="0 0 254.644 32.741"
                >
                  <defs>
                    <linearGradient
                      id="linear-gradient2"
                      x1="0.5"
                      x2="0.5"
                      y2="1"
                      gradientUnits="objectBoundingBox"
                    >
                      <stop offset="0" stop-color="#e8b780" />
                      <stop offset="1" stop-color="#ff8700" />
                    </linearGradient>
                  </defs>
                  <path
                    id="Path_127"
                    data-name="Path 127"
                    d="M28.239-30.556l11.081-6.62V-43.46H2.624v25.423H13.609V-37.176h14.63ZM42.39-18.037H75.153a4.275,4.275,0,0,0,1.511-.767q1.175-.768,2.542-1.8t2.638-2.087A14.67,14.67,0,0,0,83.6-24.321H53.423v-3.358h28.11v-6.284H53.423v-3.262h29.4a11.932,11.932,0,0,0,.408-1.655q.168-.935.312-1.847t.24-1.655a8.147,8.147,0,0,1,.192-1.079H42.39ZM86.569-43.46v25.423H97.6v-8.97h16.837v8.97h11.033V-43.46Zm27.87,6.236v3.933H97.6v-3.933Zm14.1,19.187h32.043a8.741,8.741,0,0,0,3.454-.6,6.126,6.126,0,0,0,2.231-1.559,5.819,5.819,0,0,0,1.2-2.111,7.534,7.534,0,0,0,.36-2.255V-36.984a5.308,5.308,0,0,0-.672-2.638,6.86,6.86,0,0,0-1.727-2.039,8.48,8.48,0,0,0-2.35-1.319,7.17,7.17,0,0,0-2.494-.48H128.542Zm11.033-6.284v-12.9h16.693a3.262,3.262,0,0,0,.36.5.747.747,0,0,1,.168.408V-25.28a1.456,1.456,0,0,1-.576.959Zm60.632,10.6V-27.678h10.985V-43.46H200.207v9.5H181.883v-9.5H170.9v15.782h18.276v3.646H177.23l1.583,1.2q1.3.72,3,1.679t3.55,1.967l3.646,1.991q1.8.983,3.214,1.751t2.326,1.247a10.584,10.584,0,0,0,.959.48Zm21.3-20.1h21.73v-3.358H213.063a14.669,14.669,0,0,1,1.751-1.631q1.271-1.055,2.638-2.087t2.542-1.8a4.276,4.276,0,0,1,1.511-.768h32.763v15.878H221.505ZM232.49-18.037H221.505v-6.284H232.49Z"
                    transform="translate(-1.124 44.96)"
                    stroke="red"
                    stroke-width="3"
                    fill="url(#linear-gradient2)"
                  />
                </svg>
              </Transition>
              <div class="bg-gray-100 invisible">
                <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <div class="max-w-none mx-auto">
                    <div
                      class="quiz-container bg-white overflow-hidden sm:rounded-lg sm:shadow"
                    >
                      <div
                        class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6"
                      >
                        <div
                          class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap"
                        >
                          <div class="mt-4 mr-10">Weet jij het antwoord?</div>
                          <div class="base-timer">
                            <svg
                              class="base-timer__svg"
                              viewBox="0 0 100 100"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g class="base-timer__circle">
                                <circle
                                  class="base-timer__path-elapsed"
                                  cx="50"
                                  cy="50"
                                  r="45"
                                />
                                <path
                                  id="base-timer-path-remaining-not-set"
                                  stroke-dasharray="283"
                                  class="base-timer__path-remaining "
                                  class:text-green-500={timer >= 15}
                                  class:text-yellow-700={timer >= 5 &&
                                    timer < 15}
                                  class:text-red-800={timer < 5}
                                  d="
                                  M 50, 50
                                  m -45, 0
                                  a 45,45 0 1,0 90,0
                                  a 45,45 0 1,0 -90,0
                                "
                                />
                              </g>
                            </svg>
                            <span
                              id="base-timer-label"
                              class="base-timer__label"
                            >
                              {timer}
                            </span>
                          </div>
                        </div>
                      </div>

                      <RadioQuestion bind:quiz />

                      <div class="mr-2 mb-2 float-right">
                        <Button
                          on:click={() => (quiz = checkCorrectAnswer(quiz))}
                          disabled={quiz.selectedAnswer === null}
                          dataTest="attack_v2"
                          color="primary"
                          content="Aanvallen"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Transition
                bind:toggle={toggleQuiz}
                inTransition="ease-out duration-300"
                inState="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                onState="opacity-100 translate-y-0 sm:scale-100"
                outTransition="ease-in duration-200"
                outState="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <!-- BEGIN QUIZZES -->
                <div class="absolute inset-0 bg-gray-100">
                  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div class="max-w-none mx-auto">
                      <div
                        class="quiz-container bg-white overflow-hidden sm:rounded-lg sm:shadow"
                      >
                        <div
                          class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6"
                        >
                          <div
                            class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap"
                          >
                            <div class="mt-4 mr-10">{$t("do-you-know-the-answer")}</div>
                            <div class="mt-4 base-timer">
                              <svg
                                class="base-timer__svg"
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g class="base-timer__circle">
                                  <circle
                                    class="base-timer__path-elapsed"
                                    cx="50"
                                    cy="50"
                                    r="45"
                                  />
                                  <path
                                    id="base-timer-path-remaining"
                                    stroke-dasharray="283"
                                    class="base-timer__path-remaining "
                                    class:text-green-500={timer >= 15}
                                    class:text-yellow-700={timer >= 5 &&
                                      timer < 15}
                                    class:text-red-800={timer < 5}
                                    d="
                                    M 50, 50
                                    m -45, 0
                                    a 45,45 0 1,0 90,0
                                    a 45,45 0 1,0 -90,0
                                  "
                                  />
                                </g>
                              </svg>
                              <span
                                id="base-timer-label"
                                class="base-timer__label"
                              >
                                {timer}
                              </span>
                            </div>
                          </div>
                        </div>
                        <RadioQuestion bind:quiz />
                        <div class="mr-2 mb-2 float-right">
                          <Button
                            on:click={() => (quiz = checkCorrectAnswer(quiz))}
                            disabled={quiz.selectedAnswer === null}
                            dataTest="attack_v1"
                            color="primary"
                            content={$t("attack")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
              <Transition
                bind:toggle={toggleResultScreen}
                inTransition="ease-out duration-300"
                inState="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                onState="opacity-100 translate-y-0 sm:scale-100"
                outTransition="ease-in duration-200"
                outState="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div class="absolute inset-0">
                  {#if quiz.correct == true}
                    <div class="text-5xl" data-test="won">{$t("enemy-defeated")}</div>
                    <svg
                      class="mx-auto max-w-xl"
                      xmlns="http://www.w3.org/2000/svg"
                      width="168"
                      height="375"
                      viewBox="0 0 168 375"
                    >
                      <g
                        id="Group_205"
                        data-name="Group 205"
                        transform="translate(-440.146 -1932.729)"
                      >
                        <g
                          id="Mask_Group_1"
                          data-name="Mask Group 1"
                          transform="translate(440.146 1932.729)"
                        >
                          <g
                            id="Sizing_Rectangle"
                            data-name="Sizing Rectangle"
                            fill="rgba(0,0,0,0)"
                            stroke="rgba(0,0,0,0)"
                            stroke-width="1"
                          >
                            <rect
                              width="167.71"
                              height="374.55"
                              stroke="none"
                            />
                            <rect
                              x="0.5"
                              y="0.5"
                              width="166.71"
                              height="373.55"
                              fill="none"
                            />
                          </g>
                          <path
                            id="rgba_4_3_0_0.71_"
                            data-name="rgba(4,3,0,0.71)"
                            d="M71.5,36Q96.8,33.7,105,48.5L120,76l15,5.5,3,17-3,10,3,21L124.5,152q-20.9,14.1-56,14L42,150.5l-8-15-8-59Q29.1,56.6,42.5,47ZM79,38,44,50Q31,59,29,79l8,55,9,17,23,12q32,2,51-11,12-8,15-24l-3-19-8,7-3,8,3,9-4,3-1-32-17,13-3-1,21-15,3,13,8-9L101,49Zm44,42,8,19,3,1,1-3-4-15Z"
                            fill="rgba(4,3,0,0.71)"
                          />
                          <path
                            id="rgba_4_3_0_0.71_2"
                            data-name="rgba(4,3,0,0.71)"
                            d="M88.5,68,91,70l-4,1,1,4.5L87,78l-6-1.5L79.5,73,72,75.5l1,4L67.5,82,66,77l-4-3Z"
                            fill="rgba(4,3,0,0.71)"
                          />
                          <path
                            id="rgba_4_3_0_0.71_3"
                            data-name="rgba(4,3,0,0.71)"
                            d="M81.5,83,89,85,73,88l1.5-3Z"
                            fill="rgba(4,3,0,0.71)"
                          />
                          <path
                            id="rgba_4_3_0_0.71_4"
                            data-name="rgba(4,3,0,0.71)"
                            d="M59.5,108l.5,3.5-4,22,4,6.5,13.5,3L91,132.5,89.5,120l-17,14,4-7,15-9,2.5,9.5L93,147l3,1.5L90,153l1-14.5-2.5-.5-22,7L59,142l-6-15.5Z"
                            fill="rgba(4,3,0,0.71)"
                          />
                          <path
                            id="rgba_4_3_0_0.71_5"
                            data-name="rgba(4,3,0,0.71)"
                            d="M130.5,157l1.5,2.5Q108.2,177.2,66.5,177L49,168.5l1.5-2.5,5,3q10.1,6.9,30,4Z"
                            fill="rgba(4,3,0,0.71)"
                          />
                          <path
                            id="rgba_4_3_0_0.71_6"
                            data-name="rgba(4,3,0,0.71)"
                            d="M101.5,180l2.5,1.5.5,1.5q-12.3,8.7-36,6L64,186.5l3.5-2.5,16,2Z"
                            fill="rgba(4,3,0,0.71)"
                          />
                          <path
                            id="rgba_4_3_0_0.71_7"
                            data-name="rgba(4,3,0,0.71)"
                            d="M81,199l3,3.5L83,336l-19,.5L72,349l-14,3,7,11-2-1.5L59,359l-6-7.5,1-2.5,13-2-8-14,22-1.5Z"
                            fill="rgba(4,3,0,0.71)"
                          />
                          <path
                            id="rgba_4_3_0_0.71_8"
                            data-name="rgba(4,3,0,0.71)"
                            d="M108.5,222l2.5,8-4-1.5Z"
                            fill="rgba(4,3,0,0.71)"
                          />
                          <path
                            id="rgba_4_3_0_0.71_9"
                            data-name="rgba(4,3,0,0.71)"
                            d="M109.5,244l1.5,89,19,.5-10,12,7,4,2,3L117.5,361l3-4,1.5-1.5,3-1.5-2.5-4-6.5-3.5,4.5-6.5,1.5-1.5,1-2.5-15-1.5Z"
                            fill="rgba(4,3,0,0.71)"
                          />
                          <path
                            id="rgba_250_250_248_0.97_"
                            data-name="rgba(250,250,248,0.97)"
                            d="M47.5,61,52,63.5l19,67-1,2,4,8L67.5,142,59,136.5l-3-13,6-15L58.5,107,52,129.5,59.5,143,73,146l-1.5,3-8,1L49,139.5q-13.4-26.1-13-66L42,63Z"
                            fill="rgba(250,250,248,0.97)"
                          />
                          <path
                            id="rgba_250_250_248_0.97_2"
                            data-name="rgba(250,250,248,0.97)"
                            d="M85,203l3,1.5,1,5.5,3,1.5,2,5,2,4.5,2,1.5,2,6.5,3,1.5,1,5.5,3,1.5,2,4,1,2.5-3,1.5v90l14,3-6,9.5,9,4.5-8,7,1.5,3.5,5.5-3.5,1.5-1.5,5.5-4-3-7,22,1.5v26l-7.5.5L46,368l1-19,5,2.5,1,2.5,3,1.5,7.5,8.5,2.5-1.5-7-9L73,350l-7-14,19-1.5-1-129Z"
                            fill="rgba(250,250,248,0.97)"
                          />
                          <path
                            id="rgba_235_203_1_1_"
                            data-name="rgba(235,203,1,1)"
                            d="M75.5,39Q95.7,37.8,102,50.5l28,56-7.5,6.5-.5-4.5v-2l-3.5-6.5L98,115.5l4.5.5L116,106l3-2-1,31.5,5.5-2.5,1.5-3q-6.3,1.4-3-11.5l9.5-8.5,3.5,13.5q-1.7,17.3-12.5,25.5-18.9,13.1-50,14Q54.3,160.3,45,148.5l-8-16-7-59L45.5,49ZM48,61l-6,2L36,74q0,39,13,66l15,10,8-1,1-4,16-7,1,15,4-1,3-4-3-2-1-28-2-1L72,131,52,64Zm41,6L64,74l-3,2,4,1,3,5,6-2-1-4,7-2,3,5,4-1,1-2V74l3-3V69ZM83,82,72,87l2,2,15-4Z"
                            fill="#ebcb01"
                          />
                          <path
                            id="rgba_235_203_1_1_2"
                            data-name="rgba(235,203,1,1)"
                            d="M88.5,121l1.5,1.5v2L87.5,135,74,141l-2-7Z"
                            fill="#ebcb01"
                          />
                          <path
                            id="rgba_0_0_0_0_"
                            data-name="rgba(0,0,0,0)"
                            d="M0,0H168V375H149V348.5L126.5,347l-3,1-3.5-2.5,10-12-19-.5-2-93-2-2.5-3-1.5-2.5-7-1.5-2.5L98,221l-2-1.5L94,214l-2-2.5L89,210l-2.5-7L84,201.5,81,199,79.5,333,59,334.5,67,347l-20,2-1,19,95,6.5L0,375ZM72,36,43,47Q29,57,26,77l8,59,8,15,27,15q35,0,56-14l13-22-3-21,3-10-3-17-15-6L105,49Q97,34,72,36Zm59,121L86,173q-20,3-30-4l-5-3-2,3,18,8q41,0,65-17Zm-29,23-18,6-16-2-4,3,5,2q23,3,36-6l-1-1Zm7,42-2,7,4,1Z"
                            fill="rgba(0,0,0,0)"
                          />
                          <path
                            id="rgba_0_0_0_0_2"
                            data-name="rgba(0,0,0,0)"
                            d="M123,80l8,2,4,14.5-1,3.5-3-1.5Z"
                            fill="rgba(0,0,0,0)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_"
                            data-name="rgba(128,128,128,0.99)"
                            d="M78.5,38l2.5.5-2.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_2"
                            data-name="rgba(128,128,128,0.99)"
                            d="M72.5,39l2.5.5-2.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_3"
                            data-name="rgba(128,128,128,0.99)"
                            d="M91.5,41l1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_4"
                            data-name="rgba(128,128,128,0.99)"
                            d="M59.5,42l2.5.5-2.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_5"
                            data-name="rgba(128,128,128,0.99)"
                            d="M94.5,43l1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_6"
                            data-name="rgba(128,128,128,0.99)"
                            d="M98.5,46l2,3Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_7"
                            data-name="rgba(128,128,128,0.99)"
                            d="M43.5,50l-5,6Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_8"
                            data-name="rgba(128,128,128,0.99)"
                            d="M102.5,51l1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_9"
                            data-name="rgba(128,128,128,0.99)"
                            d="M105.5,55l1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_10"
                            data-name="rgba(128,128,128,0.99)"
                            d="M36.5,58l-1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_11"
                            data-name="rgba(128,128,128,0.99)"
                            d="M32.5,65l.5,1.5L31.5,69,31,67.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_12"
                            data-name="rgba(128,128,128,0.99)"
                            d="M88.5,67l2.5.5L85.5,69V68Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_13"
                            data-name="rgba(128,128,128,0.99)"
                            d="M112.5,68l1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_14"
                            data-name="rgba(128,128,128,0.99)"
                            d="M91.5,69l-1,2L89,70.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_15"
                            data-name="rgba(128,128,128,0.99)"
                            d="M71.5,71l2.5.5L68.5,73V72Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_16"
                            data-name="rgba(128,128,128,0.99)"
                            d="M77.5,73,81,74.5,82.5,78l3.5.5-3.5.5L80,74Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_17"
                            data-name="rgba(128,128,128,0.99)"
                            d="M73.5,74,73,75.5l1,4-3,2,2-4-1-2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_18"
                            data-name="rgba(128,128,128,0.99)"
                            d="M65.5,77l.5,2.5H65Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_19"
                            data-name="rgba(128,128,128,0.99)"
                            d="M117.5,77l1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_20"
                            data-name="rgba(128,128,128,0.99)"
                            d="M29.5,78l.5,3.5H29Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_21"
                            data-name="rgba(128,128,128,0.99)"
                            d="M82.5,82l6.5.5-6.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_22"
                            data-name="rgba(128,128,128,0.99)"
                            d="M120.5,82l1.5,2.5-2-1Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_23"
                            data-name="rgba(128,128,128,0.99)"
                            d="M78.5,83l2.5.5-2.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_24"
                            data-name="rgba(128,128,128,0.99)"
                            d="M73.5,85,73,86.5,74.5,88v1L72,87.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_25"
                            data-name="rgba(128,128,128,0.99)"
                            d="M83.5,85l4.5.5-4.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_26"
                            data-name="rgba(128,128,128,0.99)"
                            d="M30.5,88l.5,3.5H30Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_27"
                            data-name="rgba(128,128,128,0.99)"
                            d="M124.5,91l1.5,2.5h-1Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_28"
                            data-name="rgba(128,128,128,0.99)"
                            d="M31.5,94l.5,3.5H31Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_29"
                            data-name="rgba(128,128,128,0.99)"
                            d="M128.5,99l1.5,2.5-2-1Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_30"
                            data-name="rgba(128,128,128,0.99)"
                            d="M32.5,100l.5,2.5H32Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_31"
                            data-name="rgba(128,128,128,0.99)"
                            d="M115.5,101l-1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_32"
                            data-name="rgba(128,128,128,0.99)"
                            d="M112.5,103l-3,4Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_33"
                            data-name="rgba(128,128,128,0.99)"
                            d="M113.5,106l-4,5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_34"
                            data-name="rgba(128,128,128,0.99)"
                            d="M33.5,107l.5,2.5H33Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_35"
                            data-name="rgba(128,128,128,0.99)"
                            d="M58.5,107l3.5,1.5L60.5,111l-1-3-4,7-.5-1.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_36"
                            data-name="rgba(128,128,128,0.99)"
                            d="M106.5,108l-3,4Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_37"
                            data-name="rgba(128,128,128,0.99)"
                            d="M131.5,109l1,2-6.5,3.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_38"
                            data-name="rgba(128,128,128,0.99)"
                            d="M59.5,112l.5,1.5L56.5,123l-.5-3.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_39"
                            data-name="rgba(128,128,128,0.99)"
                            d="M106.5,112l-3,4Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_40"
                            data-name="rgba(128,128,128,0.99)"
                            d="M123.5,112l-1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_41"
                            data-name="rgba(128,128,128,0.99)"
                            d="M100.5,113v0Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_42"
                            data-name="rgba(128,128,128,0.99)"
                            d="M34.5,114l.5,2.5H34Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_43"
                            data-name="rgba(128,128,128,0.99)"
                            d="M54.5,116l.5,2.5-2,9L59,142l7,2.5-2.5.5L56,139.5l-4-15Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_44"
                            data-name="rgba(128,128,128,0.99)"
                            d="M123.5,116l-1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_45"
                            data-name="rgba(128,128,128,0.99)"
                            d="M88.5,117l2.5.5-2.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_46"
                            data-name="rgba(128,128,128,0.99)"
                            d="M134.5,117l.5,3.5h-1Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_47"
                            data-name="rgba(128,128,128,0.99)"
                            d="M35.5,118l.5,4.5H35Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_48"
                            data-name="rgba(128,128,128,0.99)"
                            d="M86.5,118l-2,3Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_49"
                            data-name="rgba(128,128,128,0.99)"
                            d="M87.5,121l-3,4Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_50"
                            data-name="rgba(128,128,128,0.99)"
                            d="M80.5,123l-3,4Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_51"
                            data-name="rgba(128,128,128,0.99)"
                            d="M121.5,123l.5,6.5h-1Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_52"
                            data-name="rgba(128,128,128,0.99)"
                            d="M90.5,124l.5,8.5-3,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_53"
                            data-name="rgba(128,128,128,0.99)"
                            d="M134.5,124l.5,3.5h-1Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_54"
                            data-name="rgba(128,128,128,0.99)"
                            d="M36.5,126l.5,2.5H36Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_55"
                            data-name="rgba(128,128,128,0.99)"
                            d="M75.5,127l-4,7L70,131Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_56"
                            data-name="rgba(128,128,128,0.99)"
                            d="M80.5,127l-2,3Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_57"
                            data-name="rgba(128,128,128,0.99)"
                            d="M118.5,127l1,9,2.5-1.5-4,1Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_58"
                            data-name="rgba(128,128,128,0.99)"
                            d="M93.5,128l.5,18,3,1.5L93.5,152l2.5-3.5Q88.8,147.2,93.5,128Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_59"
                            data-name="rgba(128,128,128,0.99)"
                            d="M124.5,130l.5,2.5h-1Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_60"
                            data-name="rgba(128,128,128,0.99)"
                            d="M56.5,131l6,9,10,2,3-1v1l-9,1L60,140Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_61"
                            data-name="rgba(128,128,128,0.99)"
                            d="M75.5,131l-2,3Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_62"
                            data-name="rgba(128,128,128,0.99)"
                            d="M132.5,134l.5,1.5-2,1Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_63"
                            data-name="rgba(128,128,128,0.99)"
                            d="M86.5,135l-1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_64"
                            data-name="rgba(128,128,128,0.99)"
                            d="M38.5,136l1.5,3.5H39Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_65"
                            data-name="rgba(128,128,128,0.99)"
                            d="M89.5,137l1.5,6.5H90Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_66"
                            data-name="rgba(128,128,128,0.99)"
                            d="M87.5,138l-2,3Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_67"
                            data-name="rgba(128,128,128,0.99)"
                            d="M129.5,141l-2,3Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_68"
                            data-name="rgba(128,128,128,0.99)"
                            d="M68.5,145l4.5.5-4.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_69"
                            data-name="rgba(128,128,128,0.99)"
                            d="M43.5,146l1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_70"
                            data-name="rgba(128,128,128,0.99)"
                            d="M121.5,149l-2,3Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_71"
                            data-name="rgba(128,128,128,0.99)"
                            d="M46.5,150l1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_72"
                            data-name="rgba(128,128,128,0.99)"
                            d="M50.5,153l2,3Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_73"
                            data-name="rgba(128,128,128,0.99)"
                            d="M54.5,156l1,2Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_74"
                            data-name="rgba(128,128,128,0.99)"
                            d="M97.5,158l2.5.5-2.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_75"
                            data-name="rgba(128,128,128,0.99)"
                            d="M64.5,161l2.5.5-2.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_76"
                            data-name="rgba(128,128,128,0.99)"
                            d="M84.5,161l2.5.5-2.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_77"
                            data-name="rgba(128,128,128,0.99)"
                            d="M68.5,162l3.5.5-3.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_78"
                            data-name="rgba(128,128,128,0.99)"
                            d="M79.5,162l3.5.5-3.5.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_79"
                            data-name="rgba(128,128,128,0.99)"
                            d="M84.5,202l.5,2.5v2L83.5,336,83,203.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_80"
                            data-name="rgba(128,128,128,0.99)"
                            d="M108.5,244l.5,1.5-1,89,.5,1.5L107,245.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_81"
                            data-name="rgba(128,128,128,0.99)"
                            d="M64.5,336l1.5,1.5L73,350l-14,3.5,7,9L63.5,364l-9-10L53,352.5,52,349l2,1.5,5,7,1.5,1.5,2.5,4,2-1.5L58,352l14-3Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                          <path
                            id="rgba_128_128_128_0.99_82"
                            data-name="rgba(128,128,128,0.99)"
                            d="M121,336l2,1.5-1,2.5-3,1.5-3,5,9,6-1.5,1.5-1.5,3-5,3.5,2.5.5,9.5-8.5-2-3-1-2h1l3,6.5-7,4-1.5,3-4,2-1.5-3.5,8-7-9-4.5Z"
                            fill="rgba(128,128,128,0.99)"
                          />
                        </g>
                        <path
                          id="Path_125"
                          data-name="Path 125"
                          d="M9384.866,1919.847l1.666,3.528s17.471,8.139,20.788,2.495-1.94-12.75-1.94-12.75l-16.354,8.316,14.414,3.326V1917l-9.425,8.87"
                          transform="translate(-8874 100)"
                          fill="none"
                          stroke="#000"
                          stroke-width="5"
                        />
                      </g>
                    </svg>
                  {:else}
                    <div class="text-5xl" data-test="defeated">
                      {$t("defeated-message")}
                    </div>
                    <svg
                      class="mx-auto max-w-xl"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="261"
                      height="217"
                      viewBox="0 0 261 217"
                    >
                      <defs>
                        <clipPath id="clip-path">
                          <rect
                            id="Rectangle_148"
                            data-name="Rectangle 148"
                            width="261"
                            height="217"
                            transform="translate(599 2690)"
                            fill="#fff"
                            stroke="#707070"
                            stroke-width="1"
                          />
                        </clipPath>
                        <pattern
                          id="pattern"
                          preserveAspectRatio="none"
                          width="100%"
                          height="100%"
                          viewBox="0 0 225 225"
                        >
                          <image
                            width="225"
                            height="225"
                            xlink:href="data:image/png;base64,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"
                          />
                        </pattern>
                      </defs>
                      <g
                        id="Mask_Group_2"
                        data-name="Mask Group 2"
                        transform="translate(-599 -2690)"
                        clip-path="url(#clip-path)"
                      >
                        <rect
                          id="Image_2"
                          data-name="Image 2"
                          width="274"
                          height="273"
                          transform="translate(586 2663)"
                          fill="url(#pattern)"
                        />
                      </g>
                    </svg>
                  {/if}
                </div>
              </Transition>
              <!-- END QUIZZES -->
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
{/if}

<style>
  /* Sets the containers height and width */
  .base-timer {
    position: relative;
    float: right;
    width: 30px;
    height: 30px;
  }

  /* Removes SVG styling that would hide the time label */
  .base-timer__circle {
    fill: none;
    stroke: none;
  }

  /* The SVG path that displays the timer's progress */
  .base-timer__path-elapsed {
    stroke-width: 10px;
    stroke: grey;
  }

  .base-timer__label {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .base-timer__path-remaining {
    /* Just as thick as the original ring */
    stroke-width: 10px;

    /* Rounds the line endings to create a seamless circle */
    stroke-linecap: round;

    /* Makes sure the animation starts at the top of the circle */
    transform: rotate(90deg);
    transform-origin: center;

    /* One second aligns with the speed of the countdown timer */
    transition: 1s linear all;

    /* Allows the ring to change color when the color value updates */
    stroke: currentColor;
  }

  .base-timer__svg {
    /* Flips the svg and makes the animation to move left-to-right */
    transform: scaleX(-1);
  }
</style>
