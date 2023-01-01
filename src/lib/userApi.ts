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

function handleError(err: unknown) {
  if (err instanceof AxiosError)
    return { error: err.response ? err.response.data.message : err.message };
  else return { error: "unknown error" };
}

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
    return handleError(err);
  }
}

export async function login(email: string, password: string): UserResponseType {
  try {
    const data = { email, password };
    const response = await axios.post<{ user: User; token: string }>(
      `${BASE_URL}/login`,
      data
    );

    localStorage.setItem("token", response.data.token);

    return { user: response.data.user };
  } catch (err) {
    return handleError(err);
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
    return handleError(err);
  }
}

export async function toggleData(
  userId: number,
  petId: number,
  url: string
): UserResponseType {
  try {
    const data = { userId, petId };
    const response = await axios.post<User>(`${BASE_URL}${url}`, data);
    return { user: response.data };
  } catch (err) {
    return handleError(err);
  }
}

export async function toggleSave(
  userId: number,
  petId: number
): UserResponseType {
  return toggleData(userId, petId, "toggleSave");
}

export async function toggleAdopt(
  userId: number,
  petId: number
): UserResponseType {
  return toggleData(userId, petId, "toggleAdopt");
}

export async function toggleFoster(
  userId: number,
  petId: number
): UserResponseType {
  return toggleData(userId, petId, "toggleFoster");
}
