<script>
  import { inputClasses } from "./helper";
  export let id = "input-id";
  export let value;
  export let required = false;
  export let dataTest = "inputText";
  export let autocomplete = "off";
  let classes = inputClasses().join(" ");
</script>

<input
  type="text"
  on:keypress
  on:keyup
  bind:value
  {required}
  data-test={dataTest}
  name={id}
  {id}
  {autocomplete}
  class={classes}
/>
