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

export async function search(
  name: string,
  type: string,
  weight: string,
  height: string,
  status: string
) {
  return pets.filter((x) => {
    if (name && x.name != name) return false;
    if (type && PetType[x.type] != type) return false;
    if (weight && x.weight !== Number(weight)) return false;
    if (height && x.height !== Number(height)) return false;
    if (status && AdoptStatus[x.adoptionStatus] != status) return false;
    return true;
  });
}

export async function getPetsByIds(ids: string[]) {
  return ids.map((id) => getPetById(id));
}

export function getPets() {
  return pets;
}
