<script>
  import Trisolaris from "./Trisolaris.svelte";
  import Simulator from "./Simulator.svelte";
  export let data;
</script>

<div id="trisolaris" class="p-8">
  <p>{data.question}</p>
  <!-- <Trisolaris/> -->
  <Simulator />
</div>

<style>
  #trisolaris :global(.container) {
    position: relative;
    width: 700px;
    height: 500px;
  }
</style>
