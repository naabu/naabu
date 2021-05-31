<script>
  import { goto } from '$app/navigation';
  export let selected = "overview";

  let selectedTab;

  let tabs = [
    {
      value: 'overview',
      text: "Overview",
      url: '/beheer'
    },
    {
      value: 'activity',
      text: "Activiteiten",
      url: '/beheer/activiteit'
    },
    {
      value: 'goal',
      text: "Leerdoelen",
      url: '/beheer/leerdoel'
    },
    {
      value: 'user',
      text: "Gebruikers",
      url: '/beheer/gebruiker'
    }
  ]
  
  function gotoTab() {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].value === selectedTab) {
        goto(tabs[i].url);
      }
    }
  }

</script>

<style>

  a {
    @apply border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm;
  }

  a.selected {
    @apply border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm;
  }
</style>

<div>
  <div class="sm:hidden">
    <label for="tabs" class="sr-only">Selecteer een tab</label>
    <select bind:value={selectedTab} on:change={gotoTab} id="tabs" name="tabs" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
      {#each tabs as tab}
        <option value={tab.value} selected="{selected === tab.value}">{tab.text}</option>
      {/each}
    </select>
  </div>
  <div class="hidden sm:block">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        {#each tabs as tab}
          <a class:selected="{selected === tab.value}" href="{tab.url}" >
            {tab.text}
          </a>
        {/each}
      </nav>
    </div>
  </div>
</div>