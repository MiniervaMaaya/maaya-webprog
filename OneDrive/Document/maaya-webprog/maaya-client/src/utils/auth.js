export const getCurrentUser = () => ({
  token: localStorage.getItem("token") || "",
  firstName: localStorage.getItem("firstName") || "",
  type: localStorage.getItem("type") || "",
});

export const isEditor = () => getCurrentUser().type === "editor";

export const clearCurrentUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("firstName");
  localStorage.removeItem("type");
};
