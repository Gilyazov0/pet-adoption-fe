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
import Dashboard from "./Components/Dashboard";

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
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  useUserChange();

  return (
    <div className={`App ${showDashboard ? "margin-left-300" : ""}`}>
      <ErrorBoundary>
        <UserContext.Provider value={{ user, setUser }}>
          <PetContext.Provider value={{ pet, setPet }}>
            <NavBar
              setShowDashboard={setShowDashboard}
              showDashboard={showDashboard}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/search/:mode"
                element={<Search isChangeMode={false} />}
              />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/addPet/:id" element={<AddPet />} />
              <Route path="/myPets" element={<MyPets />} />
              <Route path="/profile/:id" element={<PetProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </PetContext.Provider>
        </UserContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
