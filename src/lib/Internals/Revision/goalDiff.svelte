<script>
  import ArrayDiff from "$lib/Internals/Revision/ArrayDiff.svelte";
  import StringDiff from "$lib/Internals/Revision/StringDiff.svelte";
  import {
    checkArrayIsTheSame,
    getDateString,
  } from "$lib/Internals/Misc/helper";
  import { goto } from "$app/navigation";
  import MainTabs from "$lib/Internals/Tabs/revision.svelte";
  import Button from "../Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
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
                let correct = $t("correct-answer");
                if (!quizNew.answers[i3].correct) {
                  correct = $t("wrong-answer");
                }
                answerCorrectNew.push(correct);
              }

              for (let i3 = 0; i3 < quizOld.answers.length; i3++) {
                answerTextOld.push(quizOld.answers[i3].answer);
                let correct = $t("correct-answer");
                if (quizNew.answers[i3] && !quizNew.answers[i3].correct) {
                  correct = $t("wrong-answer");
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
  <div class="max-w-7xl flex mt-3 justify-end">
    <Button
      dataTest="discuss-revision-button"
      content={$t("discuss-changes-revision")}
      size="small"
      on:click={createPostFromRevision}
    />
  </div>
  <div class="">
    <div class="max-w-7xl mx-auto py-2 sm:px-6 lg:px-4">
      <div class="max-w-none mx-auto">
        <div class="overflow-hidden">
          <div class="bg-white border-b border-gray-200 px-4 py-5 sm:px-6">
            <div class="flex space-x-3">
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">
                  {$t("difference-between-versions")}
                </p>
              </div>
              <div class="flex-shrink-0 self-center flex" />
            </div>
          </div>

          <div class="grid gap-4 mt-2 grid-cols-2 px-4 pb-5 sm:p-6 sm:pt-0">
            <div>
              {#if revisionOld}
                <a class="underline" href="/revisie/{revisionOld.revisionId}">
                  {getDateString(revisionOld.createdAt)}
                </a>
                (<a
                  class="underline"
                  href="/revisie/{revisionOld.revisionId}/wijzigen"
                  >{$t("edit")}</a
                >)
                <div>
                  {#if revisionOld.revisionAuthorId && revisionOld.curriculumProfile}
                    <div>
                      <a
                        class="underline"
                        href="/curriculum-profiel/{revisionOld.revisionAuthorId}"
                        >{revisionOld.curriculumProfile.fullname}</a
                      >
                    </div>
                  {/if}
                  {#if goBackRevision}
                    <div class="mt-6">
                      <a
                        class="underline"
                        href="/revisie/{revisionOld.revisionId}/diff/{goBackRevision.revisionId}"
                        >{$t("older-version")}</a
                      >
                    </div>
                  {/if}
                </div>
              {/if}
            </div>

            <div>
              {#if revisionNew}
                <a class="underline" href="/revisie/{revisionNew.revisionId}">
                  {getDateString(revisionNew.createdAt)}</a
                >
                (<a
                  class="underline"
                  href="/revisie/{revisionNew.revisionId}/wijzigen"
                  >{$t("edit")}</a
                >)
                <div>
                  {#if revisionNew.revisionAuthorId && revisionNew.curriculumProfile}
                    <div>
                      <a
                        class="underline"
                        href="/curriculum-profiel/{revisionNew.revisionAuthorId}"
                        >{revisionNew.curriculumProfile.fullname}</a
                      >
                    </div>
                  {/if}
                  {#if goForwardRevision}
                    <div class="mt-6">
                      <a
                        class="underline"
                        href="/revisie/{goForwardRevision.revisionId}/diff/{revisionNew.revisionId}"
                        >{$t("newer-version")}</a
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
    titleTranslationKey="title"
    bind:old={revisionOld.title}
    bind:neww={revisionNew.title}
  />

  <StringDiff
    titleTranslationKey="description"
    bind:old={revisionOld.description}
    bind:neww={revisionNew.description}
  />

  <StringDiff
    titleTranslationKey="topic"
    bind:old={revisionOld.unitopic}
    bind:neww={revisionNew.unitopic}
  />

  <StringDiff
    titleTranslationKey="from-text"
    bind:old={revisionOld.fromText}
    bind:neww={revisionNew.fromText}
  />

  <ArrayDiff
    titleTranslationKey="topics"
    bind:old={revisionOld.multitopics}
    bind:neww={revisionNew.multitopics}
  />

  <ArrayDiff
    titleTranslationKey="verbs"
    bind:old={revisionOld.selectedVerbs}
    bind:neww={revisionNew.selectedVerbs}
  />

  <ArrayDiff
    titleTranslationKey="blooms-taxonomy"
    bind:old={revisionOld.taxonomy_bloom}
    bind:neww={revisionNew.taxonomy_bloom}
  />

  <StringDiff
    titleTranslationKey="solo-taxonomy"
    bind:old={revisionOld.taxonomy_solo}
    bind:neww={revisionNew.taxonomy_solo}
  />

  <StringDiff
    titleTranslationKey="goal"
    bind:old={revisionOld.goals}
    bind:neww={revisionNew.goals}
  />

  <ArrayDiff
    titleTranslationKey="tests"
    bind:old={revisionOld.battleNames}
    bind:neww={revisionNew.battleNames}
  />

  {#each battlesDiff as battle}
    {#if battle.differs}
      <b>{$t("test")} {battle.name}</b>
    {/if}

    <ArrayDiff
      titleTranslationKey="quizzes"
      bind:old={battle.oldQuizIds}
      bind:neww={battle.newQuizIds}
    />
    {#each battle.quizzes as quizz, i}
      {#if quizz.quizzDiffers}
        <b>{$t("quiz")} {quizz.quizId}</b>
      {/if}
      <!-- bind:differs={battle.quizzes[i].differsQuestion} -->
      <StringDiff
        titleTranslationKey="question"
        bind:old={quizz.oldQuestion}
        bind:neww={quizz.newQuestion}
      />
      <!--       bind:differs={battle.quizzes[i].differsAnswers} -->
      <ArrayDiff
        titleTranslationKey="answers"
        bind:old={quizz.oldAnswerText}
        bind:neww={quizz.newAnswerText}
        bind:old2={quizz.oldAnswerCorrect}
        bind:neww2={quizz.newAnswerCorrect}
      />
    {/each}
  {/each}
{:else}
  <div class="mt-4">{$t("loading")}</div>
{/if}
