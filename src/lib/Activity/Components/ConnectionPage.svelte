<script>
  import { getStores, page } from "$app/stores";
  import DOMPurify from 'dompurify';
  import { t } from "svelte-intl-precompile";
  import { getDifficultyToString, getTypeText } from "./helper";
  export let connection;
  export let isTeacher = false;
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="px-4 py-5 sm:px-6">
    <h3
      data-test="title-learning-goal-connection-page"
      class="text-lg leading-6 font-medium text-gray-900"
    >
      {$t("connection-goal-activity-information")}
    </h3>
    <div class="flex">
      <div class="ml-auto">
        {#if isTeacher && !connection.archive}
          <a
            data-test="edit-activity-page-link"
            href="/lerarenkamer/activiteit/{connection.linkId}"
            class="mr-8 font-medium text-indigo-600 hover:text-indigo-500"
          >
            {$t("change-activity")}
          </a>
        {/if}
        {#if !connection.archive}
          <a
            href="/activiteit/{connection.linkId}?redirect={$page.url.pathname}"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {$t("show-activity")}
          </a>
        {:else}
          <div
            class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
          >
            {$t("archived")}
          </div>
        {/if}
      </div>
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
            <dt class="text-sm font-medium text-gray-500">{$t(field.title)}</dt>
            <dd
              data-test="field-{field.title}"
              class="mt-1 text-sm text-gray-900"
            >
              {#if field.title === "difficulty"}
                {getDifficultyToString(field.value, $t)}
              {:else if field.title === "type"}
                {getTypeText(field.value, $t)}
              {:else}
                {@html DOMPurify.sanitize(field.value)}
              {/if}
            </dd>
          </div>
        {/each}
      {/if}
    </dl>
  </div>
</div>
