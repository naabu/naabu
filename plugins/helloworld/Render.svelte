<script>
  export let data;
  import Button from "$lib/Internals/Button/Button.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  if (!data.name) {
    data.name = "World";
  }

  function end() {
    dispatch("end");
  }
</script>

<p>
  Hello {data.name}
</p>

<Button on:click={end} content="Continue" />
