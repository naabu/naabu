<script>
  import Tabs from "$lib/Internals/Tabs/tabs.svelte";
  import { t } from "svelte-intl-precompile";
  export let mainSelected = "overview";

  let mainTabs = [
    {
      value: "map",
      text: $t("maps"),
      url: "/beheer/kaart",
    }
  ];
</script>

<Tabs bind:mainTabs bind:mainSelected />
