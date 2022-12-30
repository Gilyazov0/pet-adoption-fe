import Pet from "./Pet";

export default interface User {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  pets: Pet[];
  savedPets: Pet[];
  bio: string;
}
