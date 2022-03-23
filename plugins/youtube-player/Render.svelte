<script>
  import Button from "$lib/Internals/Button/Button.svelte";
  import Player from "@vimeo/player";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { t } from "svelte-intl-precompile";
  const dispatch = createEventDispatcher();

  export let data;
  export let interruptions = [];
  let interrupted = false;

  let isObserved = false;

  export function advance() {
    if (player) {
      lastActiveInterruption = activeInterruption;
      activeInterruption = null;
      hideVideoIframe = false;
      player.play();
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
  let lastVimeoId = null;

  function end() {
    dispatch("end");
  }

  $: if (videoHasEnded) {
    end();
  }

  $: if (mounted && data.video.vimeoId) {
    initializeVideoPlayer();
    initialized = true;
  }

  $: (async () => {
    if (
      initialized &&
      data.video.vimeoId &&
      lastVimeoId !== data.video.vimeoId
    ) {
      iframe = document.querySelector("#vimeoVideo iframe");
      if (iframe !== null) {
        player = new Player(iframe);
        lastVimeoId = data.video.vimeoId;
        await player.loadVideo(data.video.vimeoId);
      }
    }
  })();

  function initializeVideoPlayer() {
    if ((element = document.getElementById("vimeoVideo"))) {
      iframe = document.querySelector("#vimeoVideo iframe");
      if (iframe === null) {
        let vimeoOptions = {
          id: data.video.vimeoId,
          controls: true,
          quality: "720p",
          playsinline: true,
        };
        lastVimeoId = data.video.vimeoId;
        player = new Player("vimeoVideo", vimeoOptions);
      }

      player.ready().then(function () {
        iframe = document.querySelector("#vimeoVideo iframe");
        iframe.setAttribute("data-test", "vimeo-iframe");

        setInterval(checkTime, 10);

        player.on("play", function (videoData) {
          endVideoInSeconds = videoData.duration - 7;
        });

        player.on("fullscreenchange", function () {
          scrollABitToTheTop();
          displayNotification = true;
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
      });
    }
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
        player.pause();
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
  });
</script>

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
  <div id="vimeoVideo" />
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

  #vimeoVideo :global(iframe) {
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
