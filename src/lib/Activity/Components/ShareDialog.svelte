<script>
  import Dialog from "$lib/Internals/Misc/Dialog.svelte";
  import { getStores, page } from "$app/stores";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import { t } from "svelte-intl-precompile";
  export let activityId;

  let externalLink = "";
  let link = "";

  $: {
    link = $page.host + "/a/" + activityId;
    if (externalLink.length > 0) {
      link += "?link="+ externalLink;
    }
  }
  export let toggle;
</script>

<Dialog bind:toggle>
  <b>{link} </b>
  <FormField title={$t("external-website")}>
    <TextInput bind:value={externalLink} />
    <AdditionalFormText content={$t("external-website-explanation")} />
  </FormField>
</Dialog>
