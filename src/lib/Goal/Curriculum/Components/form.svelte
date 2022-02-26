<script>
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import EmailInput from "$lib/Internals/FormFields/EmailInput.svelte";
  import Textarea from "$lib/Internals/FormFields/Textarea.svelte";
  import FormField from "$lib/Internals/FormFields/FormField.svelte";
  import AdditionalFormText from "$lib/Internals/FormFields/AdditionalFormText.svelte";
  import { t } from "svelte-intl-precompile";

  export let curriculumProfile;
  export let isEdit = false;
</script>

{#if curriculumProfile}
  <div class="space-y-6 sm:space-y-5">
    {#if !isEdit}
      <FormField title={$t("first-and-last-name")} forId="fullname">
        <TextInput
          bind:value={curriculumProfile.fullname}
          id="fullname"
          autocomplete="name"
          required={true}
        />
      </FormField>
    {/if}

    <FormField title="Institutie" forId="institution">
      <TextInput
        bind:value={curriculumProfile.institution}
        id="institution"
        autocomplete="organization"
      />
    </FormField>

    <FormField title={$t("insitutional-email")} forId="email">
      <EmailInput id="email" bind:value={curriculumProfile.institutionEmail} />
    </FormField>

    <FormField title={$t("references")} forId="credentials">
      <Textarea
        bind:value={curriculumProfile.credentials}
        id="credentials"
        rows="3"
      />
      <svelte:fragment slot="after">
        <AdditionalFormText
          content={$t("add-relevant-education-and-position")}

        />
      </svelte:fragment>
    </FormField>
  </div>
{/if}
