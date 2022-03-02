<script>
  import FormField from "$lib/Internals/FormFields/FormField.svelte";

  export let connection;
  import Radio from "$lib/Internals/FormFields/Radio.svelte";
  import Textarea from "../../../Internals/FormFields/Textarea.svelte";
  import { t } from "svelte-intl-precompile";

  export let radioOptions = [
    {
      value: "goal-prerequisites",
      label: $t("prior-knowledge"),
      description: $t("prior-knowledge-description") ,
    },
    {
      value: "goal-specializations",
      label: $t("specialization"),
      description:  $t("specialization-description"),
    },
    {
      value: "goal-bigideas",
      label: $t("big-ideas"),
      description: $t("big-ideas-description"),
    },
    {
      value: "goal-deeperunderstandings",
      label: $t("deeper-insight"),
      description: $t("deeper-insight-description"),
    },
  ];
</script>

<Radio
  bind:selectedValue={connection.type}
  options={radioOptions}
  title={$t("type-of-connection")}
/>

<FormField title={$t("description-connection")} forId="description">
  <Textarea id="description" rows="5" bind:value={connection.description} />
</FormField>
