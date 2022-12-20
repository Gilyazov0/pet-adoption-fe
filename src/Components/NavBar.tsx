import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style/NavBar.css";
import Auth from "./Auth";

const NavBar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <div className="label">Pet adoption</div>

      <Button className="m-3 btn-custom" onClick={() => navigate("Search")}>
        Search for a friend
      </Button>
      <Button
        className="m-3 btn-custom "
        onClick={() => setShow((prev) => !prev)}
      >
        Login/SignUp
      </Button>
      <Auth setShow={setShow} show={show} />
    </div>
  );
};

export default NavBar;
