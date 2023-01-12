import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

const UserRoute: React.FC<{ mode: "user" | "admin" }> = ({ mode }) => {
  const { user } = useAppSelector((state) => state.user);

  return (mode === "user" && user) || (user && user.isAdmin) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default UserRoute;
