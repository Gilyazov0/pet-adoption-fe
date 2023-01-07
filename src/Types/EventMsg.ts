import { AdoptStatus } from "./AdoptStatus";
import Pet from "./Pet";
import User from "./User";

export type EventType =
  | "NewUser"
  | "NewPet"
  | "PetUpdate"
  | "Login"
  | "NewPetStatus";

export type EventMsg = {
  id: number;
  type: EventType;
  time: string;
  authorId: number;
  petId: number;
  newStatus: AdoptStatus;
  author: User;
  pet?: Pet;
};
