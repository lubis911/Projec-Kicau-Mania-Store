export const loginUser = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const logoutUser = () => {
  localStorage.clear();
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  if (!user || user === "undefined") {
    return {};
  }

  return JSON.parse(user);
};

export const isLogin = () => {
  return localStorage.getItem("token");
};

export const getRole = () => {
  return localStorage.getItem("role") || "";
};
