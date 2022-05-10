export async function queryConnections(db, type, sourceId) {
  let ref = db.collection("connections").where("sourceId", "==", sourceId).where("type", "==", type);
  let snapshot = await ref.get();
  let connections = [];
  snapshot.forEach(doc => {
    let connection = doc.data();
    connection.id = doc.id;
    connections.push(connection);
  });
  return connections;
}


export function compareTimeLeftToTrash(a, b) {
  if (a.timeInFutureToTrash < b.timeInFutureToTrash) {
    return -1;
  }
  if (a.timeInFutureToTrash > b.timeInFutureToTrash) {
    return 1;
  }
  return 0;
}

export function compareTimeLeftToApprove(a, b) {
  if (a.timeInFutureToApprove < b.timeInFutureToApprove) {
    return -1;
  }
  if (a.timeInFutureToApprove > b.timeInFutureToApprove) {
    return 1;
  }
  return 0;
}

export function compareTimeLeftToNeedsWork(a, b) {
  if (a.timeInFutureToNeedsWork < b.timeInFutureToNeedsWork) {
    return -1;
  }
  if (a.timeInFutureToNeedsWork > b.timeInFutureToNeedsWork) {
    return 1;
  }
  return 0;
}
