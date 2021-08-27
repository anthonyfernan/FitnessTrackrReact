export function storeCurrentUser(user, token) {
  localStorage.setItem("currentUser", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
}

export function getCurrentUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user;
}

export function clearCurrentUser() {
  localStorage.removeItem("currentUser", "token");
}

export function getCurrentToken() {
  const token = JSON.parse(localStorage.getItem("token"));
  return token;
}
