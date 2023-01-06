import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const UserRoute: React.FC<{ children: ReactNode; mode: "user" | "admin" }> = ({
  children,
  mode,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user || (mode === "admin" && !user.isAdmin)) navigate("/");
  }, [navigate, user, mode]);
  return <>{children}</>;
};

export default UserRoute;
