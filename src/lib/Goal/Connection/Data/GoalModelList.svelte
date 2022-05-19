<script>
  import ConnectionList from "$lib/Goal/Connection/Components/list.svelte";
  import { t } from "svelte-intl-precompile";
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
  <div slot="createButton" class="mt-8 mb-8 flex">
    <a class="underline ml-auto" href="/leerdoel/{goalId}/create-model">
      {$t("create-new-model")}</a
    >
  </div>

  <svelte:fragment slot="not-found">
    {$t("no-models-found")}
  </svelte:fragment>
</ConnectionList>
