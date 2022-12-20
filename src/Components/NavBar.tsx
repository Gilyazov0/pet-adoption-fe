import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../style/NavBar.css";
import Auth from "./Auth";

const NavBar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <Link to={"/"} className={"no-underline"}>
        <div className="label">Pet adoption</div>
      </Link>

      <Link to={"/Search"} className={"no-underline"}>
        <div className="label">Search for a friend</div>
      </Link>
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
