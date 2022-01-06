<script>
  import ClearHelper from "$lib/Internals/Cypress/clearFirestore.svelte";
  import { getStores, session } from "$app/stores";
</script>

{#if $session.user && $session.user.uid}
  <ClearHelper
    collection="players"
    ids={[$session.user.uid]}
    userCheck={false}
    idCheck={true}
  />
{/if}
