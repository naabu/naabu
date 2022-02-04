<script>
  export let id = "checkbox";
  export let checked = false;
  export let label;
</script>

<div class="mt-3">
  <input
    bind:checked
    {id}
    type="checkbox"
    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
  />
  <label class="font-medium text-gray-700" for={id}>{label}</label>
</div>
