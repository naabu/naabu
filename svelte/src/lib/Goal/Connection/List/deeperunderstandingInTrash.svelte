<script>
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/learningGoalConnections.svelte";
  import ThirdTabs from "$lib/Tabs/connectionStatus.svelte";
  import InTrashLists from "$lib/Goal/Connection/List/inTrash.svelte";
  export let goal;
  export let firebase;
</script>

<MainTabs bind:goal mainSelected="connections" />
<SecondTabs bind:goal mainSelected="deeper-understandings" />
<ThirdTabs
  bind:goal
  mainSelected="in-trash"
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
  <InTrashLists
    bind:goal
    bind:firebase
    bind:connectionArray={goal.trashCanDeeperunderstandings}
    linkType="dieper-inzicht"
  />
</div>
