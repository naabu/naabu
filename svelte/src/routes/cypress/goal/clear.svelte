<script>
  import ClearHelper from "$lib/Cypress/clearFirestore.svelte";
</script>

<ClearHelper
  collection="goals"
  ids={["cypress-test-goal-1", "cypress-test-goal-2"]}
  userCheck={false}
  idCheck={true}
/>
