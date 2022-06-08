<script>
  import ConnectionListContainer from "$lib/Internals/Containers/connectionListContainer.svelte";
  import GoalAssessmentList from "$lib/Goal/Connection/Data/goalAssessmentList.svelte";
</script>

<ConnectionListContainer
  connectionType="goal-assessment"
  let:urlType
  let:goal
  let:connections
  let:firebase
  let:status
>
  <GoalAssessmentList
    {urlType}
    goalId={goal.id}
    {connections}
    {firebase}
    {status}
  />
</ConnectionListContainer>
