<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import Select from "$lib/Internals/FormFields/Select.svelte";
  import TextAndRemove from "$lib/Internals/FormFields/TextAndRemove.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import { t } from "svelte-intl-precompile";

  export let data;

  let newCategory = "";
  let newItem = {
    content: "",
    categoryIndex: null,
  };

  let categoryOptions = [];

  $: if (data.categories) {
    categoryOptions = [];
    for (let i = 0; i < data.categories.length; i++) {
      categoryOptions.push({
        value: i,
        content: data.categories[i],
      });
    }
    categoryOptions = categoryOptions;
  }

  $: if (!data.categories) {
    data.categories = [];
  }

  $: if (!data.items) {
    data.items = [];
  }

  $: if (!data.question) {
    data.question = "";
  }

  function removeCategory(event) {
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].categoryIndex === event.detail.i) {
        data.items.splice(i, 1);
        i--;
      } else {
        if (data.items[i].categoryIndex > event.detail.i) {
          data.items[i].categoryIndex--;
        }
      }
    }

    data.categories.splice(event.detail.i, 1);
    data.categories = data.categories;
    data.items = data.items;
  }

  function addCategory() {
    if (newCategory.length > 0) {
      data.categories = [...data.categories, newCategory];
    }
    newCategory = "";
  }

  function onKeyPressCategory(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      addCategory();
    }
  }

  function removeItem(event) {
    data.items.splice(event.detail.i, 1);
    data.items = data.items;
  }

  function addItem() {
    if (
      newItem.content &&
      newItem.content.length > 0 &&
      newItem.categoryIndex !== null
    ) {
      newItem.category = data.categories[newItem.categoryIndex];
      data.items = [...data.items, newItem];
    }
    newItem = {
      content: "",
      categoryIndex: null,
    };
  }

  function onKeyPressItem(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      addItem();
    }
  }
</script>

<FormField title={$t("question")} forId="question" labelPosition="top">
  <TextInput id="question" bind:value={data.question} />
</FormField>

<FormField title={$t("categories")} forId="category" labelPosition="top">
  <svelte:fragment slot="before">
    <TextAndRemove
      noItemsMessage={$t("add-new-category")}
      items={data.categories}
      on:remove={removeCategory}
    />
  </svelte:fragment>
  <TextInput
    on:keypress={onKeyPressCategory}
    bind:value={newCategory}
    id="category"
  />
  <svelte:fragment slot="after">
    <Button size="small" on:click={addCategory} content={$t("add-category")} />
  </svelte:fragment>
</FormField>

{#if data.categories.length > 0}
  <FormField title={$t("items")} forId="item" labelPosition="top">
    <svelte:fragment slot="before">
      <TextAndRemove
        noItemsMessage={$t("add-new-item")}
        items={data.items}
        on:remove={removeItem}
      >
        <svelte:fragment slot="show" let:item>
          {item.content} - {item.category}
        </svelte:fragment>
      </TextAndRemove>
    </svelte:fragment>
    <FormField title={$t("content")} labelPosition="left">
      <TextInput
        on:keypress={onKeyPressItem}
        bind:value={newItem.content}
        id="item"
      />
    </FormField>
    <FormField title={$t("category")} labelPosition="left">
      <Select
        bind:value={newItem.categoryIndex}
        bind:options={categoryOptions}
      />
    </FormField>

    <svelte:fragment slot="after">
      <Button size="small" on:click={addItem} content={$t("add-item")} />
    </svelte:fragment>
  </FormField>
{/if}
