<script>
  import { page } from "$app/stores";
  import Transition from "svelte-class-transition";
  import { hasSpecialClaims } from "$lib/Internals/User/helper.js";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { user } from "$lib/Internals/User/store";
  
  export let activity;
  export let moduleId = null;
  export let locationId = null;

  $: if ($page.params.moduleId) {
    moduleId = $page.params.moduleId;
  }

  $: if ($page.params.locationId) {
    locationId = $page.params.locationId;
  }

  export let toggle = false;
  export let feedbackEnded = false;
 
  async function storeFeedback(label) {
    let db = $firebase.firestore()
    let data = {
      time: Date.now(),
      activityId: activity.id,
      goalId: activity.goalId,
      moduleId: moduleId,
      locationId: locationId,
      feedbackType: "difficulty",
      feedbackValue: label,
    };

    let userHasSpecialClaims = hasSpecialClaims($user);

    if ($user && !userHasSpecialClaims) {
      try {
        data.uid = $user.uid;
        let userModuleRef = db
          .collection("modules")
          .doc(moduleId)
          .collection("players")
          .doc($user.uid);
        await userModuleRef.update({ selectedActivities: [] });
        let collectionRef = db.collection("feedback");
        let result = await collectionRef.add(data);
      } catch (e) {
        console.log(e);
      }
    }
    toggle = false;
    feedbackEnded = true;
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
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
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
                {$t("activity-completed")}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {$t("activity-completed-question")}
                </p>
              </div>
            </div>
          </div>
          <div
            class="mt-5 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense"
          >
            <Button
              isFullWidth={true}
              dataTest="too-easy"
              content="{$t("too-easy")}"
              size="large"
              on:click={() => storeFeedback(-0.5)}
            />
            <Button
              isFullWidth={true}
              color="primary"
              dataTest="just-right"
              content="{$t("just-right")}"
              size="large"
              on:click={() => storeFeedback(1.0)}
            />
            <Button
              isFullWidth={true}
              dataTest="too-difficult"
              content="{$t("too-difficult")}"
              size="large"
              on:click={() => storeFeedback(-1.0)}
            />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</Transition>
