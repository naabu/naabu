<script>
  import { inputClasses } from "./helper";

  export let id = "input-id";
  export let value;
  export let required = false;
  export let dataTest = "input";
  export let autocomplete = "email";
  let classes = inputClasses().join(" ");
</script>

<input
  type="email"
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
