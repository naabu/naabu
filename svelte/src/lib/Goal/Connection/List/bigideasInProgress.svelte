<script>
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/learningGoalConnections.svelte";
  import ThirdTabs from "$lib/Tabs/connectionStatus.svelte";
  
  import InProgressLists from "$lib/Goal/Connection/List/inProgress.svelte";
  export let goal;
  export let firebase;
</script>

<MainTabs bind:goal mainSelected="connections" />
<SecondTabs bind:goal mainSelected="big-ideas" />
<ThirdTabs bind:goal mainSelected="in-progress"
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
  <InProgressLists
    bind:goal
    bind:firebase
    bind:connectionArray={goal.inProgressBigideas}
    linkType="groot-idee"
  />
</div>