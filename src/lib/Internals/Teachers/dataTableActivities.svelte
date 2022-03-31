<script>
  import {
    getDifficultyToString,
    getTypeText,
  } from "$lib/Activity/Components/helper";
  import { getDefaultAlertValues, truncate } from "$lib/Internals/Misc/helper";
  import { getStores, page } from "$app/stores";
  import DOMPurify from "dompurify";
  import { t } from "svelte-intl-precompile";
  import ResultFeedback from "../Form/resultFeedback.svelte";
  import RemoveDialog from "../Misc/RemoveDialog.svelte";
  import Button from "../Button/Button.svelte";
  import ShareDialog from "$lib/Activity/Components/ShareDialog.svelte";
  export let firebase;
  export let activities;
  let deleteActivityToggle = false;

  let activityDeleteId = null;
  let activityDeleteIndex = null;

  let dialogActivityId;
  let shareToggle = false;

  function toggleDeleteActivity(activityId, index) {
    activityDeleteId = activityId;
    activityDeleteIndex = index;
    deleteActivityToggle = true;
  }

  function cancelDelete() {
    activityDeleteId = null;
    activityDeleteIndex = null;
  }

  let alert = getDefaultAlertValues();

  async function removeDraft() {
    if (activityDeleteId !== null && activityDeleteIndex !== null) {
      let db = await firebase.firestore();
      try {
        await db.collection("activities").doc(activityDeleteId).delete();
        alert.successTitle = $t("activity-removed");
        alert.successMessage = "";
        alert.success = true;
        activities.splice(activityDeleteIndex, 1);
        activities = activities;
      } catch (error) {
        console.log(error);
        alert.errorMessage = $t("error-while-removing");
        alert.error = true;
      }
    }
  }

  function toggleShare(activityId) {
    dialogActivityId = activityId;
    shareToggle = true;
  }
</script>

<ResultFeedback bind:alert />

<ShareDialog bind:activityId={dialogActivityId} bind:toggle={shareToggle} />

<RemoveDialog
  bind:toggle={deleteActivityToggle}
  on:ok={removeDraft}
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
                {$t("goal")}
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {$t("fields")}
              </th>
              <slot name="table-header" />
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">{$t("edit")}</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each activities as activity, index}
              <tr>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">
                    <a class="underline" href="/leerdoel/{activity.goalId}"
                      >{activity.goalTitle}</a
                    >
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {#if activity.type !== ""}
                      {getTypeText(activity.type, $t)} <br />
                    {/if}
                    {#if activity.title}{activity.title}<br />{/if}
                    {#if activity.descriptionRaw}{@html DOMPurify.sanitize(
                        truncate(activity.descriptionRaw, 60)
                      )}<br />{/if}
                    {#if activity.difficulty}{getDifficultyToString(
                        activity.difficulty,
                        $t
                      )}<br />{/if}
                    {#if activity.video.vimeoId}<a
                        class="underline"
                        href="https://vimeo.com/{activity.video.vimeoId}"
                        >vimeo.com/{activity.video.vimeoId}</a
                      ><br />{/if}
                  </div>
                </td>
                <slot
                  name="table-d"
                  connectionStatus={activity.connectionStatus}
                />
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a
                    href="/activiteit/{activity.id}?redirect={$page.url.pathname}"
                    class="mr-1 underline text-indigo-600 hover:text-indigo-900"
                    >{$t("show")}</a
                  >
                  <a
                    href="/lerarenkamer/activiteit/{activity.id}"
                    class="mr-1 underline text-indigo-600 hover:text-indigo-900"
                    >{$t("edit")}</a
                  >

                  <slot
                    name="cta"
                    activityId={activity.id}
                    {index}
                    goalId={activity.goalId}
                    connectionId={activity.connectionId}
                  />

                  <Button
                    content={$t("share")}
                    color="primary"
                    size="very-small"
                    on:click={() => toggleShare(activity.id)}
                  />

                  <Button
                    color="lightRed"
                    size="tiny"
                    content={$t("removing")}
                    on:click={() => toggleDeleteActivity(activity.id, index)}
                  />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        {#if activities.length === 0}
          <div class="m-4">
            {$t("no-concept-activities-found")}<a
              class="underline"
              href="/lerarenkamer/activiteit/maken-leerdoel-zoeken"
            >
              {$t("create-activity-here")}</a
            >
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
