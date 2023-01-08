import Pet from "../../Types/Pet";
import { useContext } from "react";
import { UserContext } from "../../App";
import PetCardsList from "../PetsList/PetsList";
import "../../style/NewPets.css";

const NewPets: React.FC<{ pets: Pet[] }> = ({ pets }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="new-pets">
      <h1>{`New pets for ${user?.firstName} ${user?.lastName}:`}</h1>
      <PetCardsList pets={pets} isChangeMode={false} />
    </div>
  );
};

export default NewPets;
