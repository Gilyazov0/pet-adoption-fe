import { useState } from "react";
import PetProfile from "./Components/PetProfile";
import { Pets } from "./PetsDataSet";
import "bootstrap/dist/css/bootstrap.min.css";
import PetCard from "./Components/PetCard";
import PetCardsList from "./Components/PetCardsList";
import PetProps from "./Types/PetProps";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<PetProfile />} />
      </Routes>
    </div>
  );
}

export default App;
