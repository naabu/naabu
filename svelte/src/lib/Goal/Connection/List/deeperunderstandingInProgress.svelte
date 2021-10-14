<script>
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/learningGoalConnections.svelte";
  import ThirdTabs from "$lib/Tabs/connectionStatus.svelte";

  import InProgressLists from "$lib/Goal/Connection/List/inProgress.svelte";
  export let goal;
  export let firebase;
</script>

<MainTabs bind:goal mainSelected="connections" />
<SecondTabs bind:goal mainSelected="deeper-understandings" />
<ThirdTabs
  bind:goal
  mainSelected="in-progress"
  type="dieper-inzicht"
  bind:publishedArray={goal.publishedDeeperunderstandings}
  bind:needsApprovalArray={goal.needsApprovalDeeperunderstandings}
  bind:inProgressArray={goal.inProgressDeeperunderstandings}
  bind:needsWorksArray={goal.needsWorkDeeperunderstandings}
  bind:trashCanArray={goal.trashCanDeeperunderstandings}
/>

<div class="mt-8 mb-8 flex">
  <a class="underline ml-auto" href="verbinding-maken">
    Nieuwe verbinding maken</a
  >
</div>

<div>
  <InProgressLists
    bind:goal
    bind:firebase
    bind:connectionArray={goal.inProgressDeeperunderstandings}
    linkType="dieper-inzicht"
  />
</div>
