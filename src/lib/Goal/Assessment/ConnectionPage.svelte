<script>
  import DOMPurify from "dompurify";
  import { t } from "svelte-intl-precompile";
  export let connection;
  export let assessment;
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="px-4 py-5 sm:px-6">
    <h3
      data-test="title-learning-goal-connection-page"
      class="text-lg leading-6 font-medium text-gray-900"
    >
      {$t("information")}
    </h3>
    <div class="flex">
      
      <a
        href="/leerdoel/{connection.linkId}"
        class="ml-auto font-medium text-indigo-600 hover:text-indigo-500"
      >
        {$t("show-goal")}
      </a>
    </div>
  </div>
  <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">{$t("title")}</dt>
        <dd data-test="field-Title" class="mt-1 text-sm text-gray-900">
          {connection.title}
        </dd>
      </div>
      {#if connection.fields}
        {#each connection.fields as field}
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">{field.title}</dt>
            <dd
              data-test="field-{field.title}"
              class="mt-1 text-sm text-gray-900"
            >
              {@html DOMPurify.sanitize(field.value)}
            </dd>
          </div>
        {/each}
      {/if}
    </dl>
  </div>
</div>
