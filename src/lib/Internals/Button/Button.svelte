<script>
  import { createEventDispatcher } from "svelte";
  export let color = "secondary";
  // export let isLink = false;
  export let isDisabled = false;
  export let isSubmit = false;
  export let isFullWidth = false;
  export let isLinkToGoogle = false;
  export let size = "medium";
  export let content = "";
  export let extraClasses = [];
  export let dataTest =
    content.replaceAll(/\s/g, "-").toLowerCase() + "-button";
  let type = "button";

  let allButton = [
    "inline-flex",
    "justify-center",
    "rounded-md",
    "font-medium",
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

  let iconSquare = [
    "p-2",
    "rounded-md",
  ]

  let secondary = [
    "border",
    "bg-white",
    "border-gray-300",
    "text-gray-700",
    "hover:bg-gray-50",
    "focus:outline-none",
    "focus:ring-indigo-500",
    "focus:ring-2",
    "focus:ring-offset-2"
  ];

  let primary = [
    "border",
    "rounded-md",
    "shadow-sm",
    "border-transparent",
    "justify-center",
    "inline-flex",
    "text-white",
    "bg-indigo-600",
    "hover:bg-indigo-700",
    "focus:outline-none",
    "focus:ring-indigo-500",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
  ];

  let warning = [
    "border",
    "bg-red-600",
    "text-white",
    "hover:bg-red-700",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-red-500",
  ];

  let whiteIcon = [
    "bg-white",
    "text-gray-400",
    "hover:text-gray-500",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-inset",
    "focus:ring-indigo-500",
  ];

  let classes = allButton;

  $: {
    classes = allButton;
    if (color === "primary") {
      classes = [...classes, ...primary];
    } else if (color === "warning") {
      classes = [...classes, ...warning];
    } else if (color === "whiteIcon") {
      classes = [...classes, ...whiteIcon];
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

      case "icon-square":
        classes = [...classes, ...iconSquare];
        break;
    }
    if (isFullWidth) {
      classes = [...classes, "w-full"];
    }
    classes = [...classes, ...extraClasses];
  }

  $: if (isSubmit) {
    type = "submit";
  }

  const dispatch = createEventDispatcher();
  // class="disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  function onClick(event) {
    dispatch("click", event);
  }
</script>

<!-- If isSubmit add type="submit" to button -->
{#if !isLinkToGoogle}
  <button
    {type}
    class={classes.join(" ")}
    data-test={dataTest}
    on:click={onClick}
    disabled={isDisabled}
  >
    <slot>
      {content}
    </slot>
  </button>
{:else}
  <button id="linkGoogleButton" on:click={onClick} />
{/if}

<style>
  #linkGoogleButton {
    width: 240px;
    height: 44px;
    background-repeat: no-repeat;
    background-image: url("/btn_google_signin_dark_normal_web@2x.png");
  }

  #linkGoogleButton:hover {
    background-image: url("/btn_google_signin_dark_focus_web@2x.png");
  }

  #linkGoogleButton:focus {
    background-image: url("/btn_google_signin_dark_pressed_web@2x.png");
    outline: none;
  }

  #linkGoogleButton {
    width: 240px;
    height: 44px;
    background-repeat: no-repeat;
    background-image: url("/btn-signup-google-dutch-normal.svg");
  }

  #linkGoogleButton:hover {
    background-image: url("/btn-signup-google-dutch-hover.svg");
  }

  #linkGoogleButton:focus {
    background-image: url("/btn-signup-google-dutch-pressed.svg");
    outline: none;
  }
</style>
