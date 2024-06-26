export const authUser = (authorizationHeader) => {
  const data = fetch("/api/v1/auth/me", {
    method: "GET",
    headers: { Authorization: authorizationHeader },
  });
  return data;
};
