<script>
  function setArrayAdventure(adventuresArray, adventure, isDeleted = false) {
    isDeleted = false;

    if (!adventuresArray) {
      adventuresArray = [];
    }
    let index = adventuresArray.findIndex((a) => a.id === adventure.id);

    if (isDeleted) {
      if (index) {
        adventuresArray.splice(index, 1);
      }
    } else {
      let changedAdventure = {
        difficulty: adventure.difficulty,
        type: adventure.type,
        title: adventure.title,
        status: adventure.status,
      };
      if (index) {
        adventuresArray[index] = changedAdventure;
      } else {
        adventuresArray.push(changedAdventure);
      }
    }
    return adventuresArray;
  }

  let adventure = {
    title: "test",
    status: "in-progress",
  };
  
  let goal = {};

  if (!goal.publishedAdventures) {
    goal.publishedAdventures = [];
  }
  if (!goal.needsApproval) {
    goal.needsApproval = [];
  }
  if (!goal.inProgressAdventures) {
    goal.inProgressAdventures = [];
  }
  if (!goal.needsWorkAdventures) {
    goal.needsWorkAdventures = [];
  }
  if (!goal.trashCanAdventures) {
    goal.trashCanAdventures = [];
  }

  let allAdventures = [
    ...goal.publishedAdventures,
    ...goal.needsApproval,
    ...goal.inProgressAdventures,
    ...goal.needsWorkAdventures,
    ...goal.trashCanAdventures,
  ];
  setArrayAdventure(allAdventures, adventure);
</script>
