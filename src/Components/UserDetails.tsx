import User from "../Types/User";
import PetCardsList from "./PetsList/PetsList";
import "../style/UserDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserApi from "../lib/userApi";
import PageNotFound from "./CommonComponents/PageNotFound";
import Loading from "./CommonComponents/Loading";
import UserData from "./CommonComponents/UserData";

const UserDetails: React.FC = () => {
  const [user, setUser] = useState<User | undefined | null>(undefined);
  const id = Number(useParams().id);
  useEffect(() => {
    async function getUserDetails() {
      const response = await UserApi.getUserById(id);
      if (response.error) {
      }
      if (response.data) {
        setUser(response.data);
      }
    }

    getUserDetails();
  }, [id]);
  return (
    <>
      {user === undefined && <Loading />}
      {user === null && <PageNotFound />}
      {user && (
        <div className="d-flex flex-row">
          <div className="m-3">
            <UserData user={user} />
          </div>

          <div className="user-details-pets">
            <PetCardsList pets={user.pets} isChangeMode={false} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
