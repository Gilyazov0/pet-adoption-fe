import PetCardsList from "./PetCardsList";
import { getPets } from "../lib/api";
import SearchBar from "./SearchBar";

const Search: React.FC = () => {
  const pets = getPets();
  return (
    <>
      <PetCardsList pets={pets} />;
    </>
  );
};

export default Search;
