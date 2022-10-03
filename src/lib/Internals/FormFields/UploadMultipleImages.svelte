<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import UploadImage from "$lib/Internals/FormFields/UploadImage.svelte";
  import { t } from "svelte-intl-precompile";
  import TextInput from "./TextInput.svelte";

  export let images = [];
  export let newTextValue = "";
  export let newImageValue = "";

  function newImage() {
    console.log(newTextValue);
    console.log(newImageValue);
  }
</script>

<FormField title={$t("image")}>
  <UploadImage value={newImageValue} />
</FormField>

<FormField title={$t("text-with-image")} showBorder={false}>
  <TextInput bind:value={newTextValue} />
</FormField>
<div class="flex justify-end">
  <Button on:click={newImage} content={$t("add-new-image")} />
</div>
