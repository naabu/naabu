<script>
  import EditActivity from "$lib/Activity/edit.svelte";
  import { onMount } from "svelte";
  import { initFirebase } from "$lib/firebase";
  import { getStores, session, page } from "$app/stores";
  import Sidebar from "$lib/Containers/sidebar.svelte";
  import { getTeacherMenuitems } from "$lib/Teachers/helper";
  import GetActivityData from "$lib/Activity/getActivityData.svelte";

  import { formatToTimeAgo } from "$lib/Misc/helper";
  import TimeAgo from "javascript-time-ago";
  import nl from "javascript-time-ago/locale/nl.json";
  import { getStatusTranslation } from "$lib/Activity/helper";

  let menuitems;
  let firebase;
  let activity;
  let previousActivity;
  TimeAgo.addLocale(nl);
  const timeAgo = new TimeAgo("nl");

  $: if (activity) {
    menuitems = getTeacherMenuitems($page.path, activity.status);
  }

  onMount(async () => {
    firebase = await initFirebase($session.environment);
  });
</script>

<GetActivityData bind:firebase bind:activity bind:cloneActivity={previousActivity} />


<Sidebar bind:menuitems>
  <div slot="abovetitle" class="ml-auto w-max">
    {#if activity && activity.latestRevisionCreatedAt && activity.previousRevisionId}
      <p class="pt-2 text-sm text-gray-500">
        <a
          href="/revisie/{activity.latestRevisionId}/diff/{activity.previousRevisionId}"
          class="hover:underline"
        >
          <time datetime="2020-12-09T11:43:00">
            Laatste wijziging was
            {formatToTimeAgo(
              activity.latestRevisionCreatedAt,
              firebase,
              timeAgo
            )}</time
          >
        </a>
      </p>
    {/if}
  </div>
  <span slot="title"> Activiteit maken</span>

  <span
    slot="status"
    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
  >
    {#if firebase && activity}
      {getStatusTranslation(activity.status)}
    {/if}
  </span>

  <span slot="content">
    {#if firebase && activity}
      <EditActivity bind:firebase bind:activity bind:previousActivity />
    {/if}
  </span>
</Sidebar>
