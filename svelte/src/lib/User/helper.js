
export function hasSpecialClaims(user) {
  if (user && user.uid && (
    user.idTokenResult.claims.canDebugDevelopment ||
    user.idTokenResult.claims.canModerate)) {
    return true;
  }
  return false;
}

