<script>
  import ManagementTabs from "$lib/Internals/Tabs/management.svelte";
  import ShowBreadcrumb from "$lib/Internals/Breadcrumb/show.svelte";
  import { getStores, page, session } from "$app/stores";
  import { onMount } from "svelte";
  import Notification from "$lib/Internals/Misc/notification.svelte";
  import { firebase } from "$lib/Internals/Firebase/store";
  import Button from "../Button/Button.svelte";
  import { t } from "svelte-intl-precompile";
  import { user } from "$lib/Internals/User/store";
 
  let loaded = false;

  let db;

  $: (async () => {
    if ($firebase) {
      db = $firebase.firestore()
    }
  })();


  let displayNotification = false;
  let notificationText = {
    title: $t("export-success-copy"),
    description: $t("export-can-be-used"),
  };

  let breadcrumbs = [
    {
      url: "/beheer",
      value: $t("management"),
    },
  ];

  async function trigger() {
    // We can put data in the firestore collection Name + timestamp.
    let docRef = db.collection("triggers").doc("data-export");
    await docRef.set({ lastTriggerTimestamp: Date.now() });
  }

  async function exportActivityData() {
    let docRef = db.collection("triggers").doc("data-export");
    let snap = await docRef.get();
    if (snap.exists) {
      let data = snap.data();
      if (data.output1) {
        navigator.clipboard.writeText(data.output1);
        displayNotification = true;
      }
    }
  }

  async function exportGoalData() {
    let docRef = db.collection("triggers").doc("data-export");
    let snap = await docRef.get();
    if (snap.exists) {
      let data = snap.data();
      if (data.output2) {
        navigator.clipboard.writeText(data.output1);
        displayNotification = true;
      }
    }
  }

  async function runMigrations() {
    let docRef = db.collection("triggers").doc("run-migration");
    await docRef.set({ lastTriggerTimestamp: Date.now() });
  }

  $: (async () => {
    if ($firebase) {
     
      db = await $firebase.firestore();
      loaded = true;
    }
  })();
</script>

<Notification bind:displayNotification bind:notificationText time="4000" />
<ShowBreadcrumb bind:breadcrumbs />
<ManagementTabs />

<br />

{#if $user && $user.idTokenResult.claims.canDebugDevelopment}
  <Button
    on:click={trigger}
    color="primary"
    content={$t("trigger-functions")}
  />
  <Button
    on:click={exportActivityData}
    content={$t("get-activities-export-json")}
  />
  <Button on:click={exportGoalData} content={$t("goals-export-json")} />
  <Button on:click={runMigrations} content={$t("run-migrations")} />
{/if}
