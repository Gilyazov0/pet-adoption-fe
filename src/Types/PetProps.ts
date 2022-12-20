import { AdoptStatus } from "./AdoptStatus";
import { PetType } from "./PetsTypes";

export default interface PetProps {
  type: PetType;
  name: string;
  adoptionStatus: AdoptStatus;
  picture: "";
  height: number;
  weight: number;
  color: string;
  bio: string;
  hypoallergnic: boolean;
  dietary: string[];
  breed: string;
  id: string;
}
