<script>
  import Stars from "$lib/Internals/Misc/stars.svelte";
  import { t } from "svelte-intl-precompile";
  export let activity;
  export let moduleId;
  export let locationId;
</script>

<a href="/{moduleId}/{locationId}/{activity.id}">
  <li
    class="col-span-1 rounded-lg shadow bg-black-500 text-white min-h-72 relative"
  >
    <div
      class="w-full flex justify-between pt-6 pl-8 pr-6 pb-4 space-x-6 min-h-56"
    >
      <div class="flex-1">
        <div class="flex items-center space-x-3">
          <h3 class="text-white text-lg font-bold">{activity.title}</h3>
        </div>
      </div>
      <div>
        {#if activity.type === "boss"}
          {$t("boss")}
        {:else if activity.type === "explanation"}
          {$t("explanation")}
        {:else if activity.type === "practice"}
          {$t("practice")}
        {/if}
      </div>
    </div>
    <div class="pt-6 pl-8 pr-6 pb-4">
      <div class="-mt-px">
        <div class="w-0 bottom-14 absolute">
          {@html activity.svg}
        </div>
        <div
          class="float-right flex-1 flex bg-black-500 relative z-10 rounded-lg"
        >
          <span>{$t("difficulty")}: </span>
          <Stars bind:value={activity.difficulty} />
        </div>
      </div>
    </div>
  </li>
</a>
