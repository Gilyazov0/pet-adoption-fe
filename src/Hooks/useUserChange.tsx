import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
const useUserChange = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [user]);
};

export default useUserChange;
