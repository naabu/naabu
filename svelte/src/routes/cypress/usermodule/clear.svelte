<script>
  import ClearHelper from "$lib/Cypress/clearFirestore.svelte";
  import { getStores, session } from "$app/stores";
</script>

{#if $session.user && $session.user.uid}
  <ClearHelper
    collection="modules"
    subcollectionDelete={true}
    subcollection="players"
    idCheck={true}
    checkAnon={false}
    ids={[$session.user.uid]}
  />
{/if}
