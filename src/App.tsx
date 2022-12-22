import PetProfile from "./Components/PetProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import "./style/App.css";
import Search from "./Components/Search";
import { createContext, useState } from "react";
import User from "./Types/User";
import useUserChange from "./Hooks/useUserChange";

export const UserContext = createContext<{
  user: User | null;
  setUser: Function;
}>({
  user: null,
  setUser: () => {},
});

function App() {
  const [user, setUser] = useState<User | null>(null);
  useUserChange();

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/:id" element={<PetProfile />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
