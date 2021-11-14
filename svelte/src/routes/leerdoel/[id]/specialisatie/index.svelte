<script>
  import ConnectionListContainer from "$lib/Containers/connectionListContainer.svelte";
  import ConnectionLinkList from "$lib/Connection/connectionLinkList.svelte";
</script>

<ConnectionListContainer
  connectionType="goal-specializations"
  status="published"
  let:urlType
  let:goal
  let:connections
  let:firebase
  let:status
>
  <ConnectionLinkList
    {urlType}
    goalId={goal.id}
    {connections}
    {firebase}
    {status}
  />
</ConnectionListContainer>
