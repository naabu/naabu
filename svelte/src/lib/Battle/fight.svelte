<script>
  import { getFirebaseFirestore } from "$lib/firebase";
  import { collection, addDoc } from "firebase/firestore";
  import { getStores, session, page } from "$app/stores";
  import Transition from "svelte-class-transition";
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';

  export let activity;
  export let toggle = false;

  let db;

  onMount(async () => {
    db = await getFirebaseFirestore($session.environment);
  });

  async function storeFeedback(label) {
    let data = {
      time: Date.now(),
      activityId: activity.id,
      feedbackType: "difficulty",
      feedbackValue: label,
    };

    let storeAndRedirect = true;
    if ($session.user && $session.user.uid) {
      data.uid = $session.user.uid;
      if (
        $session.user.idTokenResult.claims.canDebugDevelopment ||
        $session.user.idTokenResult.claims.canModerate
      ) {
        storeAndRedirect = false;
      }
    }

    if (storeAndRedirect) {
      try {
        let collectionRef = collection(db, "feedback");
        let result = addDoc(collectionRef, data);
      } catch (e) {
        console.log(e);
      }
      await goto('/')
    }
    else {
      toggle = false;
      if ($page.path.includes('beheer')) {
        await goto('/beheer/activiteit')
      }
      else {
        await goto('/')
      }
    }
  }
