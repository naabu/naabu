<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { createEventDispatcher } from "svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  export let data;
  const dispatch = createEventDispatcher();

  let categoryActive = [];
  let dragItem = null;
  let finished = false;

  let successAlert = null;

  function close() {
    setDefaultValues();
    dispatch("end");
  }

  $: if (data.items) {
    let isFinished = true;
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].visible) {
        isFinished = false;
      }
    }
    finished = isFinished;
  }

  setDefaultValues();

  function setDefaultValues() {
    successAlert = {
      success: true,
      successTitle: $t("exercise-complete"),
      successMessage: $t("success-exercise"),
    };
    data.items.sort(() => Math.random() - 0.5);
    if (data.items) {
      for (let i = 0; i < data.items.length; i++) {
        data.items[i].visible = true;
        data.items[i].showError = false;
      }
    }

    if (data.categories) {
      categoryActive = [];
      for (let i = 0; i < data.categories.length; i++) {
        categoryActive.push({
          isDraggingOver: false,
          items: [],
        });
      }
    }
    data.items = data.items;
    finished = false;
  }

  function dragover(i) {
    if (!categoryActive[i].isDraggingOver) {
      categoryActive[i].isDraggingOver = true;
    }
  }

  function dragleave(i) {
    if (categoryActive[i].isDraggingOver) {
      categoryActive[i].isDraggingOver = false;
    }
  }

  function drop(i) {
    categoryActive[i].isDraggingOver = false;
    if (dragItem.categoryIndex == i) {
      categoryActive[i].items.push(dragItem);
      dragItem.visible = false;
    } else {
      dragItem.showError = true;
    }
    dragItem = null;
    data.items = data.items;
  }
</script>

<div>
  {data.question}

  <div>
    <div class="flex justify-between mt-4 mb-4">
      <div />
      <Button
        isDisabled={!finished}
        on:click={close}
        content={$t("continue")}
        color="primary"
      />
    </div>
    {#if finished}
      <ResultFeedback bind:alert={successAlert} />
    {:else}
      {#each data.items as item}
        <div
          class:invisible={!item.visible}
          class:shadow-red-300={item.showError}
          class="inline-flex shadow divide-y m-4"
          draggable="true"
          on:drag={() => (dragItem = item)}
        >
          <div class="inline-flex p-4">{item.content}</div>
        </div>
      {/each}
    {/if}
  </div>
  <ul
    class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    {#each data.categories as category, i}
      <li
        class:shadow-blue-500={categoryActive[i].isDraggingOver}
        class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        on:dragover|preventDefault={() => dragover(i)}
        on:dragleave|preventDefault={() => dragleave(i)}
        on:drop|preventDefault={() => drop(i)}
      >
        <div class="flex-1 flex flex-col p-8 min-h-56">
          <h3 class="mt-6 text-gray-900 text-sm font-medium">{category}</h3>
          {#each categoryActive[i].items as item}
            <div class="inline-flex shadow divide-y m-4 shadow-green-300">
              <div class="inline-flex p-4">{item.content}</div>
            </div>
          {/each}
        </div>
      </li>
    {/each}
  </ul>
</div>
