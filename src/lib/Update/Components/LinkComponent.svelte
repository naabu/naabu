<script>
  import { t } from "svelte-intl-precompile";
  export let update;
  export let showConnectionInfo;

  let connectionLinkUrl = "";
  let connectionIdOfLink = update.connectionLinkId;

  $: if (update.connectionLinkType) {
    switch (update.connectionLinkType) {
      case "activity":
        connectionLinkUrl = "activiteiten";
        connectionIdOfLink = update.connectionId;
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
    href="/leerdoel/{update.connectionSourceId}/{connectionLinkUrl}/{connectionIdOfLink}"
    class="font-medium text-gray-900"
  >
    {$t("in")}
    {update.connectionLinkType}
  </a>
{/if}
