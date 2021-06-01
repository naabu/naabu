<script>
  import {page } from "$app/stores";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";
  import { renderKatexOutput } from "./helper.js";
  import Player from "@vimeo/player";
	import { onMount } from 'svelte';

  export let activity;
  let element;
  let player;
  let iframe;

  let breadcrumbs = [ 
    {
      url: '/beheer',
      value: 'Beheer'
    },
    {
      url: '/beheer/activiteit',
      value: 'Activiteit'
    },
    {
      url: "/beheer/activiteit/" + $page.params.id,
      value: 'Activiteit bekijken'
    },
  ];

  for (let i = 0; i < activity.quizzes.length; i++) {
    activity.quizzes[i].selectedAnswer = null;
  }
  onMount(() => {

    if ((element = document.getElementById("vimeoVideo"))) {
      iframe = document.querySelector("#vimeoVideo iframe");
      if (iframe === null) {
        let vimeoOptions = {
          id: activity.video.vimeoId,
          controls: true,
          quality: "720p",
          playsinline: true,
        };
        player = new Player("vimeoVideo", vimeoOptions);
      }
   
      player.ready().then(function () {
        iframe = document.querySelector("#vimeoVideo iframe");
        // let fullscreenButton = iframe.contentWindow.document.querySelector('.fullscreen');

        // console.log(fullscreenButton);
        player.on("play", function () {


          console.log('ON play!');
        });
        player.on("fullscreenchange", function () {
          console.log('Fullscreen!');
          if (
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
          ) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
          }
        });
        // player.play();
      });
    }
  });

  function checkCorrectAnswer(quiz) {
    console.log(quiz);
    if (quiz.answers[quiz.selectedAnswer].correct === true)
    {
      quiz.feedback = "<div class='text-green-700 font-bold'>Correct</div>";
    }
    else {
      quiz.feedback = "<div class='text-red-400 font-bold'>Incorrect</div>";
    }
    activity = activity;
  }

</script>


<style>
  .video {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    top: 0;
  }

  #vimeoVideo :global(iframe) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

</style>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css" integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc" crossorigin="anonymous">
</svelte:head>

<div>
  <ShowBreadcrumb bind:breadcrumbs/>
  {#if activity}
    <h1 class="text-lg leading-6 font-medium text-gray-900">Activiteit -
      {#if activity.title}
        {activity.title}
      {/if}
    </h1>
    {#if activity.description}
      {@html activity.description}
    {/if}
    <div class="video mt-4">
      <div id="vimeoVideo">
      </div>
      <!-- <iframe title="De video" src="https://player.vimeo.com/video/{activity.video.vimeoId}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->
    </div>

    <!-- Open the quiz  -->
    {#each activity.quizzes as quiz}
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="max-w-none mx-auto">
        <div class="bg-white overflow-hidden sm:rounded-lg sm:shadow">
          
          <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
              <div class="ml-4 mt-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  {@html renderKatexOutput(quiz.quistion)}
                </h3>
                <p class="mt-1 text-sm ">
                  {#if quiz.feedback}
                    {@html quiz.feedback}
                  {/if}
                </p>
              </div>
              <div class="ml-4 mt-4 flex-shrink-0">
                <button type="button" disabled={quiz.selectedAnswer === null} on:click|preventDefault={() => checkCorrectAnswer(quiz)} class="disabled:opacity-50 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Nakijken
                </button>
              </div>
            </div>
          </div>

                <div class="px-4 pb-5 sm:p-6 sm:pt-0">
                  {#each quiz.answers as answer, i}
                  <label class="block mt-2 mb-2 pb-2 pt-2">
                    <input type=radio bind:group={quiz.selectedAnswer} value={i}>
                      {@html "<span class='pl-3'>" + renderKatexOutput(answer.answer) + "</span>"}
                  </label>
                  {/each}     
                </div>
              </div>
            </div>
      </div>
    </div>
    {/each}
  {:else}
    <!-- TODO: cleaner error message -->
    <p>Activiteit niet gevonden</p>
  {/if}
</div>

