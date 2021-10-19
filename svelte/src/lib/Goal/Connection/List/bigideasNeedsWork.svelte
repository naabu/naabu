<script>
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/learningGoalConnections.svelte";
  import ThirdTabs from "$lib/Tabs/connectionStatus.svelte";
  
  import NeedsWorkLists from "$lib/Goal/Connection/List/needsWork.svelte";
  export let goal;
  export let firebase;
</script>

<MainTabs bind:goal mainSelected="connections" />
<SecondTabs bind:goal mainSelected="big-ideas" />
<ThirdTabs bind:goal mainSelected="needs-work"
type="groot-idee"
bind:publishedArray={goal.publishedBigideas}
bind:needsApprovalArray={goal.needsApprovalBigideas}
bind:inProgressArray={goal.inProgressBigideas}
bind:needsWorksArray={goal.needsWorkBigideas}
bind:trashCanArray={goal.trashCanBigideas}
/>

<div class="mt-8 mb-8 flex">
  <a class="underline ml-auto" href="/leerdoel/{goal.id}/verbinding-maken">
    Nieuwe verbinding maken</a
  >
</div>

<div>
  <NeedsWorkLists
    bind:goal
    bind:firebase
    bind:connectionArray={goal.needsWorkBigideas}
    linkType="groot-idee"
  />
</div>