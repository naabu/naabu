<!-- <script context="module" >
    import { initFirebase } from "$lib/Internals/Firebase/loadFirebase.svelte";
  
    export async function load({session}) {
       = await initFirebase(session.environment, session.fb);
      return {
        props: {
         $firebase:$firebase
        },
      };
    }
</script>

<script>
import { login } from "$lib/Internals/Firebase/helper";

   
    login(firebase);
</script>

SSR test page -->
