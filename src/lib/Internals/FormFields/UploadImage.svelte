<script>
  export let id = "image-input-id";
  export let value;
  export let required = false;
  export let dataTest = "inputText";
  export let autocomplete = "off";
  export let disabled;
  export let accept = "image/*"

</script>

<input
  type="file"
  bind:value
  {required}
  {disabled}
  data-test={dataTest}
  name={id}
  {id}
  {autocomplete}
  {accept}
  class="focus:outline-none file:mr-2 file:inline-flex file:justify-center file:rounded-md file:font-medium file:disabled:opacity-50 file:mb-2 file:mt-2 file:border file:bg-white file:border-gray-300 file:text-gray-700 file:hover:bg-gray-50 file:focus:outline-none file:focus:ring-indigo-500 file:focus:ring-2 file:focus:ring-offset-2 file:px-4 file:py-2 file:shadow-sm"
/>
