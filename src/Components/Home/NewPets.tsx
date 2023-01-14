import Pet from "../../Types/Pet";
import PetCardsList from "../PetsList/PetsList";
import "../../style/NewPets.css";
import { useAppSelector } from "../../hooks/redux";

const NewPets: React.FC<{ pets: Pet[] }> = ({ pets }) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="new-pets">
      <h1>{`New pets for ${user?.firstName} ${user?.lastName}:`}</h1>
      <PetCardsList pets={pets} isChangeMode={false} />
    </div>
  );
};

export default NewPets;
