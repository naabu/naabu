<script>
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
    "mb-2",
    "mt-2"
  ];

  let tiny = ["px-1.5", "py-.5", "text-xs"];

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

  let iconSquare = ["p-2", "rounded-md"];

  let iconSquareSmall = ["p-1", "rounded-lg"];

  let iconRound = ["h-10", "w-10", "rounded-full", "items-center"];

  let whiteFullIcon = [
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-inset",
    "focus:ring-white",
  ];

  let secondary = [
    "border",
    "bg-white",
    "border-gray-300",
    "text-gray-700",
    "hover:bg-gray-50",
    "focus:outline-none",
    "focus:ring-indigo-500",
    "focus:ring-2",
    "focus:ring-offset-2",
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

  let lightRed = [
    "border",
    "border-transparent",
    "text-red-700",
    "bg-red-100",
    "hover:bg-red-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-red-500",
  ];

  let whitePrimaryIcon = [
    "bg-white",
    "text-gray-400",
    "hover:text-gray-500",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-inset",
    "focus:ring-indigo-500",
  ];

  let greenAlert = [
    "bg-green-50",
    "text-green-800",
    "hover:bg-green-100",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-offset-green-50",
    "focus:ring-green-600",
  ];

  let blueWhite = [
    "text-gray-400",
    "hover:text-white",
    "hover:bg-blue-400",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-inset",
    "focus:ring-white",
  ];

  let classes = allButton;

  $: {
    classes = allButton;
    switch (color) {
      case "primary":
        classes = [...classes, ...primary];
        break;
      case "warning":
        classes = [...classes, ...warning];
        break;
      case "whitePrimaryIcon":
        classes = [...classes, ...whitePrimaryIcon];
        break;
      case "whiteFullIcon":
        classes = [...classes, ...whiteFullIcon];
        break;
      case "greenAlert":
        classes = [...classes, ...greenAlert];
        break;
      case "blueWhiteIcon":
        classes = [...classes, ...blueWhite];
        break;
      case "lightRed":
        classes = [...classes, ...lightRed];
        break;
      case "none":
        break;
      default:
        classes = [...classes, ...secondary];
        break;
    }

    switch (size) {
      case "tiny":
        classes = [...classes, ...tiny];
        break;
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
      case "icon-square-small":
        classes = [...classes, ...iconSquareSmall];
        break;
      case "icon-round":
        classes = [...classes, ...iconRound];
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
</script>

{#if !isLinkToGoogle}
  <button
    {type}
    class={classes.join(" ")}
    data-test={dataTest}
    on:click
    disabled={isDisabled}
  >
    <slot>
      {content}
    </slot>
  </button>
{:else}
  <button id="linkGoogleButton" on:click />
{/if}

<style>
  #linkGoogleButton {
    width: 240px;
    height: 44px;
    background-repeat: no-repeat;
    background-image: url("btn_google_signin_dark_normal_web@2x.png");
  }

  #linkGoogleButton:hover {
    background-image: url("btn_google_signin_dark_focus_web@2x.png");
  }

  #linkGoogleButton:focus {
    background-image: url("btn_google_signin_dark_pressed_web@2x.png");
    outline: none;
  }

  #linkGoogleButton {
    width: 240px;
    height: 44px;
    background-repeat: no-repeat;
    background-image: url("btn-signup-google-dutch-normal.svg");
  }

  #linkGoogleButton:hover {
    background-image: url("btn-signup-google-dutch-hover.svg");
  }

  #linkGoogleButton:focus {
    background-image: url("btn-signup-google-dutch-pressed.svg");
    outline: none;
  }
</style>
