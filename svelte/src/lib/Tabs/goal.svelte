<script>
  import { goto } from "$app/navigation";
  export let mainSelected = "goal";
  export let subSelected = "read";
  export let goal;

  let mainSelectedTab = mainSelected;
  let subSelectedTab = subSelected;


  let mainTabs = [
    {
      value: "goal",
      text: "Leerdoel",
      url: "/leerdoel/" + goal.id,
    },
    {
      value: "talk",
      text: "Overleg",
      url: "/leerdoel/" + goal.id + "/overleg",
    },
    {
      value: "adventures",
      text: "Avonturen",
      url: "/leerdoel/" + goal.id + "/avonturen",
    },
  ];

  let subTabs = [
    {
      value: "read",
      text: "Lezen",
      url: "/leerdoel/" + goal.id,
    },
    {
      value: "edit",
      text: "Bewerken",
      url: "/beheer/leerdoel/" + goal.id + "/wijzigen",
    },
    {
      value: "history",
      text: "Geschiedenis",
      url: "/leerdoel/" + goal.id + "/geschiedenis",
    },
  ];

  function gotoMainTab() {
    for (let i = 0; i < mainTabs.length; i++) {
      if (mainTabs[i].value === mainSelectedTab) {
        goto(mainTabs[i].url);
      }
    }
  }

  function gotoSubTab() {
    for (let i = 0; i < subTabs.length; i++) {
      if (subTabs[i].value === subSelectedTab) {
        goto(subTabs[i].url);
      }
    }
  }
</script>

<div>
  <div class="sm:hidden mb-8">
    <label for="tabs" class="sr-only">Selecteer een tab</label>
    <select
      bind:value={mainSelectedTab}
      on:change={gotoMainTab}
      id="tabs"
      name="tabs"
      class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {#each mainTabs as tab}
        <option value={tab.value} selected={mainSelected === tab.value}
          >{tab.text}</option
        >
      {/each}
    </select>

    <label for="subTabs" class="sr-only">Selecteer een tab</label>
    <select
      bind:value={subSelectedTab}
      on:change={gotoSubTab}
      id="tabs"
      name="tabs"
      class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {#each subTabs as tab}
        <option value={tab.value} selected={subSelected === tab.value}
          >{tab.text}</option
        >
      {/each}
    </select>
  </div>
  <div class="hidden sm:block mb-8">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex" aria-label="Tabs">
        <div class="flex space-x-8">
          {#each mainTabs as tab}
            <a class:selected={mainSelected === tab.value} href={tab.url}>
              {tab.text}
            </a>
          {/each}
        </div>
        <div class="ml-auto flex space-x-8">
          {#each subTabs as tab}
            <a class="" class:selected={subSelected === tab.value} href={tab.url}>
              {tab.text}
            </a>
          {/each}
        </div>
      </nav>
    </div>
  </div>
</div>

<style>
  a {
    @apply border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm;
  }

  a.selected {
    @apply border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm;
  }
</style>
