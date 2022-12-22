import User from "../Types/User";

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
): Promise<{ user?: User; error?: string }> {
  if (firstName === "error") return { error: "terrible error happened" };
  return {
    user: {
      email,
      firstName,
      lastName,
      id: "someId",
      phone,
      myPets: [],
      savedPets: [],
      isAdmin: false,
    },
  };
}

export async function login(
  email: string,
  password: string
): Promise<{ user?: User; error?: string }> {
  if (password === "error") return { error: "terrible error happened" };
  return {
    user: {
      email,
      firstName: "Bob",
      lastName: "Bob",
      id: "someId",
      phone: "",
      myPets: ["1", "40"],
      savedPets: ["2"],
      isAdmin: false,
    },
  };
}
