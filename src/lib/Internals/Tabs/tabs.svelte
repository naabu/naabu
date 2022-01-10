<script>
  import { goto } from "$app/navigation";

  export let mainTabs;
  export let subTabs;
  export let mainSelected;
  export let subSelected;

  let mainSelectedTab = mainSelected;
  let subSelectedTab = subSelected;

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
  <div class="sm:hidden">
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
    {#if subTabs}
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
    {/if}
  </div>
  <div class="hidden sm:block">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex" aria-label="Tabs">
        <div class="flex space-x-8">
          {#each mainTabs as tab}
            <a
              data-cy="maintab-{tab.value}"
              class:selected={mainSelected === tab.value}
              href={tab.url}
            >
              {tab.text}
            </a>
          {/each}
        </div>
        {#if subTabs}
          <div class="ml-auto flex space-x-8">
            {#each subTabs as tab}
              <a
                data-cy="subtab-{tab.value}"
                class=""
                class:selected={subSelected === tab.value}
                href={tab.url}
              >
                {tab.text}
              </a>
            {/each}
          </div>
        {/if}
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