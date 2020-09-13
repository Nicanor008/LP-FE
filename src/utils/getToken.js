export function getToken() {
  const headers = {
    headers: {
      Authorization:
        typeof window !== "undefined" && localStorage.getItem("token"),
    },
  };
  return { headers };
}
