<script>
  import MainTabs from "$lib/Internals/Tabs/goal.svelte";
  import SecondTabs from "$lib/Internals/Tabs/learningGoalConnections.svelte";
  import ConnectionList from "$lib/Goal/Connection/Components/list.svelte";
  import GetConnectionListsData from "$lib/Goal/Connection/Data/getConnectionListsData.svelte";
  import { t } from "svelte-intl-precompile";
  export let goal;
 
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
  
  bind:mounted
  bind:connections={prerequisitesConnections}
/>

<GetConnectionListsData
  bind:goalId={goal.id}
  type="goal-specializations"
  status="published"
  
  bind:mounted
  bind:connections={bigideasConnections}
/>

<GetConnectionListsData
  bind:goalId={goal.id}
  type="goal-deeperunderstandings"
  status="published"
  
  bind:mounted
  bind:connections={deeperunderstandingConnections}
/>

<GetConnectionListsData
  bind:goalId={goal.id}
  type="goal-bigideas"
  status="published"
  
  bind:mounted
  bind:connections={deeperunderstandingConnections}
/>

<MainTabs bind:goal mainSelected="connections" />
<SecondTabs bind:goal mainSelected="overview" />

<div class="mt-8 mb-8 flex">
  <a class="underline ml-auto" href="verbinding-maken">
    {$t("create-new-connection")}</a
  >
</div>

<div>
  <h3 class="text-lg leading-6 font-medium text-gray-900">
    {$t("prior-knowledge")}
  </h3>
  <ConnectionList
    urlType="voorkennis"
    bind:goalId={goal.id}
    
    bind:connections={prerequisitesConnections}
  />
</div>

<div class="mt-4 mb-4">
  <h3 class="text-lg leading-6 font-medium text-gray-900">
    {$t("specialization")}
  </h3>
  <ConnectionList
    urlType="specialisatie"
    bind:goalId={goal.id}
    
    bind:connections={specializationConnections}
  />
</div>

<div class="mt-4 mb-4">
  <h3 class="text-lg leading-6 font-medium text-gray-900">{$t("big-ideas")}</h3>

  <ConnectionList
    urlType="groot-idee"
    bind:goalId={goal.id}
    
    bind:connections={bigideasConnections}
  />
</div>

<div class="mt-4 mb-4">
  <h3 class="text-lg leading-6 font-medium text-gray-900">
    {$t("deeper-insight")}
  </h3>

  <ConnectionList
    urlType="dieper-inzicht"
    bind:goalId={goal.id}
    
    bind:connections={deeperunderstandingConnections}
  />
</div>
