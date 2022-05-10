<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { t } from "svelte-intl-precompile";
  const dispatch = createEventDispatcher();

  export let data;
  export let interruptions = [];
  let interrupted = false;
  let isObserved = false;
  let youTubeIframeReady = false;

  export function advance() {
    if (player) {
      lastActiveInterruption = activeInterruption;
      activeInterruption = null;
      hideVideoIframe = false;
      player.playVideo();
      interrupted = false;
    }
  }

  export function observe() {
    isObserved = true;
    hideVideoIframe = false;
  }

  let endVideoInSeconds = null;
  let hideVideoIframe = false;
  let mounted = false;

  let activeInterruption = null;
  let lastActiveInterruption = null;

  let element;
  let player;
  let iframe;
  let y;
  let videoHasEnded = false;
  let initialized = false;
  let lastYoutubeId = null;

  function end() {
    dispatch("end");
  }

  $: if (videoHasEnded) {
    end();
  }

  $: if (mounted && data.video && data.video.youtubeId) {
    initialized = true;
  }

  $: (async () => {
    if (
      initialized &&
      data.video.youtubeId &&
      lastYoutubeId !== data.video.youtubeId &&
      youTubeIframeReady
    ) {
      console.log("trigger?");
      iframe = document.querySelector("#youtubeVideo iframe");
      if (iframe !== null && player) {
        console.log(player);
        lastYoutubeId = data.video.youtubeId;
        await player.pauseVideo();
        await player.loadVideoById(data.video.youtubeId);
      } else {
        initializeVideoPlayer();
      }
    }
  })();

  function initializeVideoPlayer() {
    if ((element = document.getElementById("youtubeVideo"))) {
      iframe = document.querySelector("#youtubeVideo iframe");
      if (iframe === null && data.video && data.video.youtubeId) {
        let youtubeOptions = {
          videoId: data.video.youtubeId,
          playerVars: {
            playsinline: 1,
          },
          events: {
            onReady: onPlayerReady,
          },
        };
        lastYoutubeId = data.video.youtubeId;
        player = new YT.Player("youtubeIframe", youtubeOptions);
      }
      console.log(player);
    }
  }

  function onPlayerReady(event) {
    let videoDuration = event.target.getDuration();
    endVideoInSeconds = videoDuration - 3;

    iframe = document.querySelector("#youtubeVideo iframe");
    iframe.setAttribute("data-test", "youtube-iframe");

    setInterval(checkTime, 10);
  }

  async function checkTime() {
    if (interrupted === true) {
      return;
    }
    let seconds = await player.getCurrentTime();

    if (endVideoInSeconds !== null && seconds >= endVideoInSeconds) {
      videoHasEnded = true;
    }
    for (let i = 0; i < interruptions.length; i++) {
      let interruption = interruptions[i];
      let difference = seconds - interruption.data.timeInVideo;
      if (
        activeInterruption === null &&
        difference > 0 &&
        difference < 1 &&
        (lastActiveInterruption === null ||
          lastActiveInterruption.order !== interruption.order)
      ) {
        player.pauseVideo();
        activeInterruption = interruption;
        hideVideoIframe = true;
        dispatch("interrupt", { interruption: interruption });
        interrupted = true;
      }
      if (
        (difference > 1 || difference < -1) &&
        lastActiveInterruption !== null &&
        interruption.order === lastActiveInterruption.order
      ) {
        lastActiveInterruption = null;
      }
    }
  }

  function observeComplete() {
    isObserved = false;
    hideVideoIframe = true;
    dispatch("observeComplete");
  }

  onMount(async () => {
    mounted = true;
    try {
      if (YT.loaded) {
        initializeVideoPlayer();
      }
    } catch (e) {}
  });

  window.addEventListener("iframeApiReady", function (e) {
    youTubeIframeReady = true;
    initializeVideoPlayer();
  });
</script>

<svelte:head>
  <script src="https://www.youtube.com/iframe_api"></script>
  <script>
    function onYouTubePlayerAPIReady() {
      window.dispatchEvent(new Event("iframeApiReady"));
    }
  </script>
</svelte:head>

<div
  class:displaynone={hideVideoIframe || isObserved === false}
  class="relative ml-8 mt-12 float-left z-20"
>
  <Button
    on:click={observeComplete}
    color="primary"
    dataTest="back-to-interruption"
    content={$t("back-to-interruption")}
  />
</div>

<div class:displaynone={hideVideoIframe} class="video mt-4">
  <div id="youtubeVideo">
    <div id="youtubeIframe" />
  </div>
</div>

<div class:displaynone={!hideVideoIframe}>
  <div class="bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="max-w-none mx-auto">
        <div
          class="interruption-container bg-white overflow-hidden sm:rounded-lg sm:shadow p-4"
        >
          <slot name="interruption" />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .video {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    top: 0;
  }

  #youtubeVideo :global(iframe) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .displaynone {
    display: none;
  }

  .interruption-container {
    width: 100%;
    min-height: 52.25vw;
    position: relative;
  }
</style>
