<script>
  import logo from "./logo.svg";
  import logosmall from "./logo-small.svg";
  import personIcon from "./person-icon.svg";
  import Transition from "svelte-class-transition";
 // import firebase from "firebase/app";
  // import {getFirebaseAuth} from '$lib/firebase.js';
  import { getStores, session } from "$app/stores";
	import { onMount } from 'svelte';
  import { initFirebase } from "$lib/firebase";


  let firebase;

  let openMenu = false;
  let openUserMenu = false;

  onMount(async () => {
    firebase = await initFirebase($session.environment);
  });

  async function login() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (e) {
      console.log(e);
    }
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
          <button
            type="button"
            on:click={() => (openMenu = !openMenu)}
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
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
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <a href="/"
              ><img
                class="block lg:hidden h-6 w-auto"
                src={logosmall}
                alt="Wisvids"
              /></a
            >
            <a href="/"
              ><img
                class="hidden lg:block  h-6 w-auto"
                src={logo}
                alt="Wisvids"
              /></a
            >
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a
                href="/"
                class="bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                aria-current="page">De reis</a
              >

              <!-- <a href="#" class="text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
  
			  <a href="#" class="text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
  
			  <a href="#" class="text-gray-300 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a> -->
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- <button class="bg-blue-500 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white">
			<span class="sr-only">View notifications</span>
			<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
			  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
			</svg>
		  </button> -->

          <!-- Profile dropdown -->
          {#if !$session.user}
            <div class="ml-10 space-x-4">
              <a
                href="#"
                on:click|preventDefault={login}
                class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                >Sign in</a
              >
              <a
                href="#"
                on:click|preventDefault
                class="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >Sign up</a
              >
            </div>
          {:else}
            <div class="ml-3 relative">
              <div>
                <button
                  type="button"
                  on:click={() => (openUserMenu = !openUserMenu)}
                  class="bg-blue-500 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src={personIcon}
                    alt="User menu"
                  />
                </button>
              </div>

              <Transition
                toggle={openUserMenu}
                inTransition="transition ease-out duration-100"
                inState="transform opacity-0 scale-95"
                onState="transform opacity-100 scale-100"
                outTransition="transition ease-in duration-75"
                outState="transform opacity-0 scale-95"
              >
                <div
                  class="highz origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  {#if $session.user.idTokenResult.claims.canModerate}
                    <a
                      href="/beheer"
                      on:click={() => (openUserMenu = false)}
                      class="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-1">Beheer</a
                    >
                  {/if}
                  <a
                    href="/logout"
                    on:click|preventDefault={logout}
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2">Sign out</a
                  >
                </div>
              </Transition>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class:hidden={!openMenu} class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 highz">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <a
          href="#"
          class="bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium"
          aria-current="page">Dashboard</a
        >

        <a
          href="#"
          class="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Team</a
        >

        <a
          href="#"
          class="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Projects</a
        >

        <a
          href="#"
          class="text-gray-300 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Calendar</a
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
