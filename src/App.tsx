import PetProfile from "./Components/PetProfile/PetProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import "./style/App.css";
import Search from "./Components/SearchResults";
import { useState } from "react";
import MyPets from "./Components/MyPets";
import UserProfile from "./Components/UserProfile";
import AddPet from "./Components/AddPet";
import UserList from "./Components/UserList/UserList";
import Newsfeed from "./Components/Newsfeed/Newsfeed";
import UserDetails from "./Components/UserDetails";
import PrivateRoutes from "./Components/PrivateRoutes";
import ChatList from "./Components/ChatsList/ChatsList";

function App() {
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  return (
    <div className={`App ${showDashboard ? "margin-dashboard" : ""}`}>
      <NavBar
        setShowDashboard={setShowDashboard}
        showDashboard={showDashboard}
      />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/search/:mode" element={<Search />} />
        <Route path="/profile/:id" element={<PetProfile />} />

        <Route element={<PrivateRoutes mode="user" />}>
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/myPets" element={<MyPets />} />
        </Route>

        <Route element={<PrivateRoutes mode="admin" />}>
          <Route path="/addPet/:id" element={<AddPet />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/newsfeed" element={<Newsfeed />} />
          <Route path="/chatsList" element={<ChatList />} />
          <Route path="/userDetails/:id" element={<UserDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
