<script>
  import { createEventDispatcher } from "svelte";
  export let isPrimary = false;
  // export let isLink = false;
  export let isDisabled = false;
  export let isSubmit = false;
  export let size = "medium";
  export let content = "";
  export let dataTest = content.replace("/\\s/", "") + "button";
  let type = "button";

  let allButton = [
    "inline-flex",
    "items-center",
    "border",
    "rounded-md",
    "font-medium",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
  ];

  let verySmall = ["px-2.5", "py-1.5", "text-xs"];

  let small = ["px-3", "py-2", "text-sm", "leading-4"];

  let medium = [
    "px-4",
    "py-2",
    "text-sm",
    "shadow-sm",
    "text-sm",
    "font-medium",
  ];

  let large = ["px-4", "py-2", "text-base"];

  let verylarge = ["px-6", "py-3", "text-base"];

  let secondary = [
    "bg-white",
    "border-gray-300",
    "text-gray-700",
    "hover:bg-gray-50",
    "focus:ring-indigo-500",
  ];

  let primary = [
    "rounded-md",
    "shadow-sm",
    "border-transparent",
    "justify-center",
    "inline-flex",
    "text-white",
    "bg-indigo-600",
    "hover:bg-indigo-700",
    "focus:ring-indigo-500",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
  ];

  let classes = allButton;

  $: {
    classes = allButton;
    if (isPrimary) {
      classes = [...classes, ...primary];
    } else {
      classes = [...classes, ...secondary];
    }

    switch (size) {
      case "very-small":
        classes = [...classes, ...verySmall];
        break;
      case "small":
        classes = [...classes, ...small];
        break;
      case "medium":
        classes = [...classes, ...medium];
        break;

      case "large":
        classes = [...classes, ...large];
        break;
      case "very-large":
        classes = [...classes, ...verylarge];
        break;
    }
  }

  $: if (isSubmit) {
    type = "submit";
  }

  $:console.log(classes);

  const dispatch = createEventDispatcher();
  // class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  function onClick(event) {
    dispatch("click", event);
  }
</script>

<!-- If isSubmit add type="submit" to button -->
<button
  {type}
  class={classes.join(" ")}
  data-test={dataTest}
  on:click={onClick}
  disabled={isDisabled}
>
  {content}
</button>