</script>

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
            <svg xmlns="http://www.w3.org/2000/svg" width="164.158" height="145.156" viewBox="0 0 164.158 145.156">
              <g id="Mask_Group_1" data-name="Mask Group 1" transform="translate(0.158 0.156)">
                <g id="Sizing_Rectangle" data-name="Sizing Rectangle" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1">
                  <rect width="163.64" height="144.548" stroke="none"/>
                  <rect x="0.5" y="0.5" width="162.64" height="143.548" fill="none"/>
                </g>
                <path id="rgba_206_179_6_1_" data-name="rgba(206,179,6,1)" d="M112.5,32l2.5.5-2.5.5Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_2" data-name="rgba(206,179,6,1)" d="M117.5,33l2.5.5-2.5.5Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_3" data-name="rgba(206,179,6,1)" d="M114.5,39l3,4Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_4" data-name="rgba(206,179,6,1)" d="M137.5,46l1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_5" data-name="rgba(206,179,6,1)" d="M139.5,49l1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_6" data-name="rgba(206,179,6,1)" d="M123.5,52l1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_7" data-name="rgba(206,179,6,1)" d="M125.5,55l1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_8" data-name="rgba(206,179,6,1)" d="M14.5,72l-1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_9" data-name="rgba(206,179,6,1)" d="M133.5,76l.5,4.5h-1Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_10" data-name="rgba(206,179,6,1)" d="M49.5,77l1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_11" data-name="rgba(206,179,6,1)" d="M41.5,80l.5,2.5H41Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_12" data-name="rgba(206,179,6,1)" d="M51.5,80l1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_13" data-name="rgba(206,179,6,1)" d="M36.5,82,40,84.5l-1.5.5Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_14" data-name="rgba(206,179,6,1)" d="M53.5,83l1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_15" data-name="rgba(206,179,6,1)" d="M27.5,84v3Q24.5,85.5,27.5,84Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_16" data-name="rgba(206,179,6,1)" d="M29.5,85l2,3Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_17" data-name="rgba(206,179,6,1)" d="M42.5,85q2.3-.7,1.5,1.5L41.5,88V87l1.5-.5Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_18" data-name="rgba(206,179,6,1)" d="M145.5,85l.5,5.5h-1Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_19" data-name="rgba(206,179,6,1)" d="M39.5,86l.5,2.5L37.5,91,36,89.5Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_20" data-name="rgba(206,179,6,1)" d="M55.5,86l1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_21" data-name="rgba(206,179,6,1)" d="M132.5,87l.5,2.5h-1Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_22" data-name="rgba(206,179,6,1)" d="M5.5,88,6,92.5H5Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_23" data-name="rgba(206,179,6,1)" d="M57.5,89l1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_24" data-name="rgba(206,179,6,1)" d="M144.5,95l.5,2.5h-1Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_25" data-name="rgba(206,179,6,1)" d="M142.5,102l-5,6Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_26" data-name="rgba(206,179,6,1)" d="M131.5,104l-.5,1.5,3.5,4.5-4.5-4.5Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_27" data-name="rgba(206,179,6,1)" d="M9.5,107l.5,2.5H9Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_28" data-name="rgba(206,179,6,1)" d="M125.5,108l-1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_29" data-name="rgba(206,179,6,1)" d="M67.5,109l.5,5.5H67Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_30" data-name="rgba(206,179,6,1)" d="M122.5,112l-4,5Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_31" data-name="rgba(206,179,6,1)" d="M129.5,112l-1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_32" data-name="rgba(206,179,6,1)" d="M11.5,115l.5,2.5H11Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_33" data-name="rgba(206,179,6,1)" d="M124.5,115l-1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_34" data-name="rgba(206,179,6,1)" d="M14.5,125l1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_35" data-name="rgba(206,179,6,1)" d="M62.5,125l-2,3Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_36" data-name="rgba(206,179,6,1)" d="M16.5,128l3,4Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_37" data-name="rgba(206,179,6,1)" d="M58.5,128l-1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_38" data-name="rgba(206,179,6,1)" d="M32.5,135l-1,2Z" fill="#ceb306"/>
                <path id="rgba_206_179_6_1_39" data-name="rgba(206,179,6,1)" d="M34.5,135l2.5,1.5-3,.5Z" fill="#ceb306"/>
                <path id="rgba_1_1_1_0.03_" data-name="rgba(1,1,1,0.03)" d="M0,0,136,.5,0,24Z" fill="rgba(1,1,1,0.03)"/>
                <path id="rgba_1_1_1_0.03_2" data-name="rgba(1,1,1,0.03)" d="M142.5,0h21l.5.5v64h-1Z" fill="rgba(1,1,1,0.03)"/>
                <path id="rgba_1_1_1_0.03_3" data-name="rgba(1,1,1,0.03)" d="M163.5,68l.5,77-35-.5,27-28,2-4-8-17Z" fill="rgba(1,1,1,0.03)"/>
                <path id="rgba_255_255_255_0.5_" data-name="rgba(255,255,255,0.5)" d="M136.5,0l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_2" data-name="rgba(255,255,255,0.5)" d="M131.5,1l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_3" data-name="rgba(255,255,255,0.5)" d="M125.5,2l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_4" data-name="rgba(255,255,255,0.5)" d="M119.5,3l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_5" data-name="rgba(255,255,255,0.5)" d="M114.5,4l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_6" data-name="rgba(255,255,255,0.5)" d="M108.5,5l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_7" data-name="rgba(255,255,255,0.5)" d="M102.5,6l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_8" data-name="rgba(255,255,255,0.5)" d="M97.5,7l3.5.5L97.5,8Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_9" data-name="rgba(255,255,255,0.5)" d="M91.5,8l3.5.5L91.5,9Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_10" data-name="rgba(255,255,255,0.5)" d="M85.5,9l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_11" data-name="rgba(255,255,255,0.5)" d="M80.5,10l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_12" data-name="rgba(255,255,255,0.5)" d="M74.5,11l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_13" data-name="rgba(255,255,255,0.5)" d="M68.5,12l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_14" data-name="rgba(255,255,255,0.5)" d="M63.5,13l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_15" data-name="rgba(255,255,255,0.5)" d="M57.5,14l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_16" data-name="rgba(255,255,255,0.5)" d="M51.5,15l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_17" data-name="rgba(255,255,255,0.5)" d="M46.5,16l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_18" data-name="rgba(255,255,255,0.5)" d="M40.5,17l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_19" data-name="rgba(255,255,255,0.5)" d="M34.5,18l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_20" data-name="rgba(255,255,255,0.5)" d="M29.5,19l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_21" data-name="rgba(255,255,255,0.5)" d="M23.5,20l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_22" data-name="rgba(255,255,255,0.5)" d="M17.5,21l3.5.5-3.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_23" data-name="rgba(255,255,255,0.5)" d="M11.5,22l4.5.5-4.5.5Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_24" data-name="rgba(255,255,255,0.5)" d="M6.5,23l3.5.5L6.5,24Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_25" data-name="rgba(255,255,255,0.5)" d="M.5,24l3.5.5L.5,25Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_26" data-name="rgba(255,255,255,0.5)" d="M151.5,28,156,42.5h-1l-4-12Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_27" data-name="rgba(255,255,255,0.5)" d="M163.5,65l.5,2.5h-1Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_28" data-name="rgba(255,255,255,0.5)" d="M161.5,71l.5,1.5-12,24,4,8h-1l-4-9Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_255_255_255_0.5_29" data-name="rgba(255,255,255,0.5)" d="M156.5,110l1.5,3.5L128.5,145,0,144.5l128.5-.5,7.5-7.5,19-20,2-4Z" fill="rgba(255,255,255,0.5)"/>
                <path id="rgba_251_216_1_1_" data-name="rgba(251,216,1,1)" d="M100.5,32q26.2-1.2,36.5,13.5l10,20v12L146,81l-6,1q-1.5,3.7,1.5,3l4-2,.5,1.5-1,1-1,14-7.5,8.5-5-4-1.5,1.5,4,4-1.5,1.5L117,119q-1.1-2.7,1.5-2A39.887,39.887,0,0,0,130,100.5l3-11,1-13-3-14L114.5,39q-5.1-4.9-14-6Z" fill="#fbd801"/>
                <path id="rgba_251_216_1_1_2" data-name="rgba(251,216,1,1)" d="M30.5,66q11.2-.2,15.5,6.5l2,3a160.71,160.71,0,0,1,19,31v11A19.778,19.778,0,0,1,59.5,128l-5,3h-3l-12,5H35l1-4-3,1.5L31.5,136q-11-1-15.5-8.5l-4-8v-4l-5-16-1-14L10,76h2q-1.1-2.7,1.5-2l7-5ZM39,79,26,86q1,2,3,0l3,2q3,1,4-2l-1-3,4,2,3-2Q44,77,39,79ZM16,80l-2,1L9,87v7l9,29q3,5,11,7l5-2-1-7A144.6,144.6,0,0,1,19,85Zm27,5-3,1-4,4,2,1,6-4Q45,84,43,85Z" fill="#fbd801"/>
                <path id="rgba_254_254_254_1_" data-name="rgba(254,254,254,1)" d="M140.5,10q5.7-1.8,3.5,4.5l2,4,5,24h-1L143,11h-1.5L126,26.5V29q2.7-1.1,2,1.5l18,18V50l3,1.5,5,8v11L149.5,77q.6-11.1-2.5-18.5A50.2,50.2,0,0,0,131.5,37q-6.7-5.3-17.5-6.5l5.5-.5,9,4L125,29.5v-4ZM145,50l1,2Q147,49,145,50Zm2,2q-2,5,2,7l2,15,2-5V62l-4-9Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_2" data-name="rgba(254,254,254,1)" d="M140.5,15,147,39.5,144.5,41,143,38l-3-1.5.5-2.5,3,4,.5-5.5L141,21l-6,4.5V29q2.7-1.1,2,1.5l1,2-6-5,1-2-2-1Zm-.5,3q-2,3,1,2Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_3" data-name="rgba(254,254,254,1)" d="M98.5,29l12.5.5L99.5,30,97,32.5v7l7,21h-1L97,49,79,53,76.5,63,76,57.5,79.5,52l11-4H98q-1.6-2.1-1-7.5l-2-3v-5Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_4" data-name="rgba(254,254,254,1)" d="M15.5,34q8.3-1,11.5,2-1.4-4,5.5-2L34,37q2.7-1.1,2,1.5l1,4-10,9q.7,3-3,1.5v2q-2.7-1.1-2,1.5L12.5,65h-3l-1-1L5,67.5l-1,8L5.5,78l7-9,15-6h10A21.966,21.966,0,0,1,51,72.5L52,76q2.7-1.1,2,1.5L57.5,82,63,78.5l-1-4L75.5,64l.5,1.5-13,10,2,3L58.5,84H56A39.382,39.382,0,0,0,43.5,67l-8-3h-5l-11,3L9,74.5,5.5,81Q1.1,77.9,3,68.5L5,64q2.7,1.1,2-1.5L7.5,60l4,3L33,44.5q-.7-2.2,1.5-1.5L36,40.5,29.5,35q-1,3-6,2l-6-2A13.26,13.26,0,0,0,9,40.5Q6.5,44,8,51.5l1,3-8,12L.5,71,0,66.5,3,60q3.3,1.3,2-3.5l3-3-1-1-1-8A13.26,13.26,0,0,1,11.5,36ZM69,36l4,9q-1,2,2,1l-2-7Zm5,36-4,3v1l5-2Q76,71,74,72Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_5" data-name="rgba(254,254,254,1)" d="M69.5,34q5.3-1.7,3.5,3.5Q77.3,40,76,47q-3.8,1-5-1.5l-3-10Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_6" data-name="rgba(254,254,254,1)" d="M99,35l2,.5v2l5,20,3.5,4.5,10-3,2.5,1q-1,4.3,2,5.5v4L121.5,73l-5,1V73l5.5-2,1-4.5q-.7-2.2-4.5-1.5l-8,4-1-2,3-2h2l4-2q1.3,2.3,2.5-.5-.5-3-4.5-2.5-1.5,4.3-7.5,3l-.5,2L104,55.5Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_7" data-name="rgba(254,254,254,1)" d="M102.5,36q8.6,1.9,13.5,7.5l12,18,2,4v4h-1L127,62q-2.7,1.1-2-1.5L112.5,42,109,41q1.3-3.3-3.5-2Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_8" data-name="rgba(254,254,254,1)" d="M82,37h4v9H81V41.5Zm1,1v7h2V39Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_9" data-name="rgba(254,254,254,1)" d="M16.5,38q7.4-.9,10,3l4-3L32,40.5,30.5,40q-2.6-.7-1.5,2H25v2.5L19.5,50,18,48.5l5-6q-1.4-3.1-6.5-2.5L13,42.5l-1,5L14.5,52q2.3.8,1.5-1.5h1L11.5,57l.5-1.5q.6-4.6-2-6v-6L12,40Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_10" data-name="rgba(254,254,254,1)" d="M55,44h4.5L66,48l2.5,4L73,53v5H68.5L67,55H64.5L55,47.5Zm1,1v2l9,6q2,1,1-1l-7-7Zm12,8,1,4q4,1,3-1Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_11" data-name="rgba(254,254,254,1)" d="M151.5,44q2.3,1.8,1.5,6.5l3,3q-.6,4.6,2,6v11a25.561,25.561,0,0,1-9,13q1.5,18-7.5,25.5l-1.5.5,3.5,1.5q2.3-3,7.5-2l2,3.5v3l-3.5,1.5-3-2q-1.5,2.5-7,1-1.4-2.6-6-2-5.4,7.1-17,8l-3.5-1q-2.9-2.9-2-10.5h1q-.6,8.1,4.5,10.5,11.8-2.7,19-10,2,4,8,4l5.5-2,1.5,3q2.8-1.2.5-2.5V111h-5.5l-6.5,1-1-2.5,3-1.5v-2q2.7,1.1,2-1.5l4-8,1-14q9.2-5.3,9-20l-6-14Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_12" data-name="rgba(254,254,254,1)" d="M91.5,52Q96,51,97,53.5l5,10-5,11L90,84H88q1.1,2.7-1.5,2l-4,2L80,85.5,78,77l13-9.5L84.5,59l-5,4,.5-1.5L81,55Zm.5,1L82,58h4l6,8v3l-2,3L80,79l2,6q-1,2,3,1,10-8,15-22l-5-9Q96,52,92,53ZM84,65l-2,1-2,3,4-2Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_13" data-name="rgba(254,254,254,1)" d="M57,58h4.5L69,61.5V65H62.5L62,67H59.5L49,62.5q-1.8-5.7,4.5-3.5L57,60Zm1,1v3l-5-2q-4-1-3,2,4,3,11,3l1-3,3,2q3,1,2-1Q64,59,58,59Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_14" data-name="rgba(254,254,254,1)" d="M104.5,62,109,73.5V77q-6.9,1-10-1Zm.5,4-4,9,6,1Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_15" data-name="rgba(254,254,254,1)" d="M83.5,63,86,64.5,82.5,70l-3,2-2-1-2,4-5,3L66,76.5Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_16" data-name="rgba(254,254,254,1)" d="M130.5,71l.5,15.5h-1Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_17" data-name="rgba(254,254,254,1)" d="M111,73l2,.5-1,1v10l1,1v12h-1Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_18" data-name="rgba(254,254,254,1)" d="M.5,75Q.3,81.2,4,83.5v13l6,20v4A28.687,28.687,0,0,0,20.5,135L31,138q-1,3.8,1.5,5,12.1,1.6,20-1l3.5,1-1.5-3-6.5-.5,7.5-.5q2.5,1.2,1.5,5H31.5L30,142.5,28.5,139,20,137v-2H17v-2q-2.7,1.1-2-1.5l-5-6v-4l-4-11v-5l-3-6v-15Q-1.6,82,.5,75Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_19" data-name="rgba(254,254,254,1)" d="M97.5,78l9,2,2.5-1-.5,11-.5-9q-6.7,1.4-9.5-2l-5,7-3,2-6,4h-4Q75.2,89.1,76,82l-7.5,3-2-3L64,86l-4,1.5,2,.5v2.5l7,12,1,6.5h4q-1.2-3,2.5-2a8.692,8.692,0,0,0,4.5-7l4,1.5v4L83,109q-3-1-2,2H78.5L70,116.5l-1,6L66,128H64q1.1,2.7-1.5,2l-8,5h-3L40,139.5l4,1-9.5.5-1-2a84.332,84.332,0,0,0,24-7l8.5-7.5,3-6V114l8.5-3,4.5-3.5,2-5-3-.5q.8,4.7-3.5,6l-8,4L68,103.5l-9-17L66.5,80q.5,3.5,5,3l4-3L79,88.5,81.5,91q9-2.5,13.5-9.5Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_20" data-name="rgba(254,254,254,1)" d="M13.5,81q3.8-.7,4.5,1.5l2,9,12,27,2,8q-1.2,3.8-7.5,2.5L21,126v-2q-2.7,1.1-2-1.5l-5-11v-4l-5-19Zm.5,2-4,7,5,15v5l3,7q-1,3,2,2v3l8,6h3l1-2-5-14-3-4L17,85Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_21" data-name="rgba(254,254,254,1)" d="M129.5,88l.5,5.5-6,14-7,9.5q-3.7,1.3-2-4.5-3-4-2-12h1l2.5,13.5,6.5-7.5,5-10Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_22" data-name="rgba(254,254,254,1)" d="M99,91l2,.5-1,5,3,7-2,3,5.5,3.5.5-2.5-5-13,2.5-.5,5.5,3.5,1,11h-1L109,97l-5-1,5,11.5V111h-4.5L99,106.5l2-5Q97.4,98.4,99,91Z" fill="#fefefe"/>
                <path id="rgba_254_254_254_1_23" data-name="rgba(254,254,254,1)" d="M104.5,91q3.8-.7,4.5,1.5l-2.5.5Z" fill="#fefefe"/>
                <path id="rgba_255_255_255_1_" data-name="rgba(255,255,255,1)" d="M140.5,0q2.6-.8,1.5,2.5l21,62v4l-14,28,8,17L128.5,144h-71l-.5-3.5q-1.7-3.2-8.5-1.5-1.7,2.8-8,1v-1l14-4,9.5-5v-2q2.7,1.1,2-1.5,4-3,4-10l2.5-2.5h3q1.2-3.8,5.5-3v-2q2.7,1.1,2-1.5,3-1,2-6L81,100a8.4,8.4,0,0,1-4.5,7q-3.7-1-2.5,2H70l-1-6.5-7-12V88l-2-.5L64,86l2.5-4,2,3L76,82q-.8,7.1,4.5,10h4L92,88q-1.1-2.7,1.5-2l5-7q2.8,3.4,9.5,2l1,10.5-1.5-.5H99v7.5l2,4-2,4,5.5,4.5H109v-3.5L104,96l5,1q-.9,7.6,2,12.5v7l2,4.5,6.5,1a32.235,32.235,0,0,0,14-8h3q2.3,3.2,9,2l2-1,4,2q2.3-.7,1.5-4.5l-2-3.5-9.5,2-1-2,3.5-2.5,5-12v-11a25.561,25.561,0,0,0,9-13v-11q-2.6-1.4-2-6l-3-3v-4l-2-3v-5l-2-4L144,10h-3.5L125,25.5q-1,7,4,8l-1.5.5-8-4-21-1q-4.7,1.2-3.5,8.5l4,11L97.5,48h-7L78,53.5q-3,3-2,10L74.5,65,62,74.5l1,4L57.5,82,54,76q-2.7,1.1-2-1.5L44.5,66q-5.5-4.5-17-3l-3,2-9,2L7,74.5,5.5,78Q3.1,75.9,4,70.5L8.5,64l4,1L22,56.5q-.7-2.6,2-1.5V53q3.7,1.5,3-1.5l10-9L36,37q-2.7,1.1-2-1.5-1.6-3-7-1.5,1.1,2.7-1.5,2-2.6-3.4-10-2L8,39.5q-2.7,3.3-2,10l2,4Q4,54.9,5,60q-2.7-1.1-2,1.5L.5,66,0,25l44.5-8h5l6-2,11-1,6-2,11-1,6-2,11-1,6-2,11-1,6-2,11-1ZM70,34l-2,2,3,10q1,2,5,1,1-7-3-9Q75,32,70,34Zm12,3-1,5v4h5V37ZM55,44v4l10,7h2l2,3h4V53l-4-1-3-4-6-4Zm2,14v2l-3-1q-7-2-5,4l11,4h2l1-2h6V62l-7-4Z" fill="#fff"/>
                <path id="rgba_255_255_255_1_2" data-name="rgba(255,255,255,1)" d="M139.5,18l1,2Q137.7,20.7,139.5,18Z" fill="#fff"/>
                <path id="rgba_255_255_255_1_3" data-name="rgba(255,255,255,1)" d="M100.5,36l5,3H109q-1.1,2.7,1.5,2l4.5,3.5L125,62q2.7-1.1,2,1.5l3,7v17q-2.6,2.9-2,9l-5,10-6.5,7.5L113,99.5,112,74q8,1.7,11-2.5l1-6q-3-1.2-2-5.5l-5.5-1-7,3L106,57.5l-4-14v-4Z" fill="#fff"/>
                <path id="rgba_255_255_255_1_4" data-name="rgba(255,255,255,1)" d="M144.5,50q2.3-.7,1.5,1.5l3,1.5,4,8.5v7L150.5,74,149,58.5Z" fill="#fff"/>
                <path id="rgba_255_255_255_1_5" data-name="rgba(255,255,255,1)" d="M91.5,53q4.4-1.5,3.5,1.5l5,9Q95.4,77.9,84.5,86q-3.3,1.1-2.5-1.5l-2-6L90,72l2-3.5v-3L85.5,58l-4,1,2-3Z" fill="#fff"/>
                <path id="rgba_255_255_255_1_6" data-name="rgba(255,255,255,1)" d="M83.5,65l.5,2-4.5,2,2-3Z" fill="#fff"/>
                <path id="rgba_255_255_255_1_7" data-name="rgba(255,255,255,1)" d="M104.5,66,107,76l-6-1.5Z" fill="#fff"/>
                <path id="rgba_255_255_255_1_8" data-name="rgba(255,255,255,1)" d="M73.5,72q2.6-.7,1.5,2l-5.5,2V75Z" fill="#fff"/>
                <path id="rgba_255_255_255_1_9" data-name="rgba(255,255,255,1)" d="M.5,81,3,84.5v15l3,6,2,13q2.8,1.7,2,7l5,7.5q3-1,2,2h3v2h2.5l7.5,3.5,1,3L0,144Z" fill="#fff"/>
                <path id="rgba_255_255_255_1_10" data-name="rgba(255,255,255,1)" d="M13.5,83,17,84.5l7,23,3,4,5,14L31,128H27.5L20,121.5V119q-3,1.3-2-2.5l-3-7v-5l-5-15Z" fill="#fff"/>
                <path id="rgba_231_230_226_1_" data-name="rgba(231,230,226,1)" d="M143.5,15l.5,2.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_2" data-name="rgba(231,230,226,1)" d="M135.5,17l-9,10Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_3" data-name="rgba(231,230,226,1)" d="M139.5,21l1.5.5L135.5,26Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_4" data-name="rgba(231,230,226,1)" d="M145.5,23l.5,2.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_5" data-name="rgba(231,230,226,1)" d="M139.5,24l1.5,6.5h-1q.8-2.2-1.5-1.5L137,26.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_6" data-name="rgba(231,230,226,1)" d="M130.5,25l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_7" data-name="rgba(231,230,226,1)" d="M131.5,27l6.5,5.5-1-2,2,1L136.5,35,134,33.5l1-2-1.5.5L131,30.5l1-2h-2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_8" data-name="rgba(231,230,226,1)" d="M144.5,28l.5,2.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_9" data-name="rgba(231,230,226,1)" d="M109.5,30l4.5.5-4.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_10" data-name="rgba(231,230,226,1)" d="M128.5,30l11,12Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_11" data-name="rgba(231,230,226,1)" d="M147.5,31l.5,2.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_12" data-name="rgba(231,230,226,1)" d="M143.5,32l.5,2.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_13" data-name="rgba(231,230,226,1)" d="M99.5,33l.5,1.5-2,1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_14" data-name="rgba(231,230,226,1)" d="M139.5,34l.5,2-2.5,1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_15" data-name="rgba(231,230,226,1)" d="M17.5,35l2.5.5-2.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_16" data-name="rgba(231,230,226,1)" d="M128.5,35l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_17" data-name="rgba(231,230,226,1)" d="M142.5,36q3,1.5,0,3l-2,1,1-2,1.5-.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_18" data-name="rgba(231,230,226,1)" d="M146.5,36l.5,2.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_19" data-name="rgba(231,230,226,1)" d="M12.5,37l-3,4Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_20" data-name="rgba(231,230,226,1)" d="M30.5,37l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_21" data-name="rgba(231,230,226,1)" d="M97.5,37l.5,2.5H97Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_22" data-name="rgba(231,230,226,1)" d="M131.5,37l7,8Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_23" data-name="rgba(231,230,226,1)" d="M14.5,38l1.5.5L13.5,40Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_24" data-name="rgba(231,230,226,1)" d="M28.5,38l-2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_25" data-name="rgba(231,230,226,1)" d="M33.5,38,36,41.5l-2,1,1-2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_26" data-name="rgba(231,230,226,1)" d="M109.5,38l3.5,2.5L110.5,39Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_27" data-name="rgba(231,230,226,1)" d="M29,40l2.5,1,1.5-.5L30.5,44l.5-1.5L30.5,41l-1.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_28" data-name="rgba(231,230,226,1)" d="M145.5,40q3.3-1.1,2.5,1.5l-3,2,1.5-2.5-3,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_29" data-name="rgba(231,230,226,1)" d="M11.5,41l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_30" data-name="rgba(231,230,226,1)" d="M14.5,41l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_31" data-name="rgba(231,230,226,1)" d="M73.5,41,75,43.5H74Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_32" data-name="rgba(231,230,226,1)" d="M114.5,41l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_33" data-name="rgba(231,230,226,1)" d="M16.5,42q4.4-1.5,3.5,1.5L15.5,49q-3.4.9-1.5-4.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_34" data-name="rgba(231,230,226,1)" d="M84.5,42l.5,3-2-.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_35" data-name="rgba(231,230,226,1)" d="M150.5,43l.5,2.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_36" data-name="rgba(231,230,226,1)" d="M25.5,44l2,1,1.5-.5L26.5,46,25,45.5l1,2L24.5,47l-1.5.5.5,1.5L22,48.5l1,2L20.5,52l-2-3,3,2L21,49.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_37" data-name="rgba(231,230,226,1)" d="M32.5,44l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_38" data-name="rgba(231,230,226,1)" d="M116.5,44l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_39" data-name="rgba(231,230,226,1)" d="M147.5,44l1.5.5L146.5,46Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_40" data-name="rgba(231,230,226,1)" d="M9.5,45l.5,2.5H9Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_41" data-name="rgba(231,230,226,1)" d="M56.5,45,58,47.5l-2-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_42" data-name="rgba(231,230,226,1)" d="M58.5,45l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_43" data-name="rgba(231,230,226,1)" d="M139.5,46l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_44" data-name="rgba(231,230,226,1)" d="M27.5,48l-4,5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_45" data-name="rgba(231,230,226,1)" d="M62.5,48l2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_46" data-name="rgba(231,230,226,1)" d="M60.5,49l2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_47" data-name="rgba(231,230,226,1)" d="M93.5,49l3.5.5-3.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_48" data-name="rgba(231,230,226,1)" d="M119.5,49l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_49" data-name="rgba(231,230,226,1)" d="M141.5,49l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_50" data-name="rgba(231,230,226,1)" d="M13.5,50l3,2q1.7-2.8,3.5,1.5l-3-1,1,2L15.5,56,14,55.5l1,2-2-1,3-4Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_51" data-name="rgba(231,230,226,1)" d="M94.5,51,97,52.5,95.5,52Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_52" data-name="rgba(231,230,226,1)" d="M149.5,52l2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_53" data-name="rgba(231,230,226,1)" d="M9.5,53l.5,1.5-4,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_54" data-name="rgba(231,230,226,1)" d="M68.5,53,72,55.5,71.5,57l-2-3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_55" data-name="rgba(231,230,226,1)" d="M102.5,55l.5,1.5-2,1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_56" data-name="rgba(231,230,226,1)" d="M18.5,56l-5,6Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_57" data-name="rgba(231,230,226,1)" d="M98.5,56l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_58" data-name="rgba(231,230,226,1)" d="M11.5,57,13,59.5q-1.2,2.8-2.5.5-2.2.8-1.5-1.5l3,1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_59" data-name="rgba(231,230,226,1)" d="M103.5,58l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_60" data-name="rgba(231,230,226,1)" d="M125.5,58l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_61" data-name="rgba(231,230,226,1)" d="M6.5,59,8,61.5,6.5,61,3,63.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_62" data-name="rgba(231,230,226,1)" d="M79.5,59l1,3L83,60.5q-2,4.5-4,1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_63" data-name="rgba(231,230,226,1)" d="M84.5,59l4,5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_64" data-name="rgba(231,230,226,1)" d="M50,60l3,.5-2,1,2,1-1.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_65" data-name="rgba(231,230,226,1)" d="M116.5,60l2.5.5-4,2,.5,1.5,3-2,2.5.5q-1.2,2.8-2.5.5l-3,2L114,62.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_66" data-name="rgba(231,230,226,1)" d="M103,61l2,.5L103.5,65Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_67" data-name="rgba(231,230,226,1)" d="M83.5,62,87,64.5l-1,2,.5,1.5-2,1,.5-1.5,1-3L83.5,63l-1.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_68" data-name="rgba(231,230,226,1)" d="M128.5,62l1.5,2.5-2-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_69" data-name="rgba(231,230,226,1)" d="M156.5,62l.5,5.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_70" data-name="rgba(231,230,226,1)" d="M154.5,63l.5,4.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_71" data-name="rgba(231,230,226,1)" d="M80.5,64l-2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_72" data-name="rgba(231,230,226,1)" d="M111.5,64l-.5,1.5q.7,3-3,1.5l.5-2Q110,67.5,111.5,64Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_73" data-name="rgba(231,230,226,1)" d="M2.5,65,2,66.5,1.5,68,1,66.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_74" data-name="rgba(231,230,226,1)" d="M121.5,65l1.5,3.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_75" data-name="rgba(231,230,226,1)" d="M43.5,67l6,7Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_76" data-name="rgba(231,230,226,1)" d="M73.5,67l-2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_77" data-name="rgba(231,230,226,1)" d="M112.5,67l2.5.5L109,70l.5-2Q111,70.5,112.5,67Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_78" data-name="rgba(231,230,226,1)" d="M130.5,67l.5,3.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_79" data-name="rgba(231,230,226,1)" d="M75.5,68l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_80" data-name="rgba(231,230,226,1)" d="M89.5,68l-2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_81" data-name="rgba(231,230,226,1)" d="M117,68q3-1,2,2Q116,71,117,68Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_82" data-name="rgba(231,230,226,1)" d="M2.5,70,3,75.5H2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_83" data-name="rgba(231,230,226,1)" d="M69.5,70l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_84" data-name="rgba(231,230,226,1)" d="M.5,71,1,74.5H0Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_85" data-name="rgba(231,230,226,1)" d="M71.5,71l-2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_86" data-name="rgba(231,230,226,1)" d="M78.5,71l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_87" data-name="rgba(231,230,226,1)" d="M85.5,71l-2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_88" data-name="rgba(231,230,226,1)" d="M98.5,71,98,72.5,97.5,74,97,72.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_89" data-name="rgba(231,230,226,1)" d="M110.5,71q2.8,1.3.5,2.5l-.5,4.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_90" data-name="rgba(231,230,226,1)" d="M119.5,71l-1,2-1.5-.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_91" data-name="rgba(231,230,226,1)" d="M11.5,72l-2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_92" data-name="rgba(231,230,226,1)" d="M76.5,72l2,3L77,74.5,76.5,76,76,74.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_93" data-name="rgba(231,230,226,1)" d="M65.5,73l-2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_94" data-name="rgba(231,230,226,1)" d="M113.5,73l2.5.5-2.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_95" data-name="rgba(231,230,226,1)" d="M152.5,73l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_96" data-name="rgba(231,230,226,1)" d="M67.5,74l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_97" data-name="rgba(231,230,226,1)" d="M74.5,75l.5,2-2.5,1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_98" data-name="rgba(231,230,226,1)" d="M80.5,75l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_99" data-name="rgba(231,230,226,1)" d="M131.5,75l.5,7.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_100" data-name="rgba(231,230,226,1)" d="M148.5,75l1,2,1.5-.5L148,78Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_101" data-name="rgba(231,230,226,1)" d="M8.5,76l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_102" data-name="rgba(231,230,226,1)" d="M67.5,77q4-.5,4.5,2.5L69.5,78Q66.5,78.5,67.5,77Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_103" data-name="rgba(231,230,226,1)" d="M97.5,77l1.5.5L96.5,79Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_104" data-name="rgba(231,230,226,1)" d="M104.5,77l2.5.5-2.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_105" data-name="rgba(231,230,226,1)" d="M152.5,77l-4,5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_106" data-name="rgba(231,230,226,1)" d="M52.5,78l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_107" data-name="rgba(231,230,226,1)" d="M75.5,79q2.6-.8,1.5,2.5H76L75.5,80l-4,3,2-3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_108" data-name="rgba(231,230,226,1)" d="M93.5,79l-3,4Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_109" data-name="rgba(231,230,226,1)" d="M104.5,79l2.5.5-2.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_110" data-name="rgba(231,230,226,1)" d="M4.5,80l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_111" data-name="rgba(231,230,226,1)" d="M2.5,81,5,84.5H4Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_112" data-name="rgba(231,230,226,1)" d="M54.5,81l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_113" data-name="rgba(231,230,226,1)" d="M94.5,81l-6,7Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_114" data-name="rgba(231,230,226,1)" d="M60.5,82l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_115" data-name="rgba(231,230,226,1)" d="M62.5,83l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_116" data-name="rgba(231,230,226,1)" d="M147.5,83l.5,6.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_117" data-name="rgba(231,230,226,1)" d="M59.5,85,59,86.5,58.5,88,58,86.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_118" data-name="rgba(231,230,226,1)" d="M109.5,85l.5,9-2-.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_119" data-name="rgba(231,230,226,1)" d="M80.5,86l2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_120" data-name="rgba(231,230,226,1)" d="M130.5,87l.5,4.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_121" data-name="rgba(231,230,226,1)" d="M79.5,88,83,90.5l-1.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_122" data-name="rgba(231,230,226,1)" d="M86.5,88l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_123" data-name="rgba(231,230,226,1)" d="M59.5,89l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_124" data-name="rgba(231,230,226,1)" d="M111.5,90l.5,2.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_125" data-name="rgba(231,230,226,1)" d="M9.5,91l.5,2.5H9Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_126" data-name="rgba(231,230,226,1)" d="M101.5,91l2.5.5L100.5,93Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_127" data-name="rgba(231,230,226,1)" d="M110.5,98l.5,2.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_128" data-name="rgba(231,230,226,1)" d="M112.5,98l.5,4.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_129" data-name="rgba(231,230,226,1)" d="M144.5,102l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_130" data-name="rgba(231,230,226,1)" d="M102.5,104q2.3-.7,1.5,1.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_131" data-name="rgba(231,230,226,1)" d="M125.5,104l.5,1.5-2,1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_132" data-name="rgba(231,230,226,1)" d="M80.5,105l-2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_133" data-name="rgba(231,230,226,1)" d="M111.5,105l.5,4.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_134" data-name="rgba(231,230,226,1)" d="M101.5,106l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_135" data-name="rgba(231,230,226,1)" d="M81.5,107l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_136" data-name="rgba(231,230,226,1)" d="M123.5,108l-2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_137" data-name="rgba(231,230,226,1)" d="M78.5,109l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_138" data-name="rgba(231,230,226,1)" d="M137.5,109l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_139" data-name="rgba(231,230,226,1)" d="M8.5,110l.5,2.5H8Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_140" data-name="rgba(231,230,226,1)" d="M134.5,111l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_141" data-name="rgba(231,230,226,1)" d="M136.5,111l2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_142" data-name="rgba(231,230,226,1)" d="M112.5,112l.5,2.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_143" data-name="rgba(231,230,226,1)" d="M114.5,112l.5,2.5h-1Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_144" data-name="rgba(231,230,226,1)" d="M120.5,112l-2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_145" data-name="rgba(231,230,226,1)" d="M140.5,112l3.5.5-3.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_146" data-name="rgba(231,230,226,1)" d="M69.5,113l2.5.5-2.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_147" data-name="rgba(231,230,226,1)" d="M140.5,114l3.5.5-3.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_148" data-name="rgba(231,230,226,1)" d="M149.5,114l2.5.5Q149.9,117.8,149.5,114Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_149" data-name="rgba(231,230,226,1)" d="M68.5,116l.5,2.5H68Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_150" data-name="rgba(231,230,226,1)" d="M126.5,116l-1,2-1.5-.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_151" data-name="rgba(231,230,226,1)" d="M10.5,118l.5,2.5H10Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_152" data-name="rgba(231,230,226,1)" d="M122.5,118l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_153" data-name="rgba(231,230,226,1)" d="M116.5,120l3.5.5-3.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_154" data-name="rgba(231,230,226,1)" d="M65.5,124l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_155" data-name="rgba(231,230,226,1)" d="M22.5,126l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_156" data-name="rgba(231,230,226,1)" d="M33.5,127l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_157" data-name="rgba(231,230,226,1)" d="M14.5,128l1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_158" data-name="rgba(231,230,226,1)" d="M61.5,128l-1,2Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_159" data-name="rgba(231,230,226,1)" d="M28.5,129l2.5.5-2.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_160" data-name="rgba(231,230,226,1)" d="M18.5,132l2,3Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_161" data-name="rgba(231,230,226,1)" d="M33.5,138l2.5.5-2.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_162" data-name="rgba(231,230,226,1)" d="M44.5,140l6.5.5-6.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_163" data-name="rgba(231,230,226,1)" d="M31.5,141l2.5,1.5-1.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_231_230_226_1_164" data-name="rgba(231,230,226,1)" d="M46.5,142l2.5.5-2.5.5Z" fill="#e7e6e2"/>
                <path id="rgba_104_100_91_1_" data-name="rgba(104,100,91,1)" d="M141.5,11,145,21.5l6,28,5,11v9a27,27,0,0,1-9,14v11l-2,7-6.5,7.5-1.5.5q.8,4.3,6.5,3.5,2-2.8,6.5-2l1,3.5-2.5-1.5-9,1q-.5-3.5-5-3l-14,9h-5l-2.5-3.5-2-18L110,96l-7.5-3-.5,3.5,5,12-1.5.5-4.5-3.5,1.5-.5,1.5.5-4-12q.8-2.2,4.5-1.5l5.5,2-1-15q-7.2,1-11.5-2l-10,11q-1.4,2.6-6,2Q76,87,77,79l-7.5,4q-3-6-6,0L58,86.5l10,18,1,7.5a18.454,18.454,0,0,0,12-6.5l1.5-3.5.5,2.5L79.5,109l-7,4H69q-.3,9.8-6.5,15l-6,4-11,4L33,138l.5,3h17l3-1,2.5,1.5q-1.2,2.8-2.5.5l-19,1L31,140.5q1.1-3.3-1.5-2.5-8.6-1.9-13.5-7.5l-4-6-3-10v-4l-5-16v-9l1-2q-5.8-3.7-4-15L6.5,61,7,62.5Q1.5,66,2,75.5L5.5,82a24.126,24.126,0,0,1,8-11l5-3,15-4Q45.1,65.9,50,74.5L56,85l9-5-1-4.5,13-11L79,54l11.5-4h6L103,60.5v5l-4,10,1.5,1.5,6,1,2.5-1-1-8.5-4-8-6-19-1-8L98,31q3-2,10.5-1,1.7,2.8,8,1l11,4L139,45.5l8,14,2,8v7l-1,4,3-2q4.2-4.3,4-13l-3-9-10-10V43q-2.7,1.1-2-1.5l-14-14,10-10,4-5Zm-.5,4L131,25l1,1-1,2,1,2,3,2q-1,2,2,1,1,2,2,0l-4-6,6-5,3,15-3-3-3,2,3,2q-1,2,2,1l2,3,2-1-1,2,1,2h2l-7-28Zm-1,9-3,4,4,3Zm-38,7-3,1-1,3,4,16,7,19,12-5q2,1,1,5-2,4-9,3l-3-1,2,31,1,1,1,11,3,4,7-2,11-7-3-5,6,3,6-7,2-18-2,1h-4l7-4q2-26-12-36,1-3-2-2V40l-13-7Zm47,15-1,3h2ZM95,51,83,54q-5,2-4,9l6-3,6,8L78,78l2,9,3,2,4-2q10-8,15-22L97,53ZM84,62,68,74l-2,3,5,2,3-2q2,1,1-1h2l1-2-1-2,3,1V72h2V71l5-3-1-1,1-2ZM29,66,15,72Q7,77,5,89l6,29,5,11q5,6,16,8l2-4h1l-1,4,8-1,19-8a27.287,27.287,0,0,0,7-13v-5l-2-6L49,76A22.816,22.816,0,0,0,38,66Z" fill="#68645b"/>
                <path id="rgba_104_100_91_1_2" data-name="rgba(104,100,91,1)" d="M100.5,33q12.3,2.7,18.5,11.5l12,19,2,8v15l-2,10-5,11-8.5,9.5-.5-2,4-2.5,8-14,2-7,1-16-3-13L114.5,41q-5.4-5.3-14.5-6ZM117,68q-1,3,2,2Q120,67,117,68Zm-2,1,1,2Q117,68,115,69Z" fill="#68645b"/>
                <path id="rgba_104_100_91_1_3" data-name="rgba(104,100,91,1)" d="M29.5,35,33,37.5l2,4L11.5,63,6,58.5l4-5q-3-3-2-10L13.5,37l8-1,5,2ZM19,37l-4,1L9,46l3,8-1,2,1,2V57h2l2-3q2,1,1-1,2-2,0-3l-2,1-3-4,1-3,5-4,5,2-5,7,2,2V50h2V49l3-2,1-2-1-3,3,1,3-2v2l2-1-2-5-4,3Zm-2,5-3,3q-2,5,2,4l4-5Q21,41,17,42ZM10,58q-2,3,1,2Z" fill="#68645b"/>
                <path id="rgba_104_100_91_1_4" data-name="rgba(104,100,91,1)" d="M70.5,36,75,44.5,73,45l-3-6.5Z" fill="#68645b"/>
                <path id="rgba_104_100_91_1_5" data-name="rgba(104,100,91,1)" d="M83,39q3-1.2,2,2.5L83.5,44Z" fill="#68645b"/>
                <path id="rgba_104_100_91_1_6" data-name="rgba(104,100,91,1)" d="M57.5,45,66,51l-.5,2L57,46.5Z" fill="#68645b"/>
                <path id="rgba_104_100_91_1_7" data-name="rgba(104,100,91,1)" d="M68.5,54,71,55.5,70.5,57Z" fill="#68645b"/>
                <path id="rgba_104_100_91_1_8" data-name="rgba(104,100,91,1)" d="M58,59l9,3-.5,2-6-2,.5,1.5q.8,2.3-1.5,1.5L51,61.5l3.5-.5,4,2,.5-1.5Z" fill="#68645b"/>
                <path id="rgba_104_100_91_1_9" data-name="rgba(104,100,91,1)" d="M116.5,61q4.4-1.5,3.5,1.5l-1.5-.5-6,3-1-1L109,65.5l1.5-2.5,4,1Z" fill="#68645b"/>
                <path id="rgba_104_100_91_1_10" data-name="rgba(104,100,91,1)" d="M40.5,79l1.5.5L41,84q-3.4.8-4.5-2L34,83.5,35,87l-2.5,1-3-3-1,1L27,85.5Z" fill="#68645b"/>
                <path id="rgba_104_100_91_1_11" data-name="rgba(104,100,91,1)" d="M40.5,86l2.5.5L37.5,90Z" fill="#68645b"/>
              </g>
            </svg>
            
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Veldslag begonnen
              </h3>
              <div class="mt-2">
              </div>
            </div>
          </div>
          <div
            class="mt-5 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense"
          >
            <button  on:click={() => storeFeedback(-0.5)}
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            >
              Te makkelijk
            </button>
            <button  on:click={() => storeFeedback(1.0)}
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
            >
              Precies goed
            </button>
            <button on:click={() => storeFeedback(-1.0)}
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-3 sm:text-sm"
            >
              Te moeilijk
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</Transition>
