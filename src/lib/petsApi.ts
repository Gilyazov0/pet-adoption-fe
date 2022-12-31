import axios, { AxiosError } from "axios";
import Pet from "../Types/Pet";

const BASE_URL = "http://localhost:8080/pet";

export async function getPetById(id: string) {
  try {
    const res = await axios.get(`${BASE_URL}/id`, { params: { id } });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function search(
  name: string,
  type: string,
  weight: string,
  height: string,
  status: string
) {
  try {
    const params = { name, type, weight, height, status };

    const res = await axios.get(`${BASE_URL}/search`, { params });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function addPet(
  data: Omit<Pet, "id" | "picture" | "adoptionStatus">
) {
  try {
    const response = await axios.post<Pet>(`${BASE_URL}/addPet`, data);
    return { pet: response.data };
  } catch (err) {
    if (err instanceof AxiosError || err instanceof Error)
      return { error: err.message };
    else return { error: "unknown error" };
  }
}

export async function getPetsByIds(ids: string[]) {
  try {
    const params = { ids };

    const res = await axios.get(`${BASE_URL}/ids`, { params });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
