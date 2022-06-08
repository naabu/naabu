<script>
  import UpdateContentMultiLine from "$lib/Update/Components/UpdateContentMultiLine.svelte";
  import ChatIcon from "$lib/Update/Icons/ChatIcon.svelte";
  import { t } from "svelte-intl-precompile";

  export let update;
  export let i;
  export let feedLength;
  export let showConnectionInfo;
</script>

<UpdateContentMultiLine bind:i bind:feedLength bind:update bind:showConnectionInfo>
  <svelte:fragment slot="icon">
    <ChatIcon />
  </svelte:fragment>
  <svelte:fragment slot="aftername">
    - {$t("teacher")}
  </svelte:fragment>
</UpdateContentMultiLine>
