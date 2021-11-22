<script>
  export let revision;
  export let previousPreviousRevision;
  export let previousRevision;
  export let nextRevision;
  export let loading;
  import MainTabs from "$lib/Tabs/revision.svelte";
</script>

<MainTabs bind:revision />

{#if !loading}
  <div class="mt-3 rounded-md bg-yellow-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg
          class="h-5 w-5 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">
          Je bekijkt een revisie<br />
        </h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>Wil je de laatste versie van het leerdoel zien ga terug naar de</p>
          <p>
            <a class="underline" href="/leerdoel/{revision.goalId}"
              >hoofdpagina</a
            >
          </p>

          <p class="space-x-4 mt-4">
            {#if previousRevision !== null}
              <span>
                <a class="underline" href="/revisie/{previousRevision.revisionId}"
                  >← Oudere versie</a
                >
                {#if previousPreviousRevision !== null}
                  (<a
                    class="underline"
                    href="/revisie/{previousRevision.revisionId}/diff/{previousPreviousRevision.revisionId}"
                    >wijz</a
                  >)
                {/if}
              </span>

              <span>
                <a class="underline" href="/revisie/{revision.revisionId}"
                  >Huidige versie</a
                >
                (<a
                  data-cy="show-diff-link"
                  class="underline"
                  href="/revisie/{revision.revisionId}/diff/{previousRevision.revisionId}"
                  >wijz</a
                >)
              </span>
            {/if}

            {#if nextRevision !== null}
              <span>
                <a class="underline" href="/revisie/{nextRevision.revisionId}"
                  >Nieuwe versie →</a
                >
                (<a
                  class="underline"
                  href="/revisie/{nextRevision.revisionId}/diff/{revision.revisionId}">wijz</a
                >)</span
              >
            {/if}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-8">
    Titel: {revision.title}
  </div>

  <div class="mt-8">
    Omschrijving: {revision.description}
  </div>

  <div class="mt-16">
    <b> TODO: change later </b>
  </div>
{:else}
  Loading...
{/if}
