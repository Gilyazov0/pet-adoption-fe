import PetProps from "../Types/PetProps";
import PetCard from "./PetCard";
import "../style/PetCardList.css";

const PetCardsList: React.FC<{ pets: PetProps[] }> = ({ pets }) => {
  return (
    <div className="cards-container">
      {pets.map((pet, i) => (
        <PetCard {...pet} key={pet.id} />
      ))}
    </div>
  );
};

export default PetCardsList;
