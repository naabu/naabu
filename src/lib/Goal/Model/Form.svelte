<script>
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import KnowledgeComponent from "$lib/Goal/Model/KnowledgeComponent.svelte";
  import State from "$lib/Goal/Model/State.svelte";
  import { t } from "svelte-intl-precompile";
  import ActivitySlideOverForm from "$lib/Goal/Model/ActivitySlideOverForm.svelte";
  export let model;
  export let goal;
  export let hasCurriculumProfile ;
  let showActivityForm = false;
  let activeKC;
  let activeIndex = -1;
  let lastActiveIndex = -1;
  let sliderActivity;
  let resetSlider = false;
  let activeActivity;
  let showActivityEditForm = false;
  import { firebase } from "$lib/Internals/Firebase/store";
  import CreateActivityInModel from "$lib/Goal/Model/CreateActivityInModel.svelte";
  import EditActivityInModel from "$lib/Goal/Model/EditActivityInModel.svelte";
  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";
  import { loadPluginData } from "$lib/Activity/Components/helper";
  
  

  $: if (model.statesKCArray) {
    model.linkedActivityConnectionIds = [];
    for (let i = 0; i < model.statesKCArray.length; i++) {
      let kcState = model.statesKCArray[i];
      if (kcState.type == "kc") {
        for (let i2 = 0; i2 < kcState.activities.length; i2++) {
          let activityConnection = kcState.activities[i2];
          model.linkedActivityConnectionIds.push(activityConnection.connectionId);
        }
      }
    }
    model.linkedActivityConnectionIds = [
      ...new Set(model.linkedActivityConnectionIds),
    ];
  }

  function splitKC(event) {
    let i = event.detail.i;
    model.statesKCArray.splice(
      i + 1,
      0,
      {
        type: "state",
        label: $t("state") + " " + (i + 1) / 2,
        abstract: "",
        example: "",
      },
      {
        type: "kc",
        abstract: "",
        label: $t("knowledge_component") + " " + (i + 3) / 2,
        activities: [],
      }
    );
    model.statesKCArray = model.statesKCArray;
  }

  function deleteState(event) {
    model.statesKCArray.splice(event.detail.i, 2);
    model.statesKCArray = model.statesKCArray;
  }

  async function editActivity(event, knowledgeComponentIndex) {
    console.log(event)
    showActivityEditForm = true;
    activeKC = model.statesKCArray[knowledgeComponentIndex];
    activeIndex = knowledgeComponentIndex;

    let activityId = activeKC.activities[event.detail.activityIndex].activityId;
    activeActivity = null;
    let db = $firebase.firestore();
    let ref = db.collection("activities").doc(activityId);
    let snap = await ref.get();
    let object = await loadPluginData(activityId, snap, "form");
    activeActivity = object;
  }

  function newActivity(knowledgeComponent, index) {
    activeKC = knowledgeComponent;
    if (index !== lastActiveIndex) {
      resetSlider = true;
    }
    showActivityForm = true;
    activeIndex = index;
    lastActiveIndex = index;
  }

  $: if (!showActivityForm) {
    activeIndex = -1;
  }

  function closeSlide() {
    activeIndex = -1;
  }


  function formActivityComplete() {
    model.statesKCArray = model.statesKCArray;
  }

  function formActivityEdit(event) {
    for (let i = 0; i < model.statesKCArray.length; i++) {
      let kcState = model.statesKCArray[i];
      if (kcState.type == "kc") {
        for (let i2 = 0; i2 < kcState.activities.length; i2++) {
          if (kcState.activities[i2].activityId === event.detail.activity.id) {
            model.statesKCArray[i].activities[i2].title = event.detail.activity.title;
          }
        }
      }
    }
  }
</script>

<ActivitySlideOverForm
  bind:toggle={showActivityForm}
  bind:activity={sliderActivity}
  bind:knowledgeComponent={activeKC}
  bind:hasCurriculumProfile
  bind:reset={resetSlider}
  bind:goal
  bind:model />
 
<CreateActivityInModel
  bind:toggle={showActivityForm}
  bind:activity={activeActivity}
  bind:knowledgeComponent={activeKC}
  bind:hasCurriculumProfile
  bind:reset={resetSlider}
  bind:goal
  bind:model
  on:close={closeSlide}
  on:formActivityComplete={formActivityComplete}
/>

<EditActivityInModel
  bind:toggle={showActivityEditForm}
  bind:activity={activeActivity}
  bind:knowledgeComponent={activeKC}
  bind:hasCurriculumProfile
  bind:goal
  bind:model
  on:close={closeSlide}
  on:formActivityComplete={formActivityComplete}
  on:formActivityEdit={formActivityEdit}
/>

<FieldSet title={$t("model")} description={$t("model-description")}>
  <FormField title={$t("title")} forId="title-textarea">
    <Textarea bind:value={model.title} id="title-textarea" />
  </FormField>
  <FormField title={$t("description")} forId="description">
    <Textarea id="description" bind:value={model.description} rows="3" />
  </FormField>
  <div class="grid grid-cols-1 justify-items-center gap-14 pt-10">
    {#each model.statesKCArray as stateKC, i}
      <div
        class="relative"
        class:w-full={i === 0}
        class:max-w-xl={i === 0}
        class:max-w-md={i % 2 === 1}
        class:max-w-sm={i !== 0 && i % 2 !== 1}
      >
        {#if stateKC.type === "kc"}
          <KnowledgeComponent
            on:splitKC={splitKC}
            bind:knowledgeComponent={stateKC}
            bind:model
            bind:hasCurriculumProfile
            activeActivityForm={i === activeIndex}
            on:newActivity={() => newActivity(stateKC, i)}
            on:editActivity={async (event) => await editActivity(event, i)}
            index={i}
          />
        {:else if stateKC.type === "state"}
          <State
            on:deleteState={deleteState}
            bind:model
            bind:hasCurriculumProfile
            bind:stateKC
            index={i}
          />
        {/if}

        {#if i !== model.statesKCArray.length - 1}
          {#if stateKC.type === "kc"}
            <span class="absolute line-short bg-gray-200" aria-hidden="true" />
            <span class="absolute arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="relative stroke-gray-200 arrow-svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </span>
          {:else}
            <span class="absolute line bg-gray-200" aria-hidden="true" />
          {/if}
        {/if}
      </div>
    {/each}
  </div>
</FieldSet>

<style>
  .line {
    bottom: -56px;
    height: 56px;
    left: 50%;
    width: 3px;
  }

  .line-short {
    bottom: -46px;
    height: 46px;
    left: 50%;
    width: 3px;
  }

  .arrow {
    bottom: -58px;
    left: 50%;
  }

  .arrow-svg {
    left: -16px;
    width: 35px;
    height: 34px;
  }
</style>
