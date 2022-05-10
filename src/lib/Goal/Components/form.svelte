<script>
  import DisplayMultiTopics from "$lib/Goal/Components/displayMultiTopics.svelte";
  import BattleListForm from "$lib/Goal/Components/battleListForm.svelte";
  import QuizForm from "$lib/Activity/Components/quizzesForm.svelte";
  import Radio from "$lib/Internals/FormFields/Radio.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import Select from "$lib/Internals/FormFields/Select.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import { t, locale } from "svelte-intl-precompile";
  import Button from "$lib/Internals/Button/Button.svelte";

  export let goal;

  let selectedQuizIndex = 0;
  let selectedFieldIndex = -1;

  let selectedBattleIndex = 0;
  let verbs;
  let selectedColumnId = [];

  let bloomCheckValues = [
    ["bloom1-1", "bloom1-2", "bloom1-3", "bloom1-4", "bloom1-5", "bloom1-6"],
    ["bloom2-1", "bloom2-2", "bloom2-3", "bloom2-4", "bloom2-5", "bloom2-6"],
    ["bloom3-1", "bloom3-2", "bloom3-3", "bloom3-4", "bloom3-5", "bloom3-6"],
    ["bloom4-1", "bloom4-2", "bloom4-3", "bloom4-4", "bloom4-5", "bloom4-6"],
  ];

  let bloomVerbs = [
    {
      id: "1",
      verbs: [
        $t("naming-plural"),
        $t("defining-plural"),
        $t("describing-plural"),
        $t("showing-plural"),
        $t("identifying-plural"),
        $t("collecting-plural"),
      ],
    },
    {
      id: "2",
      verbs: [
        $t("interpreting-plural"),
        $t("summarizing-plural"),
        $t("discussing-plural"),
        $t("distinguishing-plural"),
        $t("classifying-plural"),
        $t("comparing-plural"),
        $t("explaining-plural"),
        $t("concluding-plural"),
        $t("predicting-plural"),
      ],
    },
    {
      id: "3",
      verbs: [
        $t("calculating-plural"),
        $t("converting-plural"),
        $t("applying-plural"),
        $t("showing-plural"),
        $t("solving-plural"),
        $t("investigating-plural"),
        $t("adjusting-plural"),
        $t("demonstrating-plural"),
        $t("adding-plural"),
        $t("illustrating-plural"),
      ],
    },
    {
      id: "4",
      verbs: [
        $t("analyzing-plural"),
        $t("separating-plural"),
        $t("ordering-plural"),
        $t("explaining-plural"),
        $t("connecting-plural"),
        $t("classifying-plural"),
        $t("de-constructing-plural"),
        $t("comparing-plural"),
        $t("selecting"),
        $t("deducing-plural"),
      ],
    },
    {
      id: "5",
      verbs: [
        $t("judging-plural"),
        $t("ordering-plural"),
        $t("assesing-plural"),
        $t("measuring-plural"),
        $t("convincing-plural"),
        $t("selecting-plural"),
        $t("explaining-plural"),
        $t("concluding-plural"),
        $t("comparing-plural"),
        $t("summarizing-plural"),
      ],
    },
    {
      id: "6",
      verbs: [
        $t("combining-plural"),
        $t("planning-plural"),
        $t("designing-plural"),
        $t("creating-plural"),
        $t("developing-plural"),
        $t("researching-plural"),
        $t("setting-up-plural"),
        $t("formulating-plural"),
        $t("rewriting-plural"),
      ],
    },
  ];

  let soloRadioOptions = [
    {
      value: "solo-1",
      label: $t("unistructural"),
      description: $t("unistructural-description"),
    },
    {
      value: "solo-2",
      label: $t("multi-structural"),
      description: $t("multi-structural-description"),
    },
    {
      value: "solo-3",
      label: $t("relational"),
      description: $t("relational-description"),
    },
    {
      value: "solo-4",
      label: $t("transferable"),
      description: $t("transferable-description"),
    },
  ];

  $: {
    selectedColumnId = [];
    for (let i = 0; i < goal.selectedVerbs.length; i++) {
      let columnId = getIdFromVerbs(goal.selectedVerbs[i]);
      if (!selectedColumnId.includes(columnId)) {
        selectedColumnId = [...selectedColumnId, columnId];
      }
    }
    generateGoalTitle();
  }

  $: if (selectedBattleIndex) {
    selectedQuizIndex = 0;
    selectedFieldIndex = -1;
  }

  function generateMulti(arrayValues) {
    let output = "";
    if (arrayValues.length > 1) {
      let slicedArray = arrayValues.slice(0, arrayValues.length - 1);
      output += slicedArray.join(", ");
      if (arrayValues.length > 2) {
        output +=
          ", " + $t("and") + " " + arrayValues[arrayValues.length - 1] + " ";
      } else if (arrayValues.length > 1) {
        output +=
          " " + $t("and") + " " + arrayValues[arrayValues.length - 1] + " ";
      }
    } else if (arrayValues.length > 0) {
      {
        output += arrayValues[arrayValues.length - 1] + " ";
      }
    }
    return output;
  }

  function generateBeginning() {
    let title = $t("i-can") + " ";
    return title;
  }

  function generateTopics() {
    let topics = "";
    if (
      goal.unitopic &&
      goal.unitopic.length > 0 &&
      goal.taxonomy_solo.includes("solo-1")
    ) {
      topics += goal.unitopic + " ";
    }

    if (goal.taxonomy_solo.includes("solo-2")) {
      topics += generateMulti(goal.multitopics);
    }
    if (goal.taxonomy_solo.includes("solo-3")) {
      topics += generateMulti(goal.multitopics);
    }
    if (goal.taxonomy_solo.includes("solo-4")) {
      topics += generateMulti(goal.multitopics);
    }
    return topics;
  }

  function generateVerbs() {
    let verbs = "";
    verbs = generateMulti(goal.selectedVerbs);
    return verbs;
  }

  function generateFromText() {
    let fromText = "";
    if (goal.fromText && goal.fromText.length > 0) {
      fromText = goal.fromText;
    }
    return fromText;
  }

  function generateGoalTitle() {
    goal.suggestedTitles = [];
    let title = "";
    title += generateBeginning();
    if ($locale === "nl") {
      title += generateTopics();
      title += generateVerbs();
    }
    else {
      title += generateVerbs();
      title += generateTopics();
    } 
    title += generateFromText();

    if (goal.selectedVerbs && goal.selectedVerbs.length > 0) {
      goal.suggestedTitles = [...goal.suggestedTitles, title];
    }
  }

  function getVerbs(column) {
    for (let i = 0; i < bloomVerbs.length; i++) {
      if (bloomVerbs[i].id === column) {
        return bloomVerbs[i].verbs;
      }
    }
    return [];
  }

  function getIdFromVerbs(verbValue) {
    for (let i = 0; i < bloomVerbs.length; i++) {
      if (bloomVerbs[i].verbs.includes(verbValue)) {
        return bloomVerbs[i].id;
      }
    }
    return null;
  }

  $: {
    verbs = [];
    for (let i = 0; i < goal.taxonomy_bloom.length; i++) {
      let lastChar = goal.taxonomy_bloom[i].substr(
        goal.taxonomy_bloom[i].length - 1
      );
      let toAddVerbs = getVerbs(lastChar);

      let addVerbs = [];
      for (let i2 = 0; i2 < toAddVerbs.length; i2++) {
        if (!verbs.includes(toAddVerbs[i2])) {
          addVerbs.push({ value: toAddVerbs[i2], content: toAddVerbs[i2] });
        }
      }
      verbs = [...verbs, ...addVerbs];
    }
  }

  export let battleTabs = [];

  $: if (goal.battles) {
    battleTabs = [];
    for (let i = 0; i < goal.battles.length; i++) {
      battleTabs.push({
        text: goal.battles[i].name,
        value: i,
      });
    }
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
    integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
    crossorigin="anonymous"
  />
</svelte:head>

<FieldSet title={$t("taxonomies")} description={$t("taxonomies-description")}>
  <FormField title={$t("solo-taxonomy")}>
    <Radio bind:selectedValue={goal.taxonomy_solo} options={soloRadioOptions} />
  </FormField>

  {#if goal.taxonomy_solo.includes("solo-1")}
    <FormField title={$t("topic")} forId="uni_topic_name">
      <TextInput bind:value={goal.unitopic} id="uni_topic_name" />
    </FormField>
  {/if}

  {#if goal.taxonomy_solo.includes("solo-2") || goal.taxonomy_solo.includes("solo-3") || goal.taxonomy_solo.includes("solo-4")}
    <DisplayMultiTopics bind:goal />
  {/if}
  {#if goal.taxonomy_solo.includes("solo-4")}
    <FormField title={$t("new-context")} forId="context_name">
      <TextInput bind:value={goal.context} id="context_name" />
    </FormField>
  {/if}
  <div class="space-y-6 sm:space-y-5 divide-y divide-gray-200">
    <div class="space-y-6 sm:space-y-5 divide-y divide-gray-200">
      <div class="pt-6 sm:pt-5">
        <div role="group" aria-labelledby="label-solo">
          <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
            <div>
              <div
                class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                id="label-solo"
              >
                {$t("blooms-taxonomy")}
              </div>
            </div>
            <div
              class="mt-4 sm:mt-0 sm:col-span-2 grid grid-cols-taxonomy justify-center auto-cols-min"
            >
              <div />
              <div class="content-center flex h-12 items-end relative -left-8">
                {$t("remember")}
              </div>
              <div class="content-center flex h-12 relative -left-5">
                {$t("understand")}
              </div>
              <div class="content-center flex h-12 items-end relative -left-7">
                {$t("apply")}
              </div>
              <div class="content-center flex h-12 relative -left-7">
                {$t("analyze")}
              </div>
              <div class="content-center flex h-12 items-end relative -left-7">
                {$t("evaluate")}
              </div>
              <div class="content-center flex h-12 relative -left-3">
                {$t("creating-bloom")}
              </div>
              {#each bloomCheckValues as knowledgeArray, i}
                {#if i == 0}
                  {$t("facts")}
                {:else if i == 1}
                  {$t("concepts")}
                {:else if i == 2}
                  {$t("processes")}
                {:else if i == 3}
                  {$t("meta-cognition")}
                {/if}
                {#each knowledgeArray as cognitionValue}
                  <div class="content-center">
                    <input
                      id={cognitionValue}
                      name={cognitionValue}
                      bind:group={goal.taxonomy_bloom}
                      value={cognitionValue}
                      type="checkbox"
                      class="disabled:opacity-50 bg-black-500focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                {/each}
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</FieldSet>

<FieldSet title={$t("goal")} description={$t("goal-description")}>
  <FormField title={$t("select-verb-description")}>
    <Select
      bind:value={goal.selectedVerbs}
      bind:options={verbs}
      id="select-verbs"
      multiple={true}
    />
  </FormField>
  <FormField title={$t("from_where-learning-goal")} forId="from_text">
    <TextInput bind:value={goal.fromText} id="from_text" />
  </FormField>
  {#if goal.suggestedTitles && goal.suggestedTitles.length > 0}
    {#each goal.suggestedTitles as suggestedTitle}
      <FormField title={$t("goal-suggested-title")} labelPosition="left">
        <span>
          {suggestedTitle}
          <Button
            on:click={() => (goal.title = suggestedTitle)}
            content={$t("apply")}
          />
        </span>
      </FormField>
    {/each}
  {/if}

  <FormField title={$t("title")} forId="title-textarea">
    <Textarea bind:value={goal.title} id="title-textarea" />
  </FormField>
  <FormField title={$t("description")} forId="description">
    <Textarea id="description" bind:value={goal.description} rows="3" />
    <svelte:fragment slot="after">
      <div class="ml-4 mt-2 text-sm text-gray-500">
        <ul class="list-disc">
          <li>
            {$t("try-the-worlds")}
            <a class="underline" href="/beheer/leerdoel/woorden-bloom"
              >{$t("blooms-taxonomy")}</a
            >
            {$t("to-describe-the-goal")}
          </li>
          <li>
            {$t("describe-text-goal")}
            (<a
              class="underline"
              href="https://www.leroyseijdel.nl/doelen-stellen/smart-leerdoelen-voorbeelden/"
              >{$t("smart")}</a
            >)
          </li>
          <li>
            {$t("take-into-account-solo")}
          </li>
        </ul>
        <br />
        <b>{$t("examples")}</b>
        <ul class="list-disc">
          <li>
            {$t("example-goal-1")}
          </li>
          <li>
            {$t("example-goal-2")}
          </li>
          <li>
            {$t("example-goal-3")}
          </li>
        </ul>
      </div>
    </svelte:fragment>
  </FormField>
</FieldSet>
