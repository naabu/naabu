<script>
  import { checkboxClasses } from "$lib/Internals/FormFields/helper";

  export let name = "multiple-checkbox";
  export let group;
  export let options;
  let classes = checkboxClasses().join(" ");
</script>

<div class="mt-3">
  {#each options as option, i}
    <span class="mr-2">
      <input
        id={name + i}
        type="checkbox"
        {name}
        bind:group
        value={option.value}
        data-test={option.dataTest}
        class={classes}
      />
      <label class="font-medium text-gray-700" for={name + i}
        >{option.label}</label
      >
    </span>
  {/each}
</div>
