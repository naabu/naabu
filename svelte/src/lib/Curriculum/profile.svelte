<script>
  import { goto } from "$app/navigation";
  import RevisionList from "./revisionList.svelte";
  import CurriculumTabs from "$lib/Tabs/curriculum.svelte";
  export let curriculumProfile;
  export let isOwnProfile = false;

  async function gotoEditProfile() {
    await goto("/curriculum-profiel/wijzigen");
  }

  async function gotoMakeProfile() {
    await goto("/curriculum-profiel/maken");
  }
</script>

{#if curriculumProfile}
  <CurriculumTabs bind:curriculumProfile bind:isOwnProfile />
  <div class="flex justify-between items-start">
    <div class="mt-3">
      <div>Volledige naam: {curriculumProfile.fullname}</div>
      <div>Instutie: {curriculumProfile.institution}</div>
      <div>Email van institutie: {curriculumProfile.institutionEmail}</div>
      <div>Credenties: {curriculumProfile.credentials}</div>
    </div>
  </div>

  <RevisionList bind:curriculumProfile />
{/if}
