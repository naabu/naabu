<script>
  import { goto } from "$app/navigation";
  export let curriculumProfile;
  async function gotoMakeProfile() {
    await goto("/curriculum-profiel/maken");
  }
</script>

{#if curriculumProfile}
  {curriculumProfile.fullname}
{:else}
  <button
    class="mt-3  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    on:click|preventDefault={gotoMakeProfile}
    >Curriculum profiel aanmaken</button
  >
{/if}

Hello world!
