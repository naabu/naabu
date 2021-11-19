<script>
  import ConnectionList from "$lib/Connection/list.svelte";
  export let urlType;
  export let goalId;
  export let connections;
  export let firebase;
  export let status;

  function getDifficulty(connection) {
    for (let i = 0; i < connection.fields.length; i++) {
      if (connection.fields[i].title === "Moeilijkheid") {
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
    <a class="underline ml-auto" href="/lerarenkamer/activiteit/maken/{goalId}">
      Nieuwe activiteit maken</a
    >
  </div>
  
  <th
    slot="tableHeader"
    scope="col"
    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    Moeilijkheid
  </th>

  <td
    slot="tableD"
    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
  >
    {getDifficulty(connection)}
  </td>
</ConnectionList>
