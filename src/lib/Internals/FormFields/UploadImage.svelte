<script>
  import { inputClasses } from "./helper";
  export let id = "image-input-id";
  export let value;
  export let required = false;
  export let dataTest = "inputText";
  export let autocomplete = "off";
  export let disabled;
  export let accept = "image/*"
  let classes = inputClasses().join(" ");
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
  class={classes}
/>
