import User from "../Types/User";
import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:8080/user/";

type UserResponseType = Promise<
  | {
      user: User;
      error?: undefined;
    }
  | {
      error: string;
      user?: undefined;
    }
>;

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
): UserResponseType {
  const data = { firstName, lastName, email, phone, password };
  try {
    const response = await axios.post<User>(BASE_URL, data);
    return { user: response.data };
  } catch (err) {
    if (err instanceof AxiosError || err instanceof Error)
      return { error: err.message };
    else return { error: "unknown error" };
  }
}

export async function login(email: string, password: string): UserResponseType {
  try {
    const params = { email, password };
    const response = await axios.get<User>(BASE_URL, { params });
    return { user: response.data };
  } catch (err) {
    if (err instanceof AxiosError || err instanceof Error)
      return { error: err.message };
    else return { error: "unknown error" };
  }
}

export async function updateUser(
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  bio: string,
  password?: string
): UserResponseType {
  try {
    const data = { email, firstName, lastName, phone, bio, password };
    const response = await axios.patch<User>(BASE_URL, data);
    return { user: response.data };
  } catch (err) {
    if (err instanceof AxiosError || err instanceof Error)
      return { error: err.message };
    else return { error: "unknown error" };
  }
}

export async function toggleData(
  userId: string,
  petId: string,
  url: string
): UserResponseType {
  try {
    const data = { userId, petId };
    const response = await axios.post<User>(`${BASE_URL}${url}`, data);
    return { user: response.data };
  } catch (err) {
    if (err instanceof AxiosError || err instanceof Error)
      return { error: err.message };
    else return { error: "unknown error" };
  }
}

export async function toggleSave(
  userId: string,
  petId: string
): UserResponseType {
  return toggleData(userId, petId, "toggleSave");
}

export async function toggleAdopt(
  userId: string,
  petId: string
): UserResponseType {
  return toggleData(userId, petId, "toggleAdopt");
}

export async function toggleFoster(
  userId: string,
  petId: string
): UserResponseType {
  return toggleData(userId, petId, "toggleFoster");
}
