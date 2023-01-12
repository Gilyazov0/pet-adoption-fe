import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/NavBar.css";
import Auth from "./Auth/Auth";
import SearchBarModal from "./SearchBarModal";
import Dashboard from "../Dashboard";
import Chat from "../Chat/Chat";
import chatImgUrl from "../../assets/chat.svg";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";
import { petSlice } from "../../store/reducers/PetSlice";

const NavBar: React.FC<{
  showDashboard: boolean;
  setShowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showDashboard, setShowDashboard }) => {
  const { user } = useAppSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const { setNewPets, setNewAvailablePets } = petSlice.actions;

  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;
  const navigate = useNavigate();

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

          <div className="nav-chat">
            {showChat && <Chat chatId={user.id} />}
            <div>
              <img
                className={`${showChat ? "" : "active"}`}
                src={chatImgUrl}
                alt="chat"
                onClick={(e) => {
                  setShowChat((prev) => !prev);
                }}
              />
            </div>
          </div>
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
        className="label me-3"
        onClick={() => {
          if (user) {
            dispatch(setNewAvailablePets([]));
            dispatch(setNewPets([]));
            dispatch(setUser(null));
            navigate("/");
          } else setShowAuth(true);
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
