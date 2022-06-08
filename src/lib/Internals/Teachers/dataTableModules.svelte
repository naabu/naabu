<script>
  import { formatToTimeAgo } from "$lib/Internals/Misc/helper";
  import nl from "javascript-time-ago/locale/nl.json";
  import en from "javascript-time-ago/locale/en.json";
  import TimeAgo from "javascript-time-ago";
  import { t, locale } from "svelte-intl-precompile";
  import Button from "../Button/Button.svelte";
  import RemoveDialog from "$lib/Internals/Misc/RemoveDialog.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  
  export let modules;

  let moduleDeleteId = null;
  let moduleDeleteIndex = null;
  let deleteModuleToggle = false;

  function toggleDeleteModule(moduleId, index) {
    moduleDeleteId = moduleId;
    moduleDeleteIndex = index;
    deleteModuleToggle = true;
  }

  function cancelDelete() {
    moduleDeleteId = null;
    moduleDeleteIndex = null;
  }

  async function removeModule() {
    if (moduleDeleteId !== null && moduleDeleteIndex !== null) {
      let db = await $firebase.firestore();
      try {
        await db.collection("modules").doc(moduleDeleteId).delete();
        alert.successTitle = $t("module-removed");
        alert.successMessage = "";
        alert.success = true;
        modules.splice(moduleDeleteIndex, 1);
        modules = modules;
      } catch (error) {
        console.log(error);
        alert.errorMessage = $t("error-while-removing");
        alert.error = true;
      }
    }
  }

  TimeAgo.addLocale(en);
  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo($locale);
</script>

<RemoveDialog
  bind:toggle={deleteModuleToggle}
  on:ok={removeModule}
  on:cancel={cancelDelete}
/>

<div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div
        class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("module")}
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("last-change-on")}
              </th>
              <slot name="table-header" />
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">{$t("edit")}"</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each modules as module, index}
              <tr>
                <td class="px-6 py-4">
                  <div
                    data-test="module-name-{index}"
                    class="text-sm font-medium text-gray-900"
                  >
                    {module.moduleName}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {formatToTimeAgo(module.modifiedAt,$firebase, timeAgo, $t)}
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                    <a
                    data-test="module-dashboard-button-{index}"
                    href="/lerarenkamer/module/{module.id}/dashboard"
                    class="mr-1 underline text-indigo-600 hover:text-indigo-900"
                    >{$t("dashboard")}</a
                  >
                  <a
                    data-test="module-edit-button-{index}"
                    href="/lerarenkamer/module/{module.id}"
                    class="mr-1 underline text-indigo-600 hover:text-indigo-900"
                    >{$t("edit")}</a
                  >

                  <Button
                    color="lightRed"
                    size="tiny"
                    content={$t("removing")}
                    on:click={() => toggleDeleteModule(module.id, index)}
                  />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        {#if modules.length === 0}
          <div class="m-4">
            {$t("no-modules-found")}
            <a class="underline" href="/lerarenkamer/module/maken">
              {$t("create-module-here")}</a
            >
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
