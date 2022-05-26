<script>
  import { getStores, session } from "$app/stores";
  import { onMount } from "svelte";
  import ResultFeedback from "$lib/Internals/Form/resultFeedback.svelte";
  import CheckPlayerHasProfile from "$lib/Goal/Curriculum/Components/checkPlayerHasProfile.svelte";
  import { getDateString } from "$lib/Internals/Misc/helper";
  import {
    sortOnCreatedAt,
    sortOnLastReplyAt,
  } from "$lib/Internals/Revision/helper";
  import MainTabs from "$lib/Internals/Tabs/talk.svelte";
  import Button from "$lib/Internals/Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  export let talkId;
  export let post;
  export let replies;
  export let goalId;
  sortOnCreatedAt(replies);
  replies.reverse();
  ;
  let newReplyText = "";
  let buttonDisabled = false;
  let db;
  let hasCurriculumProfile;
  onMount(async () => {
    db = await firebase.firestore();
  });

  let alert = getDefaultAlertValues();

  function getDefaultAlertValues() {
    return {
      success: false,
      successMessage: "",
      error: false,
      errorCode: "",
      errorMessage: "",
    };
  }

  async function createReply() {
    if ($session.user) {
      let profileRef = db
        .collection("curriculumProfile")
        .doc($session.player.curriculumProfileId);

      let data = {
        text: newReplyText,
      };
      let snap = await profileRef.get();
      if (snap.exists) {
        let profileData = snap.data();
        data.curriculumProfile = {
          fullname: profileData.fullname,
          institution: profileData.institution,
        };
        data.authorId = profileRef.id;
      }

      alert = getDefaultAlertValues();
      try {
        let replyResult = await db
          .collection("talk")
          .doc(talkId)
          .collection("posts")
          .doc(post.id)
          .collection("replies")
          .add(data);
        alert.success = true;
        alert.successTitle = $t("answer-created");
        alert.successMessage = "id: " + replyResult.id;
        let newReply = data;
        newReply.id = replyResult.id;
        newReply.createdAt = Date.now() / 1000;
        replies = [...replies, newReply];
        let postData = post;
        if (!post.numberOfReplies) {
          post.numberOfReplies = 0;
        }
        post.numberOfReplies = post.numberOfReplies + 1;
        let postResult = db
          .collection("talk")
          .doc(talkId)
          .collection("posts")
          .doc(post.id)
          .update({ numberOfReplies: post.numberOfReplies });
      } catch (e) {
        console.error($t("can-answer-not-created")+ ": ", e);
        alert.error = true;
        alert.errorCode = e.code;
        alert.errorMessage = e.message;
      }
    }
  }

  async function formSubmit(event) {
    buttonDisabled = true;
    await createReply();
    newReplyText = "";
    setTimeout(() => {
      buttonDisabled = false;
    }, 5000);
  }
</script>

{#if goalId}
  <MainTabs bind:objectId={goalId} bind:talkId talkType="goal" />
{/if}
<ResultFeedback bind:alert />
<CheckPlayerHasProfile bind:hasCurriculumProfile />
{#if post}
  <div class="mt-4 ml-auto mr-auto max-w-2xl">
    <ul role="list" class="space-y-4">
      <article aria-labelledby="question-title-81614">
        <div>
          <div class="flex space-x-3">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900">
                <a
                  data-test="profile-link"
                  class="hover:underline"
                  href="/curriculum-profiel/{post.authorId}"
                  >{post.curriculumProfile.fullname}</a
                >
                - {post.curriculumProfile.institution}
              </p>
              <p class="text-sm text-gray-500">
                {#if post.createdAt}
                  <time>{getDateString(post.createdAt)}</time>
                {/if}
              </p>
            </div>
          </div>
        </div>
        <div class="text-sm text-gray-700 space-y-4">
          <h2
            id="question-title-81614"
            class="mt-4 mb-2 text-base font-medium text-gray-900"
          >
            {#if post.title}
              {post.title}
            {/if}
          </h2>
          <p>
            {#if post.text}
              {post.text}
            {/if}
          </p>
        </div>
      </article>

      {#each replies as reply}
        <li class="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
          <article aria-labelledby="question-title-81614">
            <div>
              <div class="flex space-x-3">
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900">
                    <a
                      class="hover:underline"
                      href="/curriculum-profiel/{reply.authorId}"
                      >{reply.curriculumProfile.fullname}</a
                    >
                    - {reply.curriculumProfile.institution}
                  </p>
                  <p class="text-sm text-gray-500">
                    {#if reply.createdAt}
                      <time>{getDateString(reply.createdAt)}</time>
                    {/if}
                  </p>
                </div>
              </div>
            </div>
            <div class="text-sm text-gray-700 space-y-4">
              <p>
                {#if reply.text}
                  {reply.text}
                {/if}
              </p>
            </div>
          </article>
        </li>
      {/each}
    </ul>
  </div>
  <div class="ml-auto mr-auto max-w-2xl mt-8">
    <form on:submit|preventDefault={formSubmit}>
      <div>
        <label for="reply" class="block text-sm font-medium text-gray-700">
          {$t("answer")}
        </label>
        <div class="mt-1">
          <textarea
            id="reply"
            name="reply"
            rows="3"
            bind:value={newReplyText}
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
        <div class="mt-4 flex justify-between">
          <span class=" text-sm text-gray-500">
            {$t("keep-it-friendly-and-professional")}
          </span>
          <Button
            isDisabled={buttonDisabled || !hasCurriculumProfile}
            isSubmit={true}
            color="primary"
            content={$t("answers")}
          />
        </div>
      </div>
    </form>
  </div>
{/if}
