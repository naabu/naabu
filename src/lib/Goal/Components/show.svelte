<script>
  export let goal;
  import MainTabs from "$lib/Internals/Tabs/goal.svelte";
  import { t } from "svelte-intl-precompile";
</script>

<MainTabs bind:goal />

<div class="mt-8">
  {$t("title")}: {goal.title}
</div>

<div class="mt-8">
  {$t("description")}: {goal.description}
</div>

<div class="mt-16">
  <!-- <b> TODO: change later </b> -->
</div>
