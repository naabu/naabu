<script>
  import { goto } from "$app/navigation";
  import RevisionList from "$lib/Goal/Curriculum/Components/revisionList.svelte";
  import PostList from "$lib/Goal/Curriculum/Components/postList.svelte";
  import CurriculumTabs from "$lib/Internals/Tabs/curriculum.svelte";
  import { t } from "svelte-intl-precompile";
  
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
  <div data-test="profile-view" class="flex justify-between items-start">
    <div class="mt-3">
      <div>Volledige naam: {curriculumProfile.fullname}</div>
      <div>Instutie: {curriculumProfile.institution}</div>
      <div>Email van institutie: {curriculumProfile.institutionEmail}</div>
      <div>Credenties: {curriculumProfile.credentials}</div>
    </div>
  </div>

  <RevisionList bind:curriculumProfile />

  <PostList bind:curriculumProfile />
{/if}
