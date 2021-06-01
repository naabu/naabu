<script>
  import {page } from "$app/stores";
  import ShowBreadcrumb from "$lib/Breadcrumb/show.svelte";

  export let activity;
  
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
</script>


<style>
  .video {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    top: 0;
  }

  iframe {
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
    <iframe title="De video" src="https://player.vimeo.com/video/{activity.video.vimeoId}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  </div>
  {:else}
    <!-- TODO: cleaner error message -->
    <p>Activiteit niet gevonden</p>
  {/if}
</div>

