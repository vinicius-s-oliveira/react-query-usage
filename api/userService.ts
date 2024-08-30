import User from "@/models/User";

import { api } from "./apiConfig";

export const fetchUsers = async () => {
  try {
    const response = await api.get<User[]>("/users");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
