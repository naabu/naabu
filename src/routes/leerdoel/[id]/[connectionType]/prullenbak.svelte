<script>
  import ConnectionListContainer from "$lib/Internals/Containers/connectionListContainer.svelte";
  import { page } from "$app/stores";
  let urlType = $page.params.connectionType;
</script>

<ConnectionListContainer
  status="in-trash"
  bind:urlType
  let:goal
  let:connections
  let:firebase
  let:status
/>
