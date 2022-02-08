<script>
  export let id = "textarea-id";
  export let value;
  export let rows = 1;
  export let required = false;
</script>

<textarea
  {id}
  name={id}
  {rows}
  {required}
  bind:value
  class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
/>
