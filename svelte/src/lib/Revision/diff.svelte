<script>
  import ArrayDiff from "$lib/Diff/arrayDiff.svelte";
  import StringDiff from "$lib/Diff/stringDiff.svelte";
  import { getDateString } from "$lib/Misc/helper";
  import MainTabs from "$lib/Tabs/revision.svelte";
  export let revisionOld;
  export let revisionNew;
  export let goBackRevision;
  export let goForwardRevision;
  export let loading = false;
  let battleDiffers = false;
</script>

<MainTabs bind:revision={revisionNew} subSelected="read" />

{#if !loading}
  <div class="">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="max-w-none mx-auto">
        <div class="overflow-hidden">
          <div class="bg-white border-b border-gray-200 px-4 py-5 sm:px-6">
            <div class="flex space-x-3">
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">
                  Verschil tussen versies
                </p>
              </div>
              <div class="flex-shrink-0 self-center flex" />
            </div>
          </div>

          <div class="grid gap-4 mt-2 grid-cols-2 px-4 pb-5 sm:p-6 sm:pt-0">
            <div>
              {#if revisionOld}
                <a class="underline" href="/revisie/{revisionOld.id}">
                  {getDateString(revisionOld.createdAt)}
                </a>
                (<a class="underline" href="/revisie/{revisionOld.id}/wijzigen"
                  >edit</a
                >)
                <div>
                  {#if goBackRevision}
                    <a
                      class="underline"
                      href="/revisie/{revisionOld.id}/diff/{goBackRevision.id}"
                      >← Oudere bewerking</a
                    >
                  {/if}
                </div>
              {/if}
            </div>

            <div>
              {#if revisionNew}
                <a class="underline" href="/revisie/{revisionNew.id}">
                  {getDateString(revisionNew.createdAt)}</a
                >
                (<a class="underline" href="/revisie/{revisionNew.id}/wijzigen"
                  >edit</a
                >)
                <div>
                  {#if goForwardRevision}
                    <a
                      class="underline"
                      href="/revisie/{goForwardRevision.id}/diff/{revisionNew.id}"
                      >Nieuwere bewerking →</a
                    >
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <StringDiff
    title="Titel"
    bind:old={revisionOld.title}
    bind:neww={revisionNew.title}
  />

  <StringDiff
    title="Omschrijving"
    bind:old={revisionOld.description}
    bind:neww={revisionNew.description}
  />

  <StringDiff
    title="Onderwerp"
    bind:old={revisionOld.unitopic}
    bind:neww={revisionNew.unitopic}
  />

  <StringDiff
    title="from Text"
    bind:old={revisionOld.fromText}
    bind:neww={revisionNew.fromText}
  />

  <ArrayDiff
    title="Onderwerpen"
    bind:old={revisionOld.multitopics}
    bind:neww={revisionNew.multitopics}
  />

  <ArrayDiff
    title="Werkwoorden"
    bind:old={revisionOld.selectedVerbs}
    bind:neww={revisionNew.selectedVerbs}
  />

  <ArrayDiff
    title="Bloom's taxonomy"
    bind:old={revisionOld.taxonomy_bloom}
    bind:neww={revisionNew.taxonomy_bloom}
  />

  <StringDiff
    title="Solo's taxonomy"
    bind:old={revisionOld.taxonomy_solo}
    bind:neww={revisionNew.taxonomy_solo}
  />
{:else}
  Loading...
{/if}
