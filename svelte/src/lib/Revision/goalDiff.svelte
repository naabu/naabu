<script>
  import ArrayDiff from "$lib/Diff/arrayDiff.svelte";
  import StringDiff from "$lib/Diff/stringDiff.svelte";
  import { checkArrayIsTheSame, getDateString } from "$lib/Misc/helper";
  import { goto } from "$app/navigation";
  import MainTabs from "$lib/Tabs/revision.svelte";
  export let revisionOld;
  export let revisionNew;
  export let goBackRevision;
  export let goForwardRevision;
  export let loading = false;

  let battlesDiff = [];

  $: if (revisionOld && revisionNew) {
    setBattleNames(revisionOld);
    setBattleNames(revisionNew);
    compareBattles();
  }

  function compareBattles() {
    battlesDiff = [];

    if (revisionNew.battles) {
      for (let i = 0; i < revisionNew.battles.length; i++) {
        let battleOldIndex = revisionOld.battleNames.indexOf(
          revisionNew.battles[i].name
        );

        if (battleOldIndex !== -1) {
          setQuizIds(revisionNew.battles[i]);
          setQuizIds(revisionOld.battles[battleOldIndex]);

          let newBattle = {
            name: revisionNew.battles[i].name,
            newQuizIds: revisionNew.battles[i].quizIds,
            oldQuizIds: revisionOld.battles[battleOldIndex].quizIds,
            differs: false,
          };

          if (
            !checkArrayIsTheSame(newBattle.newQuizIds, newBattle.oldQuizIds)
          ) {
            newBattle.differs = true;
          }

          let quizzesToDiff = [];
          for (let i2 = 0; i2 < revisionNew.battles[i].quizzes.length; i2++) {
            let quizOldIndex = newBattle.oldQuizIds.indexOf(
              revisionNew.battles[i].quizzes[i2].id
            );
            if (quizOldIndex !== -1) {
              let quizNew = revisionNew.battles[i].quizzes[i2];
              let quizOld =
                revisionOld.battles[battleOldIndex].quizzes[quizOldIndex];
              let answerTextNew = [];
              let answerCorrectNew = [];
              let answerTextOld = [];
              let answerCorrectOld = [];

              for (let i3 = 0; i3 < quizNew.answers.length; i3++) {
                answerTextNew.push(quizNew.answers[i3].answer);
                let correct = "Goede antwoord";
                if (!quizNew.answers[i3].correct) {
                  correct = "Fout antwoord";
                }
                answerCorrectNew.push(correct);
              }

              for (let i3 = 0; i3 < quizOld.answers.length; i3++) {
                answerTextOld.push(quizOld.answers[i3].answer);
                let correct = "Goede antwoord";
                if (quizNew.answers[i3] && !quizNew.answers[i3].correct) {
                  correct = "Fout antwoord";
                }
                answerCorrectOld.push(correct);
              }
              let quizzesToAdd = {
                newQuestion: quizNew.question,
                oldQuestion: quizOld.question,
                newAnswerText: answerTextNew,
                oldAnswerText: answerTextOld,
                newAnswerCorrect: answerCorrectNew,
                oldAnswerCorrect: answerCorrectOld,
                quizId: quizNew.id,
                quizzDiffers: false,
              };
              if (
                !checkArrayIsTheSame(
                  quizzesToAdd.newAnswerText,
                  quizzesToAdd.oldAnswerText,
                  quizzesToAdd.newAnswerCorrect,
                  quizzesToAdd.oldAnswerCorrect
                ) ||
                quizzesToAdd.newQuestion !== quizzesToAdd.oldQuestion
              ) {
                quizzesToAdd.quizzDiffers = true;
                newBattle.differs = true;
              }
              quizzesToDiff.push(quizzesToAdd);
            }
          }
          newBattle.quizzes = quizzesToDiff;

          battlesDiff = [...battlesDiff, newBattle];
        }
      }
    }
  }

  function setBattleNames(revision) {
    let battleNames = [];
    if (revision.battles) {
      for (let i = 0; i < revision.battles.length; i++) {
        battleNames.push(revision.battles[i].name);
      }
    }
    revision.battleNames = battleNames;
  }

  function setQuizIds(battle) {
    let quizIds = [];
    if (battle.quizzes) {
      for (let i = 0; i < battle.quizzes.length; i++) {
        if (battle.quizzes[i].id) {
          quizIds.push(battle.quizzes[i].id);
        }
      }
    }
    battle.quizIds = quizIds;
  }

  async function createPostFromRevision() {
    goto(
      "/overleg/revisie/" +
        revisionNew.goalId +
        "/" +
        revisionNew.revisionId +
        "/" +
        revisionOld.revisionId +
        "/aanmaken"
    );
  }
</script>

<MainTabs bind:revision={revisionNew} subSelected="read" />

{#if !loading}
  <div class="max-w-7xl flex">
    <button
      data-cy="discuss-revision-button"
      class="mt-3 bg-white py-2 ml-auto px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      on:click|preventDefault={createPostFromRevision}
      >Overleg deze wijzigingen</button
    >
  </div>
  <div class="">
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
                  {getDateString(revisionOld.createdAt)}
                </a>
                (<a class="underline" href="/revisie/{revisionOld.id}/wijzigen"
                  >edit</a
                >)
                <div>
                  {#if revisionOld.authorId && revisionOld.curriculumProfile}
                    <div>
                      <a
                        class="underline"
                        href="/curriculum-profiel/{revisionOld.authorId}"
                        >{revisionOld.curriculumProfile.fullname}</a
                      >
                    </div>
                  {/if}
                  {#if goBackRevision}
                    <div class="mt-6">
                      <a
                        class="underline"
                        href="/revisie/{revisionOld.revisionId}/diff/{goBackRevision.revisionId}"
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
                  {getDateString(revisionNew.createdAt)}</a
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
                        href="/revisie/{goForwardRevision.revisionId}/diff/{revisionNew.revisionId}"
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
  />

  {#each battlesDiff as battle}
    {#if battle.differs}
      <b>Veldslag {battle.name}</b>
    {/if}

    <ArrayDiff
      title="Quizzes"
      bind:old={battle.oldQuizIds}
      bind:neww={battle.newQuizIds}
    />
    {#each battle.quizzes as quizz, i}
      {#if quizz.quizzDiffers}
        <b>Quizz {quizz.quizId}</b>
      {/if}
      <!-- bind:differs={battle.quizzes[i].differsQuestion} -->
      <StringDiff
        title="Vraag"
        bind:old={quizz.oldQuestion}
        bind:neww={quizz.newQuestion}
      />
      <!--       bind:differs={battle.quizzes[i].differsAnswers} -->
      <ArrayDiff
        title="Antwoorden"
        bind:old={quizz.oldAnswerText}
        bind:neww={quizz.newAnswerText}
        bind:old2={quizz.oldAnswerCorrect}
        bind:neww2={quizz.newAnswerCorrect}
      />
    {/each}
  {/each}
{:else}
  <div class="mt-4">Loading...</div>
{/if}
