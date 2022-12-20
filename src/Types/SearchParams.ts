import { AdoptStatus } from "./AdoptStatus";
import { PetType } from "./PetsTypes";

export interface SearchParams {
  type?: PetType;
  name?: string;
  adoptionStatus?: AdoptStatus;
  height?: number;
  weight?: number;
}
