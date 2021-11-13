<script>
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/learningGoalConnections.svelte";
  import ThirdTabs from "$lib/Tabs/connectionStatus.svelte";
  
  import InProgressLists from "$lib/Goal/Connection/List/inProgress.svelte";
  export let goal;
  export let firebase;
</script>

<MainTabs bind:goal mainSelected="connections" />
<SecondTabs bind:goal mainSelected="specialization" />
<ThirdTabs bind:goal mainSelected="in-progress"
urlType="specialisatie"
bind:publishedArray={goal.publishedSpecializations}
bind:needsApprovalArray={goal.needsApprovalSpecializations}
bind:inProgressArray={goal.inProgressSpecializations}
bind:needsWorksArray={goal.needsWorkSpecializations}
bind:trashCanArray={goal.trashCanSpecializations}
/>

<div class="mt-8 mb-8 flex">
  <a class="underline ml-auto" href="/leerdoel/{goal.id}/verbinding-maken">
    Nieuwe verbinding maken</a
  >
</div>

<div>
  <InProgressLists
    bind:goal
    bind:firebase
    bind:connectionArray={goal.inProgressSpecializations}
    linkType="specialisatie"
  />
</div>