<script>
  import ClearHelper from "$lib/Internals/Cypress/clearFirestore.svelte";
  import { getStores, page } from "$app/stores";
</script>

<ClearHelper
  collection="goals"
  title={$page.params.title}
  userCheck={false}
  titleCheck={true}
/>
