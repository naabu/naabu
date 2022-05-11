<script>
  import UpdateContentMultiLine from "$lib/Update/Components/UpdateContentMultiLine.svelte";
  import ChatIcon from "$lib/Update/Icons/ChatIcon.svelte";
  
  export let update;
  export let i;
  export let feedLength;
  export let showConnectionInfo;
</script>

<UpdateContentMultiLine bind:i bind:feedLength bind:update bind:showConnectionInfo>
  <svelte:fragment slot="icon">
    <ChatIcon />
  </svelte:fragment>
</UpdateContentMultiLine>
