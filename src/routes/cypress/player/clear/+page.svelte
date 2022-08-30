<script>
  import ClearHelper from "$lib/Internals/Cypress/clearFirestore.svelte";
  
</script>

{#if $user && $user.uid}
  <ClearHelper
    collection="players"
    ids={[$user.uid]}
    userCheck={false}
    idCheck={true}
  />
{/if}
