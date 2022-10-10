<script>
  export let id = "image-input-id";
  export let value;
  export let files;
  export let required = false;
  export let dataTest = "inputText";
  export let autocomplete = "off";
  export let disabled;
  export let accept = "image/*";
  export let image;

  function getBase64(imageFile) {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (e) => {
      image = e.target.result;
    };
  }
</script>

<input
  type="file"
  bind:value
  bind:files
  {required}
  {disabled}
  data-test={dataTest}
  name={id}
  {id}
  {autocomplete}
  {accept}
  on:change={() => getBase64(files[0])}
  class="focus:outline-none file:mr-2 file:inline-flex file:justify-center file:rounded-md file:font-medium file:disabled:opacity-50 file:mb-2 file:mt-2 file:border file:bg-white file:border-gray-300 file:text-gray-700 file:hover:bg-gray-50 file:focus:outline-none file:focus:ring-indigo-500 file:focus:ring-2 file:focus:ring-offset-2 file:px-4 file:py-2 file:shadow-sm"
/>
