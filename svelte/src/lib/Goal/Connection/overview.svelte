<script>
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/learningGoalConnections.svelte";
  import PublishedLists from "$lib/Goal/Connection/List/published.svelte";
  export let goal;
  export let firebase;
</script>

<MainTabs bind:goal mainSelected="connections" />
<SecondTabs bind:goal mainSelected="overview" />

<div class="mt-8 mb-8 flex">
  <a class="underline ml-auto" href="verbinding-maken">
    Nieuwe verbinding maken</a
  >
</div>

<h3 class="text-lg leading-6 font-medium text-gray-900">
  Gepubliceerde voorkennis
</h3>
<div>
  <PublishedLists
    bind:goal
    bind:firebase
    bind:connectionArray={goal.publishedPrerequisites}
    linkType="voorkennis"
  />
</div>

<div class="mt-4 mb-4">
  <h3 class="text-lg leading-6 font-medium text-gray-900">
    Gepubliceerde specialisatie
  </h3>
  <PublishedLists
    bind:goal
    bind:firebase
    bind:connectionArray={goal.publishedSpecializations}
    linkType="specialisatie"
  />
</div>

<div class="mt-4 mb-4">
  <h3 class="text-lg leading-6 font-medium text-gray-900">
    Gepubliceerde grote ideeën
  </h3>

  <PublishedLists
    bind:goal
    bind:firebase
    bind:connectionArray={goal.publishedBigideas}
    linkType="groot-idee"
  />
</div>

<div class="mt-4 mb-4">
  <h3 class="text-lg leading-6 font-medium text-gray-900">
    Gepubliceerde diepere inzichten
  </h3>

  <PublishedLists
    bind:goal
    bind:firebase
    bind:connectionArray={goal.publishedDeeperunderstandings}
    linkType="dieper-inzicht"
  />
</div>
