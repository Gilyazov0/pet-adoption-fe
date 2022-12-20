import { Pets } from "../PetsDataSet";
import PetProps from "../Types/PetProps";
import { PetType } from "../Types/PetsTypes";
import { AdoptStatus } from "../Types/AdoptStatus";

const pets = Pets.map((pet, i) => {
  const type =
    pet.type === "Dog"
      ? PetType.Dog
      : pet.type === "Cat"
      ? PetType.Cat
      : PetType.Other;

  const status =
    pet.adoptionStatus === "Adopted"
      ? AdoptStatus.Adopted
      : pet.adoptionStatus === "Fostered"
      ? AdoptStatus.Fostered
      : AdoptStatus.Available;

  return { ...pet, id: i.toString(), type, adoptionStatus: status };
}) as PetProps[];

export function getPetById(id: string): PetProps {
  return pets[Number(id)];
}

export function getPets() {
  return pets;
}
