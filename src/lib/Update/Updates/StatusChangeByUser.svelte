<script>
  import UpdateContentSingleLine from "$lib/Update/Components/UpdateContentSingleLine.svelte";
  import StatusChangedIcon from "$lib/Update/Icons/StatusChangedIcon.svelte";
  import { t } from "svelte-intl-precompile";

  export let update;
  export let i;
  export let feedLength;
  export let showConnectionInfo;
</script>

<UpdateContentSingleLine bind:i bind:feedLength bind:update bind:showConnectionInfo>
  <svelte:fragment slot="icon">
    <StatusChangedIcon />
  </svelte:fragment>
    <a
      href="/curriculum-profiel/{update.curriculumProfile.id}"
      class="font-medium text-gray-900">{update.curriculumProfile.fullname}</a
    >
    {$t("has-changed-status-to")}
    <span class="font-medium text-gray-900">{$t(update.content)}</span>
    <span class="whitespace-nowrap"
      >{#if update.createdAtTimeAgo}
        {update.createdAtTimeAgo}
      {/if}</span
    >
</UpdateContentSingleLine>
