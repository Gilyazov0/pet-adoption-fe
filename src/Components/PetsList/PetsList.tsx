import Pet from "../../Types/Pet";
import PetCard from "./PetCard";
import "../../style/PetCardList.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PetContext } from "../../App";

const PetCardsList: React.FC<{ pets: Pet[]; isChangeMode: boolean }> = ({
  pets,
  isChangeMode,
}) => {
  const navigate = useNavigate();
  const { setPet } = useContext(PetContext);
  return (
    <div className="cards-container">
      {pets.map((pet, i) => (
        <PetCard
          pet={pet}
          key={pet.id}
          onClick={
            isChangeMode
              ? () => {
                  setPet(pet);
                  navigate("/addPet");
                }
              : () => {
                  setPet(pet);
                  navigate(`/profile/${pet.id}`);
                }
          }
        />
      ))}
    </div>
  );
};

export default PetCardsList;
