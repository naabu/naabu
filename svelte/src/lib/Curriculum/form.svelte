<script>
  export let curriculumProfile;
  export let isEdit = false;
</script>

{#if curriculumProfile}
  {#if !isEdit}
    <div>
      <label for="fullname">Volledige naam (voor en achternaam)</label>
      <input
        id="fullname"
        type="text"
        bind:value={curriculumProfile.fullname}
      />
    </div>
  {/if}

  <div>
    <label for="institution">Institutie</label>
    <input
      id="institution"
      type="text"
      bind:value={curriculumProfile.institution}
    />
  </div>

  <div>
    <label for="institution-email">Jouw email van de institutie</label>
    <input
      id="institution-email"
      type="text"
      bind:value={curriculumProfile.institutionEmail}
    />
  </div>

  <div>
    <label for="credentials">referenties</label>
    <textarea
      id="credentials"
      rows="5"
      bind:value={curriculumProfile.credentials}
    />
  </div>
{/if}
