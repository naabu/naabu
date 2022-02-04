<script>
  import TextInput from "$lib/Internals/FormFields/TextInput.svelte";
  import Textarea from "../../../Internals/FormFields/Textarea.svelte";

  export let curriculumProfile;
  export let isEdit = false;
</script>

{#if curriculumProfile}
  <div class="space-y-6 sm:space-y-5">
    {#if !isEdit}
      <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
      >
        <label
          for="fullname"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Volledige naam (voor en achternaam)
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
          <TextInput
            bind:value={curriculumProfile.fullname}
            id="fullname"
            autocomplete="name"
            required={true}
          />
        </div>
      </div>
    {/if}
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="institution"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Institutie
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <TextInput
          bind:value={curriculumProfile.institution}
          id="institution"
          autocomplete="organization"
          required={true}
        />
      </div>
    </div>
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="email"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Jouw email van de institutie
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <input
          bind:value={curriculumProfile.institutionEmail}
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>

    <Textarea
      title="Referenties"
      bind:value={curriculumProfile.credentials}
      id="credentials"
      rows="3"
    >
      <svelte:fragment slot="after">
        <p class="mt-2 text-sm text-gray-500">
          Voeg je relevante opleidingen en posities toe.
        </p>
      </svelte:fragment>
    </Textarea>
  </div>
{/if}
