<script>
  import { inputClasses } from "./helper";

  export let id = "input-id";
  export let value;
  export let required = false;
  export let dataTest = "inputNumber";
  export let autocomplete = "off";
  export let min;
  export let max;
  export let step;
  let classes = inputClasses().join(" ");
</script>

<input
  type="number"
  bind:value
  {required}
  data-test={dataTest}
  name={id}
  {id}
  {autocomplete}
  {min}
  {max}
  {step}
  class={classes}
/>
