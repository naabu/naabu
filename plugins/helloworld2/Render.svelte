<script>
  import Button from "$lib/Internals/Button/Button.svelte";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function end() {
    dispatch("end");
  }
  export let data;
</script>

<p>
  This is a number: {data.number}
</p>

<Button on:click={end} content="Continue" />
