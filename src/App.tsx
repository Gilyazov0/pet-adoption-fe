import PetProfile from "./Components/PetProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import "./style/App.css";
import Search from "./Components/Search";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile/:id" element={<PetProfile />} />
      </Routes>
    </div>
  );
}

export default App;
