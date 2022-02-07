<script>
  import { checkboxClasses } from "./helper";

  export let id = "checkbox";
  export let checked = false;
  export let label;
  export let dataTest = "checkbox";
  let classes = checkboxClasses().join(" ");
</script>

<div class="mt-3">
  <input
    bind:checked
    data-test={dataTest}
    {id}
    type="checkbox"
    class={classes}
  />
  <label class="font-medium text-gray-700" for={id}>{label}</label>
</div>
