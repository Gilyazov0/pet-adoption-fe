import { useState } from "react";
import PetProfile from "./Components/PetProfile";
import { Pets } from "./PetsDataSet";
import "bootstrap/dist/css/bootstrap.min.css";
import PetCard from "./Components/PetCard";
import PetCardsList from "./Components/PetCardsList";
import PetProps from "./Types/PetProps";

function App() {
  const pets = Pets.map((pet, i) => {
    return { ...pet, id: i.toString() };
  }) as PetProps[];

  return (
    <div className="App">
      <PetCardsList pets={pets} />
    </div>
  );
}

export default App;
