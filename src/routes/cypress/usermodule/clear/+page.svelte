<script>
  import ClearHelper from "$lib/Internals/Cypress/clearFirestore.svelte";
  
</script>

{#if $user && $user.uid}
  <ClearHelper
    collection="modules"
    subcollectionDelete={true}
    subcollection="players"
    idCheck={true}
    checkAnon={false}
    ids={[$user.uid]}
  />
{/if}
