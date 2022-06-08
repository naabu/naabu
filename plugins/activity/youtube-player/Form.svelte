<script>
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";

  import FieldSet from "$lib/Internals/FormFields/FieldSet.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import NumberInput from "$lib/Internals/FormFields/NumberInput.svelte";
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import { t } from "svelte-intl-precompile";
  export let data = {};
  let regex = /youtu\.be\/([^\?]*)|youtube\.com\/watch\?v=([^&]*)/;
  let validYouTubeLink = false;

  if (!data.video) {
    data.video = {};
  }

  $: if (data.video.youtubeUrl) {
    validYouTubeLink = false;
    let output = data.video.youtubeUrl.trim().match(regex);
    data.video.youtubeId = undefined;
    if (output) {
    
      if (output[1]) {
        data.video.youtubeId = output[1];
        validYouTubeLink = true;
      } else if (output[2]) {
        data.video.youtubeId = output[2];
        validYouTubeLink = true;
      }
    }
  }
</script>

<FieldSet title={$t("video")} description={$t("video-related-info")}>
  <FormField title={$t("youtube-link")} forId="youtube_url">
    {#if validYouTubeLink}
      <p>{$t("valid-youtube-link")}</p>
    {:else}
    <p>{$t("invalid-youtube-link")}</p>
    {/if}
    <TextInput
      id="youtube_url"
      required={true}
      bind:value={data.video.youtubeUrl}
    />
    <AdditionalFormText content={$t("copy-youtube-link")} />
    <AdditionalFormText content={$t("for-example-youtube-link")} />
  </FormField>
</FieldSet>
