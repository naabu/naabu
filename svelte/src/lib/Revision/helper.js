

function compare(a, b) {
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  if (a.createdAt > b.createdAt) {
    return -1;
  }
  return 0;
}

export function sortOnCreatedAt(list) {
  list.sort(compare);
}

export function getNextAndPreviousRevisions(revisionList, revisionId) {
  sortOnCreatedAt(revisionList);
  let nextRevision = null;
  let previousRevision = null;
  let previousPreviousRevision = null;
  for (let i = 0; i < revisionList.length; i++) {
    if (revisionList[i].id === revisionId) {
      if (i > 0) {
        nextRevision = revisionList[i - 1];
      }
      if (i < revisionList.length - 1) {
        previousRevision = revisionList[i + 1];
      }
      if (i < revisionList.length - 2) {
        previousPreviousRevision = revisionList[i + 2];
      }
    }    
  }

  return {
    nextRevision: nextRevision,
    previousRevision: previousRevision,
    previousPreviousRevision: previousPreviousRevision
  }
}