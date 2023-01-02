import PetCardsList from "./PetsList/PetsList";
import PetApi from "../lib/petApi";
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
      const res = await PetApi.search(name, type, weight, height, status);
      if (res.data) setPets(res.data);
    }

    getSearchResults();
  }, [searchParams]);
  return (
    <>
      {pets ? (
        pets.length > 0 ? (
          <PetCardsList pets={pets} />
        ) : (
          <div className="w-100 text-center mt-5">
            <span className="display-3">Nothing have been found :(</span>
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Search;
