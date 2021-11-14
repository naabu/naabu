<script>
  import ConnectionList from "$lib/Connection/list.svelte";
  export let urlType;
  export let goalId;
  export let connections;
  export let firebase;
  export let status;
</script>

<ConnectionList
  bind:urlType
  bind:goalId
  bind:connections
  bind:firebase
  bind:status
  let:connection
>
</ConnectionList>
