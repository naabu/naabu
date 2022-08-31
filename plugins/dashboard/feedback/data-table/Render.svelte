<script>
  import sanitizeHtml from 'sanitize-html';
  export let modelData;
</script>

<div class="px-4 sm:px-6 lg:px-8">
  <div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div
          class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              {#if modelData.headings}
                <tr>
                  {#each modelData.headings as heading}
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      {@html sanitizeHtml(heading)}
                    </th>
                  {/each}
                </tr>
              {/if}
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              {#each modelData.rows as row}
                <tr>
                  {#each row as column}
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {@html sanitizeHtml(column)}
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
