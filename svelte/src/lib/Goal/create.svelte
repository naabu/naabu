<script>
  import { getFirebaseFirestore } from "$lib/firebase";
  import { collection, addDoc } from "firebase/firestore";
  import { session } from "$app/stores";
  $: console.log($session);

  let bloomCheckValues =[
    ['bloom1-1', 'bloom1-2', 'bloom1-3', 'bloom1-4', 'bloom1-5', 'bloom1-6' ],
    ['bloom2-1', 'bloom2-2', 'bloom2-3', 'bloom2-4', 'bloom2-5', 'bloom2-6' ],
    ['bloom3-1', 'bloom3-2', 'bloom3-3', 'bloom3-4', 'bloom3-5', 'bloom3-6' ],
    ['bloom4-1', 'bloom4-2', 'bloom4-3', 'bloom4-4', 'bloom4-5', 'bloom4-6' ]
  ]

  let bloomCheckedValues = [];
  let soloCheckedValues = [];
  let title = "";
  $:console.log(title);
  $:console.log(soloCheckedValues);
  $:console.log(bloomCheckedValues);

  async function createGoal() {
    const db = await getFirebaseFirestore($session.environment);
    const data = {
      title: title,
      taxonomy_solo: soloCheckedValues,
      taxonomy_bloom: bloomCheckedValues,
    };
    try {
      await addDoc(collection(db, "goals"), data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function formSubmit(event) {
    await createGoal();
  }


</script>

<div>

  <div>
    <nav class="sm:hidden" aria-label="Back">
      <a
        href="/beheer/leerdoel"
        class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200"
      >
        <!-- Heroicon name: solid/chevron-left -->
        <svg
          class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        Back
      </a>
    </nav>
    <nav class="hidden sm:flex" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <a
                href="/beheer"
                class="text-sm font-medium text-gray-400 hover:text-gray-200"
                >Beheer</a
              >
            </a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <!-- Heroicon name: solid/chevron-right -->
            <svg
              class="flex-shrink-0 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <a
              href="/beheer/leerdoel"
              class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
              >Leerdoel</a
            >
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <!-- Heroicon name: solid/chevron-right -->
            <svg
              class="flex-shrink-0 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <a
              href="#"
              aria-current="page"
              class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
              >Leerdoel maken</a
            >
          </div>
        </li>
      </ol>
    </nav>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">Leerdoel maken</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Als je een leerdoel maakt wordt niet niet meteen gepuliceerd. Dat kan pas nadat je hem aangemaakt hebt.
          </p>
        </div>
      </div>

    </div>
  </div>
  <form class="space-y-8 divide-y divide-gray-200" on:submit|preventDefault={formSubmit}>
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
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
                rows="3"
                bind:value={title}
                class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
              <div class="mt-2 text-sm text-gray-500">
                <ul class="list-disc">
                  <li>Probeer de <a class="underline"  href="/beheer/leerdoel/woorden-bloom">woorden van Bloom's taxonomy</a> aan te houden om het leerdoel te beschrijven.</li>
                  <li>Probeer het leerdoel te omschrijven zodat het specifiek, meetbaar, acceptabel, realistisch en tijdsgebonden kan zijn (<a class="underline" href="https://www.leroyseijdel.nl/doelen-stellen/smart-leerdoelen-voorbeelden/">SMART</a>) </li>
                  <li>Houd rekening met de beschrijving met de Solo taxonomy. Heeft het te maken met meerdere aspecten in de context of buiten de context?</li>
                </ul>
                <br/>
                <b>Voorbeelden</b>
                <ul class="list-disc">
                  <li>Herken en beschrijf de structuur van een exponentieele formule</li>
                  <li>Opstellen van een exponentieele formule uit tekst</li>
                  <li>Kan classifieren van voorbeelden van linaire en exponentiele verbanden</li> 
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5"
      >
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Taxonomies
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Probeer het leerdoel zo goed mogelijk te classifieren met SOLO en Bloom's taxonomy.
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
                          bind:group = {soloCheckedValues}
                          type="checkbox"
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
                    <div>
                      <div class="relative flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="multistructureel"
                            name="multistructureel"
                            value="solo-2"
                            bind:group = {soloCheckedValues}
                            type="checkbox"
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
                    </div>
                    <div>
                      <div class="relative flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="relationeel"
                            name="relationeel"
                            value="solo-3"
                            bind:group = {soloCheckedValues}
                            type="checkbox"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="relationeel" class="font-medium text-gray-700"
                            >Relationeel</label
                          >
                          <p class="text-gray-500">
                            Leerdoel heeft te maken met structuur tussen aspecten in context.
                          </p>
                        </div>
                      </div>
                    </div>
                      <div>
                      <div class="relative flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="overdraagbaar"
                            name="overdraagbaar"
                            value="solo-4"
                            bind:group = {soloCheckedValues}
                            type="checkbox"
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
                  <div class="mt-4 sm:mt-0 sm:col-span-2 grid grid-cols-taxonomy justify-center auto-cols-min">
               
                    <div/>
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
                    <div class="content-center flex h-12 relative -left-3">
                      Maken
                    </div>
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
                            id="{cognitionValue}"
                            name="{cognitionValue}"
                            bind:group={bloomCheckedValues}
                            value={cognitionValue}
                            type="checkbox"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
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

    <div class="pt-5">
      <div class="flex justify-end">
        <button
          type="submit"
          class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Leerdoel aanmaken
        </button>
      </div>
    </div>
  </form>

  
</div>
