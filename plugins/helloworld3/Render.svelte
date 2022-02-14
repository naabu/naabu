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
  {data.textValue}
</p>

<Button on:click={end} content="Continue" />
