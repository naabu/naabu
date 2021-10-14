<script>
  import MainTabs from "$lib/Tabs/goal.svelte";
  import SecondTabs from "$lib/Tabs/learningGoalConnections.svelte";
  import ThirdTabs from "$lib/Tabs/connectionStatus.svelte";
  import InTrashLists from "$lib/Goal/Connection/List/inTrash.svelte";
  export let goal;
  export let firebase;
</script>

<MainTabs bind:goal mainSelected="connections" />
<SecondTabs bind:goal mainSelected="prerequist" />
<ThirdTabs bind:goal mainSelected="in-trash"
type="voorkennis"
bind:publishedArray={goal.publishedPrerequisites}
bind:needsApprovalArray={goal.needsApprovalPrerequisites}
bind:inProgressArray={goal.inProgressPrerequisites}
bind:needsWorksArray={goal.needsWorkPrerequisites}
bind:trashCanArray={goal.trashCanPrerequisites}
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
    bind:connectionArray={goal.trashCanPrerequisites}
    linkType="voorkennis"
  />
</div>