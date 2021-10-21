const functions = require('firebase-functions');
const helper = require('../helper');

function setArrayAdventure(adventuresArray, adventure, isDeleted = false) {
  if (!adventuresArray) {
    adventuresArray = [];
  }
  let index = adventuresArray.findIndex(a => a.id === adventure.id);
  if (isDeleted) {
    if (index !== -1) {
      adventuresArray.splice(index, 1);
    }
  }
  else {
    if (!adventure.inNeedsWorkAt) {
      adventure.inNeedsWorkAt = adventure.lastUpdatesAt;
    }
    if (!adventure.inProgressAt) {
      adventure.inProgressAt = adventure.lastUpdatesAt;
    }
    if (!adventure.inNeedsForApprovalAt) {
      adventure.inNeedsForApprovalAt = adventure.lastUpdatesAt;
    }
    let changedAdventure = {
      id: adventure.id,
      difficulty: adventure.difficulty,
      type: adventure.type,
      svg: adventure.svg,
      title: adventure.title,
      status: adventure.status,
      createdAt: adventure.createdAt,
      modifiedAt: adventure.modifiedAt,
      lastUpdatesAt: adventure.lastUpdatesAt,
      inNeedsWorkAt: adventure.inNeedsWorkAt,
      inProgressAt: adventure.inProgressAt,
      inNeedsForApprovalAt: adventure.inNeedsForApprovalAt,
    }
    if (index !== -1) {
      adventuresArray[index] = changedAdventure;
    }
    else {
      adventuresArray.push(changedAdventure);
    }
  }
  return adventuresArray;
}


exports.createGoalAdventureLists = functions.firestore.document("goals/{goalId}/adventures/{adventureId}")
  .onWrite(async (change, context) => {
    let isDeleted = false;
    let adventure;
    if (!change.after.exists) {
      isDeleted = true;
      adventure = change.before.data();
      adventure.id = change.before.ref.id;
    }
    else {
      adventure = change.after.data();
      adventure.id = change.after.ref.id;
    }


    const fb = helper.getFirebaseApp();
    let db = fb.firestore();
    let goalRef = db.collection("goals").doc(context.params.goalId);
    let goalSnap = await goalRef.get();
    if (goalSnap.exists) {
      let goal = goalSnap.data();

      if (!goal.publishedAdventures) {
        goal.publishedAdventures = [];
      }
      if (!goal.needsApprovalAdventures) {
        goal.needsApprovalAdventures = [];
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

      let allAdventures = [...goal.publishedAdventures, ...goal.needsApprovalAdventures, ...goal.inProgressAdventures, ...goal.needsWorkAdventures, ...goal.trashCanAdventures];

      // allAdventures Make unique distinct on ID
      // allAdventures.map(a => a.id)
      //   .filter((value, index, self) => self.indexOf(value) === index);
      // allAdventures.filter((value, index, self) => self.map(a => a.id).indexOf(value.id) == index)

      allAdventures = [...new Map(allAdventures.map(item =>
        [item['id'], item])).values()];
      setArrayAdventure(allAdventures, adventure, isDeleted);

      goal.publishedAdventures = [];
      goal.needsApprovalAdventures = [];
      goal.inProgressAdventures = [];
      goal.needsWorkAdventures = [];
      goal.trashCanAdventures = [];
      let idsAdded = [];
      for (let i = 0; i < allAdventures.length; i++) {
        let theAdventure = allAdventures[i];
        if (!idsAdded.includes(theAdventure.id)) {
          idsAdded.push(theAdventure.id);
          switch (theAdventure.status) {
            case 'published':
              goal.publishedAdventures.push(theAdventure);
              break;
            case 'needs-approval':
              goal.needsApprovalAdventures.push(theAdventure);
              break;
            case 'in-progress':
              goal.inProgressAdventures.push(theAdventure);
              break;
            case 'needs-work':
              goal.needsWorkAdventures.push(theAdventure);
              break;
            case 'in-trash':
              goal.trashCanAdventures.push(theAdventure);
              break;
          }
        }
        else {
          console.log('duplicate id detected');
        }
      }

      await goalRef.update({
        publishedAdventures: goal.publishedAdventures,
        needsApprovalAdventures: goal.needsApprovalAdventures,
        inProgressAdventures: goal.inProgressAdventures,
        needsWorkAdventures: goal.needsWorkAdventures,
        trashCanAdventures: goal.trashCanAdventures
      });
    }
    return null;
  });
  