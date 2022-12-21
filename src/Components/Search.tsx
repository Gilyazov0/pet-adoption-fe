import PetCardsList from "./PetCardsList";
import { search } from "../lib/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PetProps from "../Types/PetProps";
import Loading from "./Loading";

const Search: React.FC = () => {
  const [pets, setPets] = useState<PetProps[] | undefined>(undefined);
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
  return <>{pets ? <PetCardsList pets={pets} /> : <Loading />};</>;
};

export default Search;
