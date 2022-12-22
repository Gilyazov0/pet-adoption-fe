import User from "../Types/User";

export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
) {
  if (firstName === "error") return { error: "terrible error happened" };
  return { user: { email, firstName, lastName, id: "someId", phone } };
}
