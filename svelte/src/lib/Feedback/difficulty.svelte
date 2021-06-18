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
      console.log($page.path);
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
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
            >
              <svg
                class="h-6 w-6 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Activiteit voltooid!
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Wat vond je van deze activiteit?
                </p>
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
