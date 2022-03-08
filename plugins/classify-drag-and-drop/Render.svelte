<script>
  export let data;
</script>

<div>
  {data.question}

  <div>
    Items

    <div class="inline-flex shadow divide-y">
      <div class="inline-flex p-4">Hello world 1</div>
    </div>
    <div class="inline-block shadow divide-y">Hello world 2</div>
  </div>
  <!-- Items on top -->
  <!-- <ul role="list" class="mt-8 inline-block">
    {#each data.items as item}
      <li
        class="inline-block text-center bg-white rounded-lg shadow divide-y divide-gray-200"
      >
        <h3 class="w-20 first-letter:text-gray-900 text-sm font-medium">{item.content}</h3>
      </li>
    {/each}
  </ul> -->

  <!-- Categories -->
  <ul
    role="list"
    class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    {#each data.categories as category}
      <li
        class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
      >
        <div class="flex-1 flex flex-col p-8 min-h-56">
          <h3 class="mt-6 text-gray-900 text-sm font-medium">{category}</h3>
        </div>
      </li>
    {/each}
  </ul>
</div>
