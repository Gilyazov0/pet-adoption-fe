import PetProfile from "./Components/PetProfile/PetProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import "./style/App.css";
import Search from "./Components/SearchResults";
import { createContext, useState } from "react";
import User from "./Types/User";
import MyPets from "./Components/MyPets";
import UserProfile from "./Components/UserProfile";
import AddPet from "./Components/AddPet";
import Pet from "./Types/Pet";
import UserList from "./Components/UserList/UserList";
import PrivateRoute from "./Components/PrivateRoute";
import Newsfeed from "./Components/Newsfeed/Newsfeed";
import UserDetails from "./Components/UserDetails";

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

  return (
    <div className={`App ${showDashboard ? "margin-dashboard" : ""}`}>
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
            <Route path="/profile/:id" element={<PetProfile />} />

            <Route
              path="/userProfile"
              element={
                <PrivateRoute mode="user">
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/myPets"
              element={
                <PrivateRoute mode="user">
                  <MyPets />
                </PrivateRoute>
              }
            />

            <Route
              path="/addPet/:id"
              element={
                <PrivateRoute mode="admin">
                  <AddPet />
                </PrivateRoute>
              }
            />
            <Route
              path="/userList"
              element={
                <PrivateRoute mode="admin">
                  <UserList />
                </PrivateRoute>
              }
            />
            <Route
              path="/newsfeed"
              element={
                <PrivateRoute mode="admin">
                  <Newsfeed />
                </PrivateRoute>
              }
            />
            <Route
              path="/userDetails/:id"
              element={
                <PrivateRoute mode="admin">
                  <UserDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </PetContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
