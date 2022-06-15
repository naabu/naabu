<script>
  import DOMPurify from "dompurify";
  import { t } from "svelte-intl-precompile";
  import ModelEdit from "$lib/Goal/Model/Edit.svelte";
  export let connection;
  export let model;
  export let goal;
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="px-4 py-5 sm:px-6">
    <h3
      data-test="title-learning-goal-connection-page"
      class="text-lg leading-6 font-medium text-gray-900"
    >
      {$t("model-page")}
    </h3>
    <div class="flex" />

    <ModelEdit bind:model bind:goal/>
  </div>

</div>
