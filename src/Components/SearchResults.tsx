import PetCardsList from "./PetsList/PetsList";
import PetApi from "../lib/petApi";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Pet from "../Types/Pet";
import Loading from "./CommonComponents/Loading";
import SearchBar from "./NavBar/SearchBar";
import "../style/SearchResults.css";

const Search: React.FC = () => {
  const [pets, setPets] = useState<Pet[] | undefined>(undefined);
  let [searchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);

  const { mode } = useParams();

  useEffect(() => {
    async function getSearchResults() {
      const res = await PetApi.search(params);
      if (res.data) setPets(res.data);
    }

    getSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <div className="d-flex">
      <div className="left-pane">
        <SearchBar setShowSearch={() => {}} />
      </div>
      <div className="search-results">
        {pets ? (
          pets.length > 0 ? (
            <PetCardsList pets={pets} isChangeMode={mode === "edit"} />
          ) : (
            <div className="w-100 text-center mt-5">
              <span className="display-3">Nothing have been found :(</span>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Search;
