<script>
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
          <input
            type="text"
            name="fullname"
            id="fullname"
            autocomplete="name"
            bind:value={curriculumProfile.fullname}
            class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
    {/if}
    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="institutie"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Institutie
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <input
          type="text"
          name="institutie"
          id="institutie"
          bind:value={curriculumProfile.institution}
          class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
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

    <div
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
    >
      <label
        for="credentials"
        class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Referenties
      </label>
      <div class="mt-1 sm:mt-0 sm:col-span-2">
        <textarea
          bind:value={curriculumProfile.credentials}
          id="credentials"
          name="credentials"
          rows="3"
          class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
        />
        <p class="mt-2 text-sm text-gray-500">
          Voeg je relevante opleidingen en posities toe.
        </p>
      </div>
    </div>
  </div>
{/if}
