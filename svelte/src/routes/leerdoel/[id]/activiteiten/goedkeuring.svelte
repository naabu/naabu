<script>
  import ConnectionListContainer from "$lib/Containers/connectionListContainer.svelte";
  import GoalActivityList from "$lib/Connection/goalActivityList.svelte";
</script>

<ConnectionListContainer
  connectionType="goal-activity"
  status="needs-approval"
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
