import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/NavBar.css";
import Auth from "../Auth/Auth";
import SearchBarModal from "./SearchBarModal";
import { UserContext } from "../../App";
import UserApi from "../../lib/userApi";
import Dashboard from "../Dashboard";

const NavBar: React.FC<{
  showDashboard: boolean;
  setShowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showDashboard, setShowDashboard }) => {
  const { user, setUser } = useContext(UserContext);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  useEffect(() => {
    if (!user || !user.isAdmin) setShowDashboard(false);
  }, [setShowDashboard, user]);

  return (
    <div className="nav-bar">
      <Link to={"/"} className={"no-underline"}>
        <div className="label">Pet adoption</div>
      </Link>

      <div className="label" onClick={() => setShowSearch(true)}>
        Search for a friend
      </div>

      {user && (
        <>
          <Link to={"/myPets"} className={"no-underline"}>
            <div className="label">My pets</div>
          </Link>

          <Link to={"/userProfile"} className={"no-underline"}>
            <div className="label">Profile</div>
          </Link>
        </>
      )}

      {user && user.isAdmin && (
        <div
          className="label"
          onClick={() => setShowDashboard((prev) => !prev)}
        >
          Dashboard
        </div>
      )}
      {showDashboard && <Dashboard />}

      <div
        className="label"
        onClick={() => {
          user ? setUser(null) : setShowAuth(true);
          UserApi.logout();
        }}
      >
        {user ? "Logout" : "Login/SignUp"}
      </div>

      <Auth setShowAuth={setShowAuth} showAuth={showAuth} />
      <SearchBarModal showSearch={showSearch} setShowSearch={setShowSearch} />
    </div>
  );
};

export default NavBar;
