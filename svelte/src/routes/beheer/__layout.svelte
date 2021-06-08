<script>
  import { getStores, session } from "$app/stores"
</script>

{#if $session.user && ($session.user.idTokenResult.claims.canDebugDevelopment || $session.user.idTokenResult.claims.canModerate)}
  <slot />  
{:else}
  Je hebt geen toegang om deze pagina te gebruiken.
{/if}
