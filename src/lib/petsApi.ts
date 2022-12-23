import axios from "axios";

const BASE_URL = "http://localhost:8080/pet";

export async function getPetById(id: string) {
  const pets = await getPetsByIds([id]);
  return pets[0];
}

export async function search(
  name: string,
  type: string,
  weight: string,
  height: string,
  status: string
) {
  try {
    const params = { name, type, weight, height, status };

    const res = await axios.get(`${BASE_URL}/search`, { params });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPetsByIds(ids: string[]) {
  try {
    const params = { ids };

    const res = await axios.get(`${BASE_URL}/ids`, { params });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// const pets = Pets.map((pet, i) => {
//   const type =
//     pet.type === "Dog"
//       ? PetType.Dog
//       : pet.type === "Cat"
//       ? PetType.Cat
//       : PetType.Other;

//   const status =
//     pet.adoptionStatus === "Adopted"
//       ? AdoptStatus.Adopted
//       : pet.adoptionStatus === "Fostered"
//       ? AdoptStatus.Fostered
//       : AdoptStatus.Available;

//   return { ...pet, id: i.toString(), type, adoptionStatus: status };
// }) as Pet[];

// export function getPetById(id: string): Pet {
//   return pets[Number(id)];
// }

// export async function search(
//   name: string,
//   type: string,
//   weight: string,
//   height: string,
//   status: string
// ) {
//   return pets.filter((x) => {
//     if (name && x.name != name) return false;
//     if (type && PetType[x.type] != type) return false;
//     if (weight && x.weight !== Number(weight)) return false;
//     if (height && x.height !== Number(height)) return false;
//     if (status && AdoptStatus[x.adoptionStatus] != status) return false;
//     return true;
//   });
// }

// export async function getPetsByIds(ids: string[]) {
//   return ids.map((id) => getPetById(id));
// }

// export function getPets() {
//   return pets;
// }
