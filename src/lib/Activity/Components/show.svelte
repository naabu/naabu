<script>
  import { getStores, session, page } from "$app/stores";
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  import Notification from "$lib/Internals/Misc/notification.svelte";
  import DifficultyFeedback from "$lib/Activity/Components/feedbackDifficulty.svelte";
  import BattleFight from "$lib/Goal/Components/battleFight.svelte";
  import { hasSpecialClaims } from "$lib/Internals/User/helper.js";
  import ShowPlugins from "$lib/Internals/Plugin/Show.svelte";
  import { goto } from "$app/navigation";
  import { t } from "svelte-intl-precompile";
  export let firebase;
  export let activity;
  export let showFeedback = true;
  let pluginFinished = false;

  $: if (pluginFinished && showFeedback) {
    toggleFeedback = true;
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

  let userHasSpecialClaims = hasSpecialClaims($session.user);

  async function endActivity() {
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
      if ($page.path.includes("beheer")) {
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

  $: if (activity) {
    for (let i = 0; i < activity.quizzes.length; i++) {
      activity.quizzes[i].selectedAnswer = null;
      activity.quizzes[i].correct = false;
    }
  }

  function scrollABitToTheTop(scroll = 200) {
    if (y - scroll > 0) {
      y = y - scroll;
    } else {
      y = 0;
    }
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
      bind:firebase
    />
  {/if}
  {#if activity && activity.battles}
    <BattleFight bind:toggle={fightToggle} bind:activity bind:firebase />
  {/if}
  {#if activity}
    <h1 class="text-lg leading-6 font-medium text-gray-900">
      {#if activity.title}
        {activity.title}
      {/if}
    </h1>
    {#if activity.description}
      {@html activity.description}
    {/if}

    {#if activity.plugins && activity.plugins.length > 0}
      <ShowPlugins bind:object={activity} bind:finished={pluginFinished} />
    {/if}
  {:else}
    <p>
      {$t("activity-not-found")}
    </p>
  {/if}
</div>
