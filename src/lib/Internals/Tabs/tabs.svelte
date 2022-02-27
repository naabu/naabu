<script>
  import { goto } from "$app/navigation";
  import { createEventDispatcher } from "svelte";
  import { t } from "svelte-intl-precompile";

  export let mainTabs;
  export let subTabs;
  export let mainSelected;
  export let subSelected;
  export let id = "tabs";

  let dispatch = createEventDispatcher();

  function gotoMainTab() {
    dispatch("click");
    for (let i = 0; i < mainTabs.length; i++) {
      if (mainTabs[i].value === mainSelected) {
        if (mainTabs[i].url) {
          goto(mainTabs[i].url);
        }
      }
    }
  }

  function gotoSubTab() {
    dispatch("click");
    for (let i = 0; i < subTabs.length; i++) {
      if (subTabs[i].value === subSelected) {
        if (subTabs[i].url) {
          goto(subTabs[i].url);
        }
      }
    }
  }

  function clickMainTab(tab) {
    mainSelected = tab.value;
    gotoMainTab();
  }

  function clickSubTab(tab) {
    subSelected = tab.value;
    gotoSubTab();
  }

  let allAClasses = [
    "whitespace-nowrap",
    "py-4",
    "px-1",
    "border-b-2",
    "font-medium text-sm",
  ];

  let nonSelectedAClasses = [
    "border-transparent",
    "text-gray-500",
    "hover:text-gray-700",
    "hover:border-gray-300",
  ];

  let selectedAClasses = ["border-indigo-500", "text-indigo-600"];

  function getClasses(tab, selectedTab) {
    let classes = allAClasses;
    if (tab.value === selectedTab) {
      classes = [...classes, ...selectedAClasses];
    } else {
      classes = [...classes, ...nonSelectedAClasses];
    }

    return classes.join(" ");
  }

  $: if (mainTabs) {
    for (let i = 0; i < mainTabs.length; i++) {
      if (!mainTabs[i].dataTest) {
        mainTabs[i].dataTest = id + "-main-" + mainTabs[i].value;
      }
    }
  }

  $: if (subTabs) {
    for (let i = 0; i < subTabs.length; i++) {
      if (!subTabs[i].dataTest) {
        subTabs[i].dataTest = id + "-sub-" + subTabs[i].value;
      }
    }
  }
</script>

<div>
  <div class="sm:hidden">
    <label for="main-{id}" class="sr-only">{$t("select-a-tab")}</label>
    <select
      bind:value={mainSelected}
      on:change={gotoMainTab}
      id="main-{id}"
      name="main-{id}"
      class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {#each mainTabs as tab}
        <option value={tab.value} selected={mainSelected === tab.value}
          >{tab.text}</option
        >
      {/each}
    </select>
    {#if subTabs}
      <label for="sub-{id}" class="sr-only">{$t("select-a-tab")}</label>
      <select
        bind:value={subSelected}
        on:change={gotoSubTab}
        id="sub-{id}"
        name="sub-{id}"
        class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {#each subTabs as tab}
          <option value={tab.value} selected={subSelected === tab.value}
            >{tab.text}</option
          >
        {/each}
      </select>
    {/if}
    <slot name="after-main-tabs" mobile={true} />
  </div>
  <div class="hidden sm:block">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex" aria-label="Tabs">
        <div class="flex space-x-8">
          {#each mainTabs as tab}
            <a
              data-test={tab.dataTest}
              class={getClasses(tab, mainSelected)}
              href={tab.url}
              on:click|preventDefault={() => clickMainTab(tab)}
            >
              {tab.text}
            </a>
          {/each}
          <slot name="after-main-tabs" mobile={false} />
        </div>
        {#if subTabs}
          <div class="ml-auto flex space-x-8">
            {#each subTabs as tab}
              <a
                data-test={tab.dataTest}
                class={getClasses(tab, subSelected)}
                href={tab.url}
                on:click|preventDefault={() => clickSubTab(tab)}
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
