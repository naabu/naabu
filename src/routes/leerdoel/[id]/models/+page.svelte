<script>
  import ConnectionListContainer from "$lib/Internals/Containers/connectionListContainer.svelte";
  import GoalModelList from "$lib/Goal/Connection/Data/GoalModelList.svelte";
</script>

<ConnectionListContainer
  connectionType="goal-model"
  let:urlType
  let:goal
  let:connections
  let:firebase
  let:status
>
  <GoalModelList
    {urlType}
    goalId={goal.id}
    {connections}
    {firebase}
    {status}
  />
</ConnectionListContainer>
