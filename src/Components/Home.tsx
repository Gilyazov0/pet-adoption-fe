import { Pets } from "../PetsDataSet";
import "bootstrap/dist/css/bootstrap.min.css";
import PetCardsList from "./PetCardsList";
import PetProps from "../Types/PetProps";

function Home() {
  const pets = Pets.map((pet, i) => {
    return { ...pet, id: i.toString() };
  }) as PetProps[];

  return (
    <div className="App">
      <PetCardsList pets={pets} />
    </div>
  );
}

export default Home;
