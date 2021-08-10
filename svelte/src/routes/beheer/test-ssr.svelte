<script context="module" >
    import { initFirebase } from "$lib/firebase";
  
    export async function load({session}) {
      console.log(session);
      let firebase = await initFirebase(session.environment, session.fb);
      return {
        props: {
          firebase: firebase
        },
      };
    }
</script>

<script>
    export let firebase;
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
</script>

SSR test page
