<script>
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/learningGoalConnections.svelte";
  import ThirdTabs from "$lib/Tabs/connectionStatus.svelte";
  
  import NeedsApprovalLists from "$lib/Goal/Connection/List/needsApproval.svelte";
  export let goal;
  export let firebase;
</script>

<MainTabs bind:goal mainSelected="connections" />
<SecondTabs bind:goal mainSelected="specialization" />
<ThirdTabs bind:goal mainSelected="needs-approval"
type="specialisatie"
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
  <NeedsApprovalLists
    bind:goal
    bind:firebase
    bind:connectionArray={goal.needsApprovalSpecializations}
    linkType="specialisatie"
  />
</div>