import { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../style/NavBar.css";
import Auth from "../Auth/Auth";
import SearchBarModal from "./SearchBarModal";
import { UserContext } from "../../App";

const NavBar: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      <Link to={"/"} className={"no-underline"}>
        <div className="label">Pet adoption</div>
      </Link>

      <div className="label" onClick={() => setShowSearch(true)}>
        Search for a friend
      </div>

      {user && (
        <Button className="m-3 btn-custom " onClick={() => navigate("/myPets")}>
          My pets
        </Button>
      )}
      {user ? (
        <Button className="m-3 btn-custom " onClick={() => setUser(null)}>
          Logout
        </Button>
      ) : (
        <Button className="m-3 btn-custom " onClick={() => setShowAuth(true)}>
          Login/SignUp
        </Button>
      )}

      <Auth setShowAuth={setShowAuth} showAuth={showAuth} />
      <SearchBarModal showSearch={showSearch} setShowSearch={setShowSearch} />
    </div>
  );
};

export default NavBar;
