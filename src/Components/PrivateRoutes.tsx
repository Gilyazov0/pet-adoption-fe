import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";

const UserRoute: React.FC<{ mode: "user" | "admin" }> = ({ mode }) => {
  const { user } = useContext(UserContext);

  return (mode === "user" && user) || (user && user.isAdmin) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default UserRoute;
