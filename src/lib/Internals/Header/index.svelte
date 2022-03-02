<script>
  import logo from "$lib/Internals/Header/logo.svg";
  import logosmall from "$lib/Internals/Header/logo-small.svg";
  import personIcon from "$lib/Internals/Header/person-icon.svg";
  import Transition from "svelte-class-transition";
  import { getStores, session, page } from "$app/stores";
  import { firebaseStore } from "$lib/Internals/Firebase/store";
  import { login } from "$lib/Internals/Firebase/helper";
  import Button from "../Button/Button.svelte";
  import { t } from "svelte-intl-precompile";

  $: firebase = $firebaseStore;

  let openMenu = false;
  let openUserMenu = false;
  let mainMenuLinks = [];

  async function loginWithHeader() {
    let result = await login(firebase, $t);
    if (result !== null) {
      $session.user = result.user;
      $session.player = result.player;
    }
  }

  $: if ($page && $page.path) {
    mainMenuLinks = [
      {
        url: "/",
        content: $t("the-journey"),
        datacy: "de-reis-menu",
        isActive: $page.path === "/" ? true : false,
      },
      {
        url: "/curriculum",
        content: $t("curriculum"),
        datacy: "curriculum-menu",
        isActive: $page.path === "/curriculum" ? true : false,
      },
    ];
  }

  async function logout() {
    await firebase.auth().signOut();
    openUserMenu = false;
  }
</script>

<header>
  <nav class="bg-blue-500">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <div aria-controls="mobile-menu" aria-expanded="false">
            <Button
              on:click={() => (openMenu = !openMenu)}
              size="icon-square"
              color="blueWhiteIcon"
            >
              <span class="sr-only">{$t("open-main-menu")}</span>
              <svg
                class="{openMenu === true ? 'hidden' : 'block'} block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="{openMenu === true ? 'block' : 'hidden'} h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <a href="/"
              ><img
                class="block lg:hidden h-10 w-auto"
                src={logosmall}
                alt={$t("logo-text")}
                data-test="mobile-logo"
              /></a
            >
            <a href="/"
              ><img
                class="hidden lg:block  h-10 w-auto"
                src={logo}
                alt={$t("logo-text")}
                data-test="desktop-logo"
              /></a
            >
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              {#each mainMenuLinks as mainMenuLink}
                {#if mainMenuLink.isActive}
                  <a
                    href={mainMenuLink.url}
                    data-test={mainMenuLink.datacy}
                    class="bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page">{mainMenuLink.content}</a
                  >
                {:else}
                  <a
                    href={mainMenuLink.url}
                    data-test={mainMenuLink.datacy}
                    class="text-blue-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >{mainMenuLink.content}</a
                  >
                {/if}
              {/each}
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          {#if !$session.user || $session.user.isAnonymous}
            <div class="ml-10 space-x-4">
              <a
                href="#"
                on:click|preventDefault={() => loginWithHeader(firebase)}
                class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                >{$t("sign-in")}</a
              >
            </div>
          {:else}
            <div class="ml-3 relative">
              <div
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <Button
                  id="user-menu-button"
                  on:click={() => (openUserMenu = !openUserMenu)}
                  dataTest="user-menu"
                  color="whiteFullIcon"
                  size="icon-round"
                >
                  <span class="sr-only">{$t("open-user-menu")}</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src={personIcon}
                    alt="User menu"
                  />
                </Button>
              </div>

              <Transition
                toggle={openUserMenu}
                inTransition="transition ease-out duration-100"
                inState="transform opacity-0 scale-95"
                onState="transform opacity-100 scale-100"
                outTransition="transition ease-in duration-75"
                outState="transform hidden opacity-0 scale-95"
              >
                <div
                  class="highz origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <a
                    href="/lerarenkamer"
                    on:click={() => (openUserMenu = false)}
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-teacher-room">{$t("teachers-room")}</a
                  >
                  <a
                    href="/curriculum-profiel/mijn-profiel"
                    on:click={() => (openUserMenu = false)}
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-curriculum">{$t("curriculum-profile")}</a
                  >
                  <a
                    href="/logout"
                    on:click|preventDefault={logout}
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2">{$t("sign-out")}</a
                  >
                </div>
              </Transition>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <div class:hidden={!openMenu} class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 highz">
        <a
          href="/lerarenkamer"
          on:click={() => (openUserMenu = false)}
          class="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-teacher-room">{$t("teachers-room")}</a
        >
        <a
          href="/curriculum-profiel/mijn-profiel"
          on:click={() => (openUserMenu = false)}
          class="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-curriculum">{$t("curriculum-profile")}</a
        >
        <a
          href="/logout"
          on:click|preventDefault={logout}
          class="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-2">{$t("sign-out")}</a
        >
      </div>
    </div>
  </nav>
</header>

<style>
  .highz {
    z-index: 10000;
  }
</style> 
