import Pet from "../../Types/Pet";
import PetCard from "./PetCard";
import "../../style/PetCardList.css";
import { useNavigate } from "react-router-dom";
import { petSlice } from "../../store/reducers/PetSlice";
import { useAppDispatch } from "../../hooks/redux";

const PetCardsList: React.FC<{ pets: Pet[]; isChangeMode: boolean }> = ({
  pets,
  isChangeMode,
}) => {
  const navigate = useNavigate();
  const { setPet } = petSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <div className="cards-container">
      {pets.map((pet, i) => (
        <PetCard
          pet={pet}
          key={pet.id}
          onClick={
            isChangeMode
              ? () => {
                  dispatch(setPet(pet));
                  navigate(`/addPet/${pet.id}`);
                }
              : () => {
                  dispatch(setPet(pet));
                  navigate(`/profile/${pet.id}`);
                }
          }
        />
      ))}
    </div>
  );
};

export default PetCardsList;
