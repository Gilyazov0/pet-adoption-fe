export type PestTypes = "Dog" | "Cat" | "Other";

export type AdoptionStatus = "Adopted" | "Available" | "Fostered";

export default interface PetProps {
  type: PestTypes;
  name: string;
  adoptionStatus: AdoptionStatus;
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
