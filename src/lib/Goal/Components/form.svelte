<script>
  import DisplayMultiTopics from "$lib/Goal/Components/displayMultiTopics.svelte";
  import BattleListForm from "$lib/Goal/Components/battleListForm.svelte";
  import QuizForm from "$lib/Activity/Components/quizzesForm.svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import Radio from "$lib/Internals/FormFields/Radio.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import Select from "$lib/Internals/FormFields/Select.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";

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
        "benoemen",
        "definieren",
        "beschrijven",
        "tonen",
        "identificeren",
        "verzamelen",
      ],
    },
    {
      id: "2",
      verbs: [
        "interpreteren",
        "samenvatten",
        "bespreken",
        "onderscheiden",
        "classificeren",
        "vergelijken",
        "uitleggen",
        "concluderen",
        "voorspellen",
      ],
    },
    {
      id: "3",
      verbs: [
        "berekenen",
        "opstellen",
        "omzetten",
        "toepassen",
        "tonen",
        "oplossen",
        "onderzoeken",
        "aanpassen",
        "demonstreren",
        "aanvullen",
        "illustreren",
      ],
    },
    {
      id: "4",
      verbs: [
        "analyseren",
        "scheiden",
        "ordenen",
        "uitleggen",
        "verbinden",
        "classificeren",
        "(de)construeren",
        "vergelijken",
        "selecteren",
        "afleiden",
      ],
    },
    {
      id: "5",
      verbs: [
        "beoordelen",
        "ordenen",
        "toetsen",
        "meten",
        "overtuigen",
        "selecteren",
        "uitleggen",
        "concluderen",
        "vergelijken",
        "samenvatten",
      ],
    },
    {
      id: "6",
      verbs: [
        "combineren",
        "plannen",
        "ontwerpen",
        "maken",
        "ontwikkelen",
        "onderzoeken",
        "opstellen",
        "formuleren",
        "herschrijven",
      ],
    },
  ];

  let soloRadioOptions = [
    {
      value: "solo-1",
      label: "Unistructureel",
      description: "Leerdoel heeft te maken met maar 1 aspect.",
    },
    {
      value: "solo-2",
      label: "Multistructureel",
      description: "Leerdoel heeft te maken met meerdere aspecten.",
    },
    {
      value: "solo-3",
      label: "Relationeel",
      description:
        "Leerdoel heeft te maken met structuur tussen aspecten in context.",
    },
    {
      value: "solo-4",
      label: "Overdraagbaar",
      description: "Structuur van aspecten toepasbaar op een andere context.",
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
        output += ", en " + arrayValues[arrayValues.length - 1] + " ";
      } else if (arrayValues.length > 1) {
        output += " en " + arrayValues[arrayValues.length - 1] + " ";
      }
    } else if (arrayValues.length > 0) {
      {
        output += arrayValues[arrayValues.length - 1] + " ";
      }
    }
    return output;
  }

  function generateGoalTitle() {
    if (goal.selectedVerbs && goal.selectedVerbs.length > 0) {
      goal.title = "Ik kan ";
      if (
        goal.unitopic &&
        goal.unitopic.length > 0 &&
        goal.taxonomy_solo.includes("solo-1")
      ) {
        goal.title += goal.unitopic + " ";
      }

      if (goal.taxonomy_solo.includes("solo-2")) {
        goal.title += generateMulti(goal.multitopics);
      }
      if (goal.taxonomy_solo.includes("solo-3")) {
        goal.title += generateMulti(goal.multitopics);
      }
      if (goal.taxonomy_solo.includes("solo-4")) {
        goal.title += generateMulti(goal.multitopics);
      }
      goal.title += generateMulti(goal.selectedVerbs);

      if (goal.fromText && goal.fromText.length > 0) {
        goal.title += goal.fromText;
      }
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

  // $: {
  //   if (goal.taxonomy_solo.includes("solo-1")) {
  //     removeBloomSelectedItems("1", "2");
  //   } else if (goal.taxonomy_solo.includes("solo-2")) {
  //     removeBloomSelectedItems("2", "3");
  //   } else if (goal.taxonomy_solo.includes("solo-3")) {
  //     removeBloomSelectedItems("3", "4");
  //   } else if (goal.taxonomy_solo.includes("solo-4")) {
  //     removeBloomSelectedItems("3", "4", "5", "6");
  //   }
  // }

  function removeBloomSelectedItems(column1, column2, column3, column4) {
    let newArray = [];
    for (let i = 0; i < goal.taxonomy_bloom.length; i++) {
      let lastChar = goal.taxonomy_bloom[i].substr(
        goal.taxonomy_bloom[i].length - 1
      );
      if (
        lastChar === column1 ||
        lastChar === column2 ||
        lastChar === column3 ||
        lastChar === column4
      ) {
        newArray.push(goal.taxonomy_bloom[i]);
      }
    }
    goal.taxonomy_bloom = newArray;
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

<FieldSet
  title="Taxonomies"
  description="Probeer het leerdoel zo goed mogelijk te classifieren met SOLO en Bloom's
taxonomy."
>
  <FormField title="SOLO taxonomy">
    <Radio bind:selectedValue={goal.taxonomy_solo} options={soloRadioOptions} />
  </FormField>

  {#if goal.taxonomy_solo.includes("solo-1")}
    <FormField title="Onderwerp" forId="uni_topic_name">
      <TextInput bind:value={goal.unitopic} id="uni_topic_name" />
    </FormField>
  {/if}

  {#if goal.taxonomy_solo.includes("solo-2") || goal.taxonomy_solo.includes("solo-3") || goal.taxonomy_solo.includes("solo-4")}
    <DisplayMultiTopics bind:goal />
  {/if}
  {#if goal.taxonomy_solo.includes("solo-4")}
    <FormField title="Nieuwe context" forId="context_name">
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
                Bloom's taxonomy
              </div>
            </div>
            <div
              class="mt-4 sm:mt-0 sm:col-span-2 grid grid-cols-taxonomy justify-center auto-cols-min"
            >
              <div />
              <div class="content-center flex h-12 items-end relative -left-8">
                Herinneren
              </div>
              <div class="content-center flex h-12 relative -left-5">
                Begrijpen
              </div>
              <div class="content-center flex h-12 items-end relative -left-7">
                Toepassen
              </div>
              <div class="content-center flex h-12 relative -left-7">
                Analyseren
              </div>
              <div class="content-center flex h-12 items-end relative -left-7">
                Evalueren
              </div>
              <div class="content-center flex h-12 relative -left-3">Maken</div>
              {#each bloomCheckValues as knowledgeArray, i}
                {#if i == 0}
                  Feiten
                {:else if i == 1}
                  Concepten
                {:else if i == 2}
                  Processen
                {:else if i == 3}
                  Leren leren
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

<FieldSet
  title="Leerdoel"
  description="Omschrijf het leerdoel zo concreet mogelijk."
>
  <FormField title="Welk werkwoord past het beste bij je leerdoel?">
    <Select
      bind:value={goal.selectedVerbs}
      bind:options={verbs}
      id="select-verbs"
      multiple={true}
    />
  </FormField>
  <FormField
    title="Waar moet de leerling het leerdoel kunnen toepassen?"
    forId="from_text"
  >
    <TextInput bind:value={goal.fromText} id="from_text" />
  </FormField>
  <FormField title="Titel" forId="title-textarea">
    <Textarea bind:value={goal.title} id="title-textarea" />
  </FormField>
  <FormField title="Omschrijving" forId="description">
    <Textarea id="description" bind:value={goal.description} rows="3" />
    <svelte:fragment slot="after">
      <div class="ml-4 mt-2 text-sm text-gray-500">
        <ul class="list-disc">
          <li>
            Probeer de <a
              class="underline"
              href="/beheer/leerdoel/woorden-bloom"
              >woorden van Bloom's taxonomy</a
            > aan te houden om het leerdoel te beschrijven.
          </li>
          <li>
            Probeer het leerdoel te omschrijven zodat het specifiek, meetbaar,
            acceptabel, realistisch en tijdsgebonden kan zijn (<a
              class="underline"
              href="https://www.leroyseijdel.nl/doelen-stellen/smart-leerdoelen-voorbeelden/"
              >SMART</a
            >)
          </li>
          <li>
            Houd rekening met de beschrijving met de Solo taxonomy. Heeft het te
            maken met meerdere aspecten in de context of buiten de context?
          </li>
        </ul>
        <br />
        <b>Voorbeelden</b>
        <ul class="list-disc">
          <li>
            Herken en beschrijf de structuur van een exponentieele formule
          </li>
          <li>Opstellen van een exponentieele formule uit tekst</li>
          <li>
            Kan classifieren van voorbeelden van linaire en exponentiele
            verbanden
          </li>
        </ul>
      </div>
    </svelte:fragment>
  </FormField>
</FieldSet>

<FieldSet
  title="Testen"
  description="Leerlingen bewijzen met deze testen dat ze het leerdoel beheersen."
>
  <div>
    {#if goal.battles}
      <BattleListForm
        bind:battles={goal.battles}
        bind:index={selectedBattleIndex}
      />
    {/if}

    <Tabs
      id="battle"
      mainTabs={battleTabs}
      mainSelected={selectedBattleIndex}
    />

    <!-- <div class="block tabs">
      <div class="border-b mb-1 border-gray-200">
        <nav
          data-test="battle-nav"
          class="-mb-px flex space-x-8"
          aria-label="Tabs"
        >
          {#if goal.battles}
            {#each goal.battles as battle, i}
              {#if selectedBattleIndex !== i}
                <button
                  data-test="click-battle-{i}-button"
                  on:click|preventDefault={() => setSelectedBattleIndex(i)}
                  class="outline-none active:outline-none focus:outline-none border-transparent  text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  {battle.name}
                </button>
              {:else}
                <button
                  on:click|preventDefault={() => setSelectedBattleIndex(i)}
                  class="outline-none active:outline-none focus:outline-none border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  {battle.name}
                </button>
              {/if}
            {/each}
          {/if}
        </nav>
      </div>
    </div> -->
    {#if goal.battles && goal.battles.length > 0}
      <QuizForm
        bind:quizzes={goal.battles[selectedBattleIndex].quizzes}
        bind:selectedQuizIndex
        bind:selectedFieldIndex
      />
    {/if}
  </div>
</FieldSet>
