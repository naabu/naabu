<script>
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/learningGoalConnections.svelte";
  import ConnectionList from "$lib/Goal/Connection/list.svelte";
  import GetConnectionListsData from "$lib/Goal/Connection/getConnectionListsData.svelte";
  export let goal;
  export let firebase;
  let mounted;
  let prerequisitesConnections;
  let specializationConnections;
  let bigideasConnections;
  let deeperunderstandingConnections;
</script>

<GetConnectionListsData
  bind:goalId={goal.id}
  type="goal-prerequisites"
  status="published"
  bind:firebase
  bind:mounted
  bind:connections={prerequisitesConnections}
/>

<GetConnectionListsData
  bind:goalId={goal.id}
  type="goal-specializations"
  status="published"
  bind:firebase
  bind:mounted
  bind:connections={bigideasConnections}
/>

<GetConnectionListsData
  bind:goalId={goal.id}
  type="goal-deeperunderstandings"
  status="published"
  bind:firebase
  bind:mounted
  bind:connections={deeperunderstandingConnections}
/>

<GetConnectionListsData
  bind:goalId={goal.id}
  type="goal-bigideas"
  status="published"
  bind:firebase
  bind:mounted
  bind:connections={deeperunderstandingConnections}
/>

<MainTabs bind:goal mainSelected="connections" />
<SecondTabs bind:goal mainSelected="overview" />

<div class="mt-8 mb-8 flex">
  <a class="underline ml-auto" href="verbinding-maken">
    Nieuwe verbinding maken</a
  >
</div>

<div>
  <h3 class="text-lg leading-6 font-medium text-gray-900">Voorkennis</h3>
  <ConnectionList
    urlType="voorkennis"
    bind:goalId={goal.id}
    bind:firebase
    bind:connections={prerequisitesConnections}
  />
</div>

<div class="mt-4 mb-4">
  <h3 class="text-lg leading-6 font-medium text-gray-900">Specialisatie</h3>
  <ConnectionList
    urlType="specialisatie"
    bind:goalId={goal.id}
    bind:firebase
    bind:connections={specializationConnections}
  />
</div>

<div class="mt-4 mb-4">
  <h3 class="text-lg leading-6 font-medium text-gray-900">Grote ideeën</h3>

  <ConnectionList
    urlType="groot-idee"
    bind:goalId={goal.id}
    bind:firebase
    bind:connections={bigideasConnections}
  />
</div>

<div class="mt-4 mb-4">
  <h3 class="text-lg leading-6 font-medium text-gray-900">Diepere inzichten</h3>

  <ConnectionList
    urlType="dieper-inzicht"
    bind:goalId={goal.id}
    bind:firebase
    bind:connections={deeperunderstandingConnections}
  />
</div>
