<script>
  import { page } from "$app/stores";
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  import Notification from "$lib/Internals/Misc/notification.svelte";
  import DifficultyFeedback from "$lib/Activity/Components/feedbackDifficulty.svelte";
  import { hasSpecialClaims } from "$lib/Internals/User/helper.js";
  import ShowPlugins from "$lib/Internals/Plugin/ShowActivityPlugins.svelte";
  import { goto } from "$app/navigation";
  import { t } from "svelte-intl-precompile";
 import DOMPurify from 'dompurify';

  import { firebase } from "$lib/Internals/Firebase/store";
  import { user } from "$lib/Internals/User/store";

  import { createEventDispatcher } from "svelte";
  export let activity;
  export let showFeedback = true;
  export let pluginFinished = false;
  const dispatch = createEventDispatcher();
  let activityStartTime = null;

  $: if (pluginFinished && showFeedback) {
    toggleFeedback = true;
  }

  $: if (activity &&$firebase && activityStartTime == null) {
    activityStartTime =$firebase.firestore.Timestamp.now().seconds;
  }

  let displayNotification = false;
  let fightToggle = true;
  let toggleFeedback = false;
  let feedbackEnded = false;
  let hasBattles = false;

  $: if (activity && activity.battles && activity.battles.length > 0) {
    hasBattles = true;
  }

  $: if (feedbackEnded && hasBattles) {
    fightToggle = true;
  }

  $: if (feedbackEnded && !hasBattles) {
    endActivity();
  }

  $: if (feedbackEnded && hasBattles && !fightToggle) {
    endActivity();
  }

  let notificationText = {
    title: $t("no-support-fullscreen"),
    description: $t("reason-for-no-fullscreen-support"),
  };

  let y;

  let userHasSpecialClaims = hasSpecialClaims($user);

  async function endActivity() {
    activityStartTime = null;
    if (!userHasSpecialClaims) {
      setTimeout(async () => {
        await goto(
          "/module/" +
            $page.params.moduleId +
            "/locatie/" +
            $page.params.locationId
        );
      }, 2000);
    } else {
      if ($page.url.pathname.includes("beheer")) {
        await goto("/beheer/activiteit");
      } else {
        setTimeout(async () => {
          await goto(
            "/module/" +
              $page.params.moduleId +
              "/locatie/" +
              $page.params.locationId
          );
        }, 2000);
      }
    }
  }

  export let breadcrumbs = [];

  function scrollABitToTheTop(scroll = 200) {
    if (y - scroll > 0) {
      y = y - scroll;
    } else {
      y = 0;
    }
  }

  function lowLevelData(event) {
    let lowLevelDataObject = event.detail.lowLevelData;
    lowLevelDataObject.activityId = activity.id;
    lowLevelDataObject.activityTitle = activity.title;
    lowLevelDataObject.activityAuthorId = activity.authorId;
    lowLevelDataObject.activityType = activity.type;
    lowLevelDataObject.activityDifficulty = activity.difficulty;
    lowLevelDataObject.activityRevisionId = activity.latestRevisionId;
    lowLevelDataObject.activityRevisionCreatedAt =
      activity.latestRevisionCreatedAt;
    lowLevelDataObject.activityStartTime = activityStartTime;
    lowLevelDataObject.time =$firebase.firestore.Timestamp.now().seconds;
    lowLevelDataObject.activityTimeIn =
      lowLevelDataObject.time - activityStartTime;
    lowLevelDataObject.goalId = activity.goalId;

    dispatch("lowLevelData", { lowLevelData: lowLevelDataObject });
  }
</script>

<svelte:window bind:scrollY={y} />

<Notification bind:displayNotification bind:notificationText time="4000" />

<div>
  <ShowBreadcrumb bind:breadcrumbs />
  {#if showFeedback}
    <DifficultyFeedback
      bind:toggle={toggleFeedback}
      bind:feedbackEnded
      bind:activity
      
    />
  {/if}
  {#if activity}
    <h1 class="text-lg leading-6 font-medium text-gray-900">
      {#if activity.title}
        {activity.title}
      {/if}
    </h1>
    {#if activity.description}
      {@html DOMPurify.sanitize(activity.description)}
    {/if}

    {#if activity.plugins && activity.plugins.length > 0}
      <ShowPlugins
        
        bind:object={activity}
        bind:finished={pluginFinished}
        on:lowLevelData={lowLevelData}
      />
    {/if}
  {:else}
    <p>
      {$t("activity-not-found")}
    </p>
  {/if}
</div>
