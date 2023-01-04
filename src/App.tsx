import PetProfile from "./Components/PetProfile/PetProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar/NavBar";
import "./style/App.css";
import Search from "./Components/SearchResults";
import { createContext, useState } from "react";
import User from "./Types/User";
import useUserChange from "./Hooks/useUserChange";
import MyPets from "./Components/MyPets";
import UserProfile from "./Components/UserProfile";
import AddPet from "./Components/AddPet";
import ErrorBoundary from "./Components/CommonComponents/ErrorBoundary";
import Pet from "./Types/Pet";

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const PetContext = createContext<{
  pet: Pet | null;
  setPet: React.Dispatch<React.SetStateAction<Pet | null>>;
}>({ pet: null, setPet: () => {} });

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [pet, setPet] = useState<Pet | null>(null);
  useUserChange();

  return (
    <div className="App">
      <ErrorBoundary>
        <UserContext.Provider value={{ user, setUser }}>
          <PetContext.Provider value={{ pet, setPet }}>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/addPet" element={<AddPet initData={undefined} />} />
              <Route path="/myPets" element={<MyPets />} />
              <Route path="/profile/:id" element={<PetProfile />} />
            </Routes>
          </PetContext.Provider>
        </UserContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
