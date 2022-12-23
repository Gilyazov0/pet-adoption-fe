import PetCardsList from "./PetsList/PetsList";
import { search } from "../lib/petsApi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pet from "../Types/Pet";
import Loading from "./CommonComponents/Loading";

const Search: React.FC = () => {
  const [pets, setPets] = useState<Pet[] | undefined>(undefined);
  let [searchParams] = useSearchParams();

  const { name, type, weight, height, status } = Object.fromEntries([
    ...searchParams,
  ]);

  useEffect(() => {
    async function getSearchResults() {
      const newPets = await search(name, type, weight, height, status);
      setPets(newPets);
    }

    getSearchResults();
  }, [searchParams]);
  return <>{pets ? <PetCardsList pets={pets} /> : <Loading />}</>;
};

export default Search;
