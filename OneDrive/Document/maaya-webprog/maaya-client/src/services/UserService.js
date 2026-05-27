import axios from "axios";
import constants from "../constants";
import usersSeed from "../assets/users.json?raw";

const API = axios.create({
  baseURL: `${constants.HOST}/users`,
});

const localUsersKey = "smiley_haven_users";

const normalizeUser = (user, index = 0) => ({
  id: user._id || user.id || index + 1,
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  age: String(user.age || ""),
  gender: user.gender || "",
  contactNumber: user.contactNumber || "",
  email: user.email || "",
  role: user.role || user.type || "editor",
  type: user.type || user.role || "editor",
  username: user.username || "",
  password: user.password || "",
  address: user.address || "",
  isActive: typeof user.isActive === "boolean" ? user.isActive : true,
});

const readLocalUsers = () => {
  const stored = localStorage.getItem(localUsersKey);
  const source = stored ? stored : usersSeed;
  return JSON.parse(source).map(normalizeUser);
};

const writeLocalUsers = (users) => {
  localStorage.setItem(localUsersKey, JSON.stringify(users));
};

export const fetchUsers = async () => {
  try {
    const { data } = await API.get("/");
    return (data.users || data || []).map(normalizeUser);
  } catch {
    return readLocalUsers();
  }
};

export const createUser = async (user) => {
  const payload = { ...user, type: user.role || user.type || "editor" };

  try {
    const { data } = await API.post("/", payload);
    return normalizeUser(data);
  } catch {
    const users = readLocalUsers();
    const nextUser = normalizeUser({
      ...payload,
      id: users.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1,
    });
    const nextUsers = [...users, nextUser];
    writeLocalUsers(nextUsers);
    return nextUser;
  }
};

export const updateUser = async (id, user) => {
  const payload = { ...user, type: user.role || user.type || "editor" };

  try {
    const { data } = await API.put(`/${id}`, payload);
    return normalizeUser(data);
  } catch {
    const users = readLocalUsers();
    const nextUsers = users.map((item) =>
      item.id === id ? normalizeUser({ ...item, ...payload, id }) : item
    );
    writeLocalUsers(nextUsers);
    return nextUsers.find((item) => item.id === id);
  }
};

export const deleteUser = async (id) => {
  try {
    return API.delete(`/${id}`);
  } catch {
    const users = readLocalUsers().filter((user) => user.id !== id);
    writeLocalUsers(users);
    return { data: { message: "User deleted locally" } };
  }
};

export const loginUser = async (credentials) => {
  try {
    const { data } = await API.post("/login", credentials);
    return data;
  } catch {
    const users = readLocalUsers();
    const user = users.find(
      (item) => item.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (!user || user.password !== credentials.password) {
      throw new Error("Invalid credentials");
    }

    if (!user.isActive) {
      throw new Error("Your account is inactive. Please contact support.");
    }

    if (user.role === "viewer" || user.type === "viewer") {
      throw new Error("Viewers cannot log in.");
    }

    return {
      message: "Login successful",
      token: "local-demo-token",
      type: user.role || user.type,
      firstName: user.firstName,
    };
  }
};
