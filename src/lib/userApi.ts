import { AdoptStatus } from "../Types/AdoptStatus";
import User from "../Types/User";
import { getPetById } from "./petsApi";

let USER = {
  email: "example@mail.com",
  firstName: "Bob",
  lastName: "Bob",
  id: "someId",
  phone: "",
  myPets: ["1", "40"],
  savedPets: ["2"],
  isAdmin: false,
};

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
): Promise<{ user?: User; error?: string }> {
  if (firstName === "error") return { error: "terrible error happened" };
  return { user: USER };
}

export async function login(
  email: string,
  password: string
): Promise<{ user?: User; error?: string }> {
  if (password === "error") return { error: "terrible error happened" };
  return {
    user: USER,
  };
}

export async function toggleSave(userId: string, petId: string) {
  const savedPets = USER.savedPets.includes(petId)
    ? USER.savedPets.filter((id) => id !== petId)
    : [...USER.savedPets, petId];
  console.log("lib", USER.savedPets);
  return { ...USER, savedPets };
}
export async function toggleAdopt(userId: string, petId: string) {
  const pet = getPetById(petId);

  if (USER.myPets.includes(petId)) {
    const myPets = USER.myPets.filter((id) => id !== petId);
    USER = { ...USER, myPets };
    pet.adoptedBy = "";
    pet.adoptionStatus = AdoptStatus.Available;
  } else {
    const myPets = [...USER.myPets, petId];
    USER = { ...USER, myPets };
    pet.adoptedBy = USER.id;
    pet.adoptionStatus = AdoptStatus.Adopted;
  }

  return USER;
}

export async function toggleFoster(userId: string, petId: string) {
  //not implemented
  return USER;
}
