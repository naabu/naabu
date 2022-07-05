<script>
  import { t } from "svelte-intl-precompile";
  export let update;
  export let showConnectionInfo;

  let connectionLinkUrl = "";

  $: if (update.connectionLinkType) {
    switch (update.connectionLinkType) {
      case "activity":
        connectionLinkUrl = "activiteiten";
        break;
      case "assessment":
        connectionLinkUrl = "assessments";
        break;
    }
  }
</script>

{#if showConnectionInfo == "link" && update.connectionSourceType == "goal"}
  -
  <a
    href="/leerdoel/{update.connectionSourceId}/{connectionLinkUrl}/{update.connectionLinkId}"
    class="font-medium text-gray-900"
  >
    {$t("in")}
    {update.connectionLinkType}
  </a>
{/if}
