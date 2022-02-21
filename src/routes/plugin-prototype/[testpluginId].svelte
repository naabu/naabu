<script>
  import { getStores, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import ShowPlugins from "$lib/Internals/Plugin/Show.svelte";
  export let finished = false;
  let testObject;
  let mounted = false;
  let firebase;

  $: (async () => {
    if ($firebaseStore && !mounted) {
      firebase = $firebaseStore;
      let db = await firebase.firestore();
      let ref = db.collection("testplugin").doc($page.params.testpluginId);
      let snap = await ref.get();
      if (snap.exists) {
        testObject = snap.data();
        testObject.id = testObject.id;
        if (testObject.plugins) {
          testObject.plugins = JSON.parse(testObject.plugins);
        }
      }
      mounted = true;
    }
  })();
</script>

{#if mounted}
  <ShowPlugins bind:object={testObject} bind:finished />

  {#if finished}
    Plugin is finished! do something cool now. Like show the engagement widget.
  {/if}
{:else}
  Loading...
{/if}
