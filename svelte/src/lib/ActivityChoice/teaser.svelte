<script>
  import Stars from "$lib/Misc/stars.svelte";
  export let activity

</script>

<a href="/{activity.id}">
  <li class="col-span-1 rounded-lg shadow bg-black-500 text-white min-h-72 relative">
    <div class="w-full flex justify-between pt-6 pl-8 pr-6 pb-4 space-x-6 min-h-56">
      <div class="flex-1">
        <div class="flex items-center space-x-3">
          <h3 class="text-white text-lg font-bold">{activity.data.title}</h3>
        </div>
      </div>
      <div>
        {activity.data.type}
      </div>
    </div>
    <div class="pt-6 pl-8 pr-6 pb-4">
      <div class="-mt-px">
        <div class="w-0 bottom-14 absolute">
            {@html activity.data.svg}
        </div>
        <div class="float-right flex-1 flex bg-black-500 relative z-10 rounded-lg">
          <span>Moeilijkheid: </span>
          <Stars bind:value={activity.data.difficulty}/>
        </div>
      </div>
    </div>
  </li>
</a>
<!-- <h1>Activity Teaser!!</h1>

<div>
 
</div>

{#if activity.data.difficulty}
  <div>{activity.data.difficulty} </div>
{/if}

{#if activity.data.type}
  <div>{activity.data.type} </div>
{/if} -->
