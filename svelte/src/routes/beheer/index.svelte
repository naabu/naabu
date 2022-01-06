<!-- <script context="module" >
  import { initFirebase } from "$lib/firebase";

  export async function load({session}) {
    let firebase = await initFirebase(session.environment);
    return {
      props: {
        firebase: firebase
      },
    };
  }
</script> -->


<script>
	import Beheer from '$lib/Interals/Beheer/index.svelte';
  
</script>

<Beheer/>