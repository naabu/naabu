<script>
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import { getAlgoliaSearchClient, getGoalIndex } from "$lib/algolia";
  import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
  import DisplayMultiTopics from "./displayMultiTopics.svelte";
  import BattleListForm from "./battleListForm.svelte";
  import "@algolia/autocomplete-theme-classic";
  import QuizForm from "$lib/Quizzes/form.svelte";

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

  function setSelectedBattleIndex(index) {
    selectedBattleIndex = index;
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
    if (goal.selectedVerbs.length > 0) {
      goal.title = "Ik kan ";
      if (goal.unitopic.length > 0 && goal.taxonomy_solo.includes("solo-1")) {
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

      if (goal.fromText.length > 0) {
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
          addVerbs.push(toAddVerbs[i2]);
        }
      }
      verbs = [...verbs, ...addVerbs];
    }
  }

  let filters = "";
  let goalIndex = getGoalIndex($session.environment);

  onMount(() => {
    resetFilters();
    runAutocomplete();
  });

  function runAutocomplete() {
    const searchClient = getAlgoliaSearchClient();
    autocomplete({
      container: "#autocomplete-leerdoelen",
      placeholder: "Zoek voor leerdoelen",
      onSubmit({ state }) {
        console.log(state);
      },
      getSources({ query }) {
        return [
          {
            sourceId: goalIndex,
            onSelect({ state, item }) {
              addLeerdoel(item);
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: goalIndex,
                    query,
                    params: {
                      hitsPerPage: 5,
                    },
                    filters: filters,
                  },
                ],
              });
            },
            templates: {
              item({ item }) {
                return item.title;
              },
              noResults() {
                return "Geen leerdoelen gevonden";
              },
            },
            // ...
          },
        ];
      },
    });
  }

  function resetFilters() {
    let objectIDsFilter = goal.goalLinks.map(
      (leerdoel) => "NOT objectID:" + leerdoel.objectID
    );
    if (goal.id) {
      let ownId = "NOT objectID: " + goal.id;
      objectIDsFilter = [...objectIDsFilter, ownId];
    }
    filters = objectIDsFilter.join(" AND ");
  }

  function addLeerdoel(leerdoel) {
    goal.goalLinks = [...goal.goalLinks, leerdoel];
    resetFilters();
  }

  function removeLeerdoel(i) {
    goal.goalLinks.splice(i, 1);
    goal.goalLinks = goal.goalLinks;
    resetFilters();
  }

  $: {
    if (goal.taxonomy_solo.includes("solo-1")) {
      removeBloomSelectedItems("1", "2");
    } else if (goal.taxonomy_solo.includes("solo-2")) {
      removeBloomSelectedItems("2", "3");
    } else if (goal.taxonomy_solo.includes("solo-3")) {
      removeBloomSelectedItems("3", "4");
    } else if (goal.taxonomy_solo.includes("solo-4")) {
      removeBloomSelectedItems("3", "4", "5", "6");
    }
  }

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

  function setDisabledBloom(bloomValue) {
    let bloomColumn = bloomValue.substr(bloomValue.length - 1);
    if (
      goal.taxonomy_solo.includes("solo-1") &&
      (bloomColumn === "1" || bloomColumn === "2")
    ) {
      return false;
    }
    if (
      goal.taxonomy_solo.includes("solo-2") &&
      (bloomColumn === "2" || bloomColumn === "3")
    ) {
      return false;
    }
    if (
      goal.taxonomy_solo.includes("solo-3") &&
      (bloomColumn === "3" || bloomColumn === "4")
    ) {
      return false;
    }
    if (
      goal.taxonomy_solo.includes("solo-4") &&
      (bloomColumn === "3" ||
        bloomColumn === "4" ||
        bloomColumn === "5" ||
        bloomColumn === "6")
    ) {
      return false;
    }
    return true;
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

<div class="space-y-6 sm:space-y-5 divide-y divide-gray-200" />
<div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
  <div>
    <h3 class="text-lg leading-6 font-medium text-gray-900">Taxonomies</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">
      Probeer het leerdoel zo goed mogelijk te classifieren met SOLO en Bloom's
      taxonomy.
    </p>
  </div>
  <div class="space-y-6 sm:space-y-5 divide-y divide-gray-200">
    <div class="pt-6 sm:pt-5">
      <div role="group" aria-labelledby="label-solo">
        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
          <div>
            <div
              class="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
              id="label-solo"
            >
              SOLO taxonomy
            </div>
          </div>
          <div class="mt-4 sm:mt-0 sm:col-span-2">
            <div class="max-w-lg space-y-4">
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="unistructureel"
                    name="unistructureel"
                    value="solo-1"
                    bind:group={goal.taxonomy_solo}
                    type="radio"
                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="unistructureel" class="font-medium text-gray-700"
                    >Unistructureel</label
                  >
                  <p class="text-gray-500">
                    Leerdoel heeft te maken met maar 1 aspect
                  </p>
                </div>
              </div>
              {#if goal.taxonomy_solo.includes("solo-1")}
                <div
                  class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
                >
                  <label
                    for="uni_topic_name"
                    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Onderwerp
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      bind:value={goal.unitopic}
                      name="uni_topic_name"
                      id="uni_topic_name"
                      class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              {/if}
              <div>
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="multistructureel"
                      name="multistructureel"
                      value="solo-2"
                      bind:group={goal.taxonomy_solo}
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="multistructureel"
                      class="font-medium text-gray-700">Multistructureel</label
                    >
                    <p class="text-gray-500">
                      Leerdoel heeft te maken met meerdere aspecten.
                    </p>
                  </div>
                </div>
                {#if goal.taxonomy_solo.includes("solo-2")}
                  <DisplayMultiTopics bind:goal />
                {/if}
              </div>
              <div>
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="relationeel"
                      name="relationeel"
                      value="solo-3"
                      bind:group={goal.taxonomy_solo}
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="relationeel" class="font-medium text-gray-700"
                      >Relationeel</label
                    >
                    <p class="text-gray-500">
                      Leerdoel heeft te maken met structuur tussen aspecten in
                      context.
                    </p>
                  </div>
                </div>
                {#if goal.taxonomy_solo.includes("solo-3")}
                  <DisplayMultiTopics bind:goal />
                {/if}
              </div>
              <div>
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="overdraagbaar"
                      name="overdraagbaar"
                      value="solo-4"
                      bind:group={goal.taxonomy_solo}
                      type="radio"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="overdraagbaar" class="font-medium text-gray-700"
                      >Overdraagbaar</label
                    >
                    <p class="text-gray-500">
                      Structuur van aspecten toepasbaar op een andere context.
                    </p>
                  </div>
                </div>
                {#if goal.taxonomy_solo.includes("solo-4")}
                  <DisplayMultiTopics bind:goal />
                  <label
                    for="context_name"
                    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Nieuwe context
                  </label>
                  <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      bind:value={goal.context}
                      name="context_name"
                      id="context_name"
                      class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                Evaluaren
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
                      disabled={setDisabledBloom(
                        cognitionValue,
                        goal.taxonomy_solo
                      )}
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
</div>

<div>
  <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label for="title" class="block text-sm font-medium text-gray-700">
        Welk werkwoord past het beste bij je leerdoel?
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <select
            multiple
            bind:value={goal.selectedVerbs}
            id="selectedVerbs"
            name="selectedVerbs"
            class="resize-y max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
          >
            {#each verbs as verb}
              <option value={verb}>{verb}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="from_text"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Extra info
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <label
            for="from_text"
            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Waar moet de leerling het doen?
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2">
            <input
              type="text"
              bind:value={goal.fromText}
              name="from_text"
              id="from_text"
              class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div>
  <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="title"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Titel
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <textarea
          id="title"
          name="title"
          rows="1"
          bind:value={goal.title}
          class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>

    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="description"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Description
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <textarea
          id="description"
          name="description"
          rows="3"
          bind:value={goal.description}
          class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />
        <div class="mt-2 text-sm text-gray-500">
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
              Houd rekening met de beschrijving met de Solo taxonomy. Heeft het
              te maken met meerdere aspecten in de context of buiten de context?
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
      </div>
    </div>
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">Veldslagen</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Specificeer veldslagen en quizjes
      </p>
    </div>
    <div>
      <BattleListForm
        bind:battles={goal.battles}
        bind:index={selectedBattleIndex}
      />

      <div class="block tabs">
        <div class="border-b mb-1 border-gray-200">
          <nav 
            data-cy="battle-nav"
            class="-mb-px flex space-x-8" aria-label="Tabs">
            {#each goal.battles as battle, i}
              {#if selectedBattleIndex !== i}
                <button
                  data-cy="click-battle-{i}-button"
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
          </nav>
        </div>
      </div>
      {#if goal.battles.length > 0}
        <QuizForm
          bind:quizzes={goal.battles[selectedBattleIndex].quizzes}
          bind:selectedQuizIndex
          bind:selectedFieldIndex
        />
      {/if}
      <!-- <label
      for="battleName"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
    >
      Battle name
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <textarea
        id="battleName"
        name="battleName"
        rows="1"
        bind:value={goal.battleName}
        class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
      />
    </div> -->
    </div>
  </div>
</div>
<div class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
  <h3 class="text-lg leading-6 font-medium text-gray-900">Leerdoelen</h3>
  <p class="mt-1 max-w-2xl text-sm text-gray-500">
    Met welke leerdoelen heeft deze leerdoel te maken?
  </p>
  <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="title"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Gekoppelde leerdoelen
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        {#if goal.goalLinks.length === 0}
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Nog geen koppeling met andere leerdoelen toegevoegd
          </p>
        {:else}
          <ul>
            {#each goal.goalLinks as leerdoel, i}
              <li>
                {leerdoel.title}
                <button on:click|preventDefault={() => removeLeerdoel(i)}
                  >Weghalen</button
                >
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </div>

  <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="autocomplete-leerdoelen"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Leerdoel toevoegen
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <div id="autocomplete-leerdoelen" class="max-w-lg" />
      </div>
    </div>
  </div>
</div>
