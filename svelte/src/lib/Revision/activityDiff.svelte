<script>
  import ArrayDiff from "$lib/Diff/arrayDiff.svelte";
  import StringDiff from "$lib/Diff/stringDiff.svelte";
  import { checkArrayIsTheSame, getDateString } from "$lib/Misc/helper";
  import { goto } from "$app/navigation";
  import MainTabs from "$lib/Tabs/revision.svelte";
  import { getDifferencesBetweenRevisions } from "./helper";
  import {
    getDifficultyToString,
    getStatusTranslation,
    getTypeText,
  } from "$lib/Activity/helper";
  import { getStatusText } from "$lib/Connection/helper";
  export let revisionOld;
  export let revisionNew;
  export let loading = false;
  export let differences = [];
  let orderedDifference;
  let sortListOrder = [
    "status",
    "type",
    "goalTitle",
    "title",
    "descriptionRaw",
    "difficulty",
    "video",
    "quizzes",
  ];

  $: if (revisionOld && revisionNew) {
    differences = getDifferencesBetweenRevisions(revisionOld, revisionNew);
    orderedDifference = [];
    let foundIndexes = [];
    for (let i = 0; i < sortListOrder.length; i++) {
      let key = sortListOrder[i];
      for (let i2 = 0; i2 < differences.length; i2++) {
        let difference = differences[i2];
        if (difference.keys[0] === key) {
          orderedDifference.push(difference);
          foundIndexes.push(i2);
        }
      }
    }

    // Include the rest that is not in the ordering.
    for (let i = 0; i < differences.length; i++) {
      if (!foundIndexes.includes(i)) {
        orderedDifference.push(differences[i]);
      }
    }
  }
  /**
   * Item
   *   Keys [asdas, asdads]
   *   odl
   *
   * Item ..
   *   Keys
   *
   * */

  function formatValue(difference, value) {
    if (value === "") {
      return value;
    }
    if (difference.keys[difference.keys.length - 1] === "type") {
      return getTypeText(value);
    }
    if (difference.keys[difference.keys.length - 1] === "difficulty") {
      return getDifficultyToString(value);
    }
    if (difference.keys[difference.keys.length - 1] === "status") {
      return getStatusTranslation(value);
    }
    if (value === false) {
      return "Nee";
    }
    if (value === true) {
      return "Ja";
    }
    return value;
  }

  function formatKeys(keys) {
    let formatKeys = [];
    for (let i = 0; i < keys.length; i++) {
      switch (keys[i]) {
        case "descriptionRaw":
          formatKeys.push("Beschrijving");
          break;
        case "title":
          formatKeys.push("Titel");
          break;
        case "quizzes":
          formatKeys.push("Quiz");
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          if (keys[i - 1] === "quizzes") {
            formatKeys.push("vraag " + (parseInt(keys[i]) + 1));
          }
          if (keys[i - 1] === "answers") {
            formatKeys.push("antwoord " + (parseInt(keys[i]) + 1));
          }
          break;
        case "question":
          formatKeys.push("vraag");
          break;
        case "video":
          formatKeys.push("Video");
          break;
        case "vimeoId":
          formatKeys.push("vimeo id");
          break;
        case "type":
          formatKeys.push("Type");
          break;
        case "difficulty":
          formatKeys.push("Moeilijkheid");
          break;
        case "answers":
        case "answer":
          break;
        default:
          formatKeys.push(keys[i]);
          break;
        case "timeInVideo":
          formatKeys.push("tijd in video");
          break;
        case "status":
          formatKeys.push("Status");
          break;
        case "correct":
          formatKeys.push("goed antwoord");
          break;
        case "goalTitle":
          formatKeys.push("Leerdoel");
          break;
      }
    }
    return formatKeys.join(" - ") + ":";
  }
</script>

{#if !loading}
  {#each orderedDifference as difference}
    {#if difference.type === "string"}
      <StringDiff
        title={formatKeys(difference.keys)}
        old={formatValue(difference, difference.oldValue)}
        neww={formatValue(difference, difference.newValue)}
      />
    {:else if difference.type === "array"}
      <ArrayDiff
        title={formatKeys(difference.key)}
        bind:old={difference.oldValue}
        bind:neww={difference.newValue}
      />
    {/if}
  {/each}
  <!-- <div class="">
    <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-4">
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
                  {getDateString(revisionOld.revisionCreatedAt)}
                </a>
                (<a class="underline" href="/revisie/{revisionOld.id}/wijzigen"
                  >edit</a
                >)
                <div>
                  {#if goBackRevision}
                    <div class="mt-6">
                      <a
                        class="underline"
                        href="/revisie/{revisionOld.id}/diff/{goBackRevision.id}"
                        >← Oudere bewerking</a
                      >
                    </div>
                  {/if}
                </div>
              {/if}
            </div>

            <div>
              {#if revisionNew}
                <a class="underline" href="/revisie/{revisionNew.id}">
                  {getDateString(revisionNew.revisionCreatedAt)}</a
                >
                (<a class="underline" href="/revisie/{revisionNew.id}/wijzigen"
                  >edit</a
                >)
                <div>
                  {#if revisionNew.authorId && revisionNew.curriculumProfile}
                    <div>
                      <a
                        class="underline"
                        href="/curriculum-profiel/{revisionNew.authorId}"
                        >{revisionNew.curriculumProfile.fullname}</a
                      >
                    </div>
                  {/if}
                  {#if goForwardRevision}
                    <div class="mt-6">
                      <a
                        class="underline"
                        href="/revisie/{goForwardRevision.id}/diff/{revisionNew.id}"
                        >Nieuwere bewerking →</a
                      >
                    </div>
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

  <StringDiff
    title="Solo's taxonomy"
    bind:old={revisionOld.goals}
    bind:neww={revisionNew.goals}
  />

  <ArrayDiff
    title="Battles"
    bind:old={revisionOld.battleNames}
    bind:neww={revisionNew.battleNames}
  /> -->
{:else}
  <div class="mt-4">Loading...</div>
{/if}
