<script>
  import ConnectionList from "$lib/Goal/Connection/Components/list.svelte";
  import { t } from "svelte-intl-precompile";
  export let urlType;
  export let goalId;
  export let connections;
  export let firebase;
  export let status;

  function getDifficulty(connection) {
    for (let i = 0; i < connection.fields.length; i++) {
      if (connection.fields[i].title === $t("difficulty")) {
        return connection.fields[i].value;
      }
    }
    return "";
  }
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
    <a class="underline ml-auto" href="/leerdoel/{goalId}/create-assessment">
      {$t("create-new-assessment")}</a
    >
  </div>
</ConnectionList>
