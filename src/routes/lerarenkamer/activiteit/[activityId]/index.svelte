<script>
  import EditActivity from "$lib/Activity/Components/edit.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import { getStores, page } from "$app/stores";
  import Sidebar from "$lib/Internals/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Internals/Teachers/helper";
  import GetActivityData from "$lib/Activity/Data/getActivityData.svelte";

  import { formatToTimeAgo } from "$lib/Internals/Misc/helper";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import en from "javascript-time-ago/locale/en.json";
  import { getStatusTranslation } from "$lib/Activity/Components/helper";
  import { t, locale } from "svelte-intl-precompile";

  let menuitems;
 
  let activity;
  let previousActivity;
  TimeAgo.addLocale(en);
  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo($locale);

  $: if (activity) {
    menuitems = getTeacherMenuitems($page.url.pathname, $t, activity.status);
  }

  $: (async () => {
    if ($firebase) {
    }
  })();
</script>

<GetActivityData
  
  bind:activity
  bind:cloneActivity={previousActivity}
  loadComponent={"form"}
/>

<Sidebar bind:menuitems>
  <div slot="before" class="ml-auto w-max">
    {#if activity && activity.latestRevisionCreatedAt && activity.previousRevisionId}
      <p class="pt-2 text-sm text-gray-500">
        <a
          data-test="last-change-link"
          href="/revisie/{activity.latestRevisionId}/diff/{activity.previousRevisionId}"
          class="hover:underline"
        >
          <time datetime="2020-12-09T11:43:00">
            {$t("last-change-was-on")}
            {formatToTimeAgo(
              activity.latestRevisionCreatedAt,
             $firebase,
              timeAgo,
              $t
            )}</time
          >
        </a>
      </p>
    {/if}
  </div>
  <span slot="title">{$t("create-activity")}</span>

  <span
    slot="status"
    data-test="concept-status"
    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
  >
    {#if$firebase && activity}
      {getStatusTranslation(activity.status, $t)}
    {/if}
  </span>

  <span slot="content">
    {#if$firebase && activity}
      <EditActivity  bind:activity bind:previousActivity />
    {/if}
  </span>
</Sidebar>
