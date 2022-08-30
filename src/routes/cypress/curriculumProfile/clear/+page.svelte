
<script>
  import ClearHelper from "$lib/Internals/Cypress/clearFirestore.svelte";
  
</script>

{#if $user && $user.uid}
  <ClearHelper
    collection="curriculumProfile"
    fieldUserId="uid"
  />
{/if}
