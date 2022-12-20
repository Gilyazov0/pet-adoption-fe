import { Pets } from "../PetsDataSet";
import PetProps from "../Types/PetProps";

const pets = Pets.map((pet, i) => {
  return { ...pet, id: i.toString() };
}) as PetProps[];

export function getPetById(id: string): PetProps {
  return pets[Number(id)];
}

export function getPets() {
  return pets;
}
