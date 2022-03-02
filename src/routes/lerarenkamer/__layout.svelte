<script>
  import { getStores, session } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { login } from "$lib/Internals/Firebase/helper";
  import { t } from "svelte-intl-precompile";

  async function loginTeacher() {
    let firebase = $firebaseStore;
    if (firebase) {
      try {
        let result = await login(firebase, $t);
        if (result !== null) {
          $session.user = result.user;
          $session.player = result.player;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
</script>

{#if $firebaseStore}
  {#if $session.user}
    <slot />
  {:else}
    <p>{$t("login-teachersroom-message")}</p>
    <a
      href="#"
      on:click|preventDefault={loginTeacher}
      class="inline-block mt-4 bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
      >{$t("sign-in")}</a
    >
  {/if}
{/if}
