import { t } from "svelte-intl-precompile";

export function getStatusText(status) {
  switch (status) {
    case "published":
      return $t("published");
    case "needs-approval":
      return $t("needs-approval");
    case "in-progress":
      return $t("in-progress");
    case "needs-work":
      return $t("needs-work");
    case "in-trash":
      return $t("in-trash");;
  }
}

export async function queryConnections(db, type, status, sourceId) {
  let ref = db.collection("connections").where("sourceId", "==", sourceId).where("type", "==", type).where("status", "==", status);
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
