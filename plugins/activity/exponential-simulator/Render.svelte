<script>
  import Trisolaris from "./Trisolaris.svelte";
  import Simulator from "./Simulator.svelte";
  import { createEventDispatcher } from "svelte";
  export let data;
  const dispatch = createEventDispatcher();

  function pluginEnd() {
    dispatch("end");
  }
</script>

<div id="trisolaris" class="p-8">
  <p>{data.question}</p>
  <!-- <Trisolaris/> -->
  <Simulator bind:answer={data.answer} on:end={pluginEnd}/>
</div>

<style>
  #trisolaris :global(.container) {
    position: relative;
    width: 700px;
    height: 500px;
  }
</style>
