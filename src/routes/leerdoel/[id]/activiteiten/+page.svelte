<script>
  import ConnectionListContainer from "$lib/Internals/Containers/connectionListContainer.svelte";
  import GoalActivityList from "$lib/Goal/Connection/Data/goalActivityList.svelte";
</script>

<ConnectionListContainer
  connectionType="goal-activity"
  let:urlType
  let:goal
  let:connections
  let:firebase
  let:status
>
  <GoalActivityList
    {urlType}
    goalId={goal.id}
    {connections}
    {firebase}
    {status}
  />
</ConnectionListContainer>
