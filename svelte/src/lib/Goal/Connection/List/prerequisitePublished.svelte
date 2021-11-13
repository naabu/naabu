<script>
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/learningGoalConnections.svelte";
  import ThirdTabs from "$lib/Tabs/connectionStatus.svelte";
  
  import PublishedLists from "$lib/Goal/Connection/List/published.svelte";
  export let goal;
  export let firebase;
</script>

<MainTabs bind:goal mainSelected="connections" />
<SecondTabs bind:goal mainSelected="prerequist" />
<ThirdTabs bind:goal mainSelected="published"
urlType="voorkennis"
bind:publishedArray={goal.publishedPrerequisites}
bind:needsApprovalArray={goal.needsApprovalPrerequisites}
bind:inProgressArray={goal.inProgressPrerequisites}
bind:needsWorksArray={goal.needsWorkPrerequisites}
bind:trashCanArray={goal.trashCanPrerequisites}
/>

<div class="mt-8 mb-8 flex">
  <a class="underline ml-auto" href="/leerdoel/{goal.id}/verbinding-maken">
    Nieuwe verbinding maken</a
  >
</div>

<div>
  <PublishedLists
    bind:goal
    bind:firebase
    bind:connectionArray={goal.publishedPrerequisites}
    linkType="voorkennis"
  />
</div>