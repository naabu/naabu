<script>
  export let tableHeaders = [];
  export let tableBodyContents = [];
  export let hasActions = true;
</script>

<table class="min-w-full divide-y divide-gray-200">
  <thead class="bg-gray-50">
    <tr>
      {#each tableHeaders as tableHeader}
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >{tableHeader}</th
        >
      {/each}
      {#if hasActions}
        <th scope="col" class="relative px-6 py-3">
          <span class="sr-only">Actions</span>
        </th>
      {/if}
    </tr>
  </thead>
  <tbody>
    {#each tableBodyContents as tableBodyContent, i}
      <tr class:bg-white={i % 2 == 0} class:bg-gray-50={i % 2 != 0}>
        {#each tableBodyContent as column, columnIndex}
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            <slot name="column" {column} {i}  {columnIndex}>
              {column}
            </slot>
          </td>
        {/each}
        {#if hasActions}
          <td
            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
          >
            <slot name="action" {i} />
          </td>
        {/if}
      </tr>
    {/each}
  </tbody>
</table>
