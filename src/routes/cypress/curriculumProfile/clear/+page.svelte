
<script>
  import ClearHelper from "$lib/Internals/Cypress/clearFirestore.svelte";
  import { user } from "$lib/Internals/User/store";
</script>

{#if $user && $user.uid}
  <ClearHelper
    collection="curriculumProfile"
    fieldUserId="uid"
  />
{/if}
