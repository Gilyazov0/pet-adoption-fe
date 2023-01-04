import { AdoptStatus } from "./AdoptStatus";
import { PetType } from "./PetsTypes";

export type Pet = {
  type: PetType;
  name: string;
  adoptionStatus: AdoptStatus;
  picture: "";
  height: number;
  weight: number;
  color: string;
  bio: string;
  hypoallergenic: boolean;
  dietary: string;
  breed: string;
  id: number;
  ownerId?: number;
};

export default Pet;
