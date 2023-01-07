import User from "../Types/User";
import PetCardsList from "./PetsList/PetsList";
import "../style/UserDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserApi from "../lib/userApi";
import PageNotFound from "./CommonComponents/PageNotFound";
import Loading from "./CommonComponents/Loading";

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
        <div className="d-flex flex-row ">
          <div className="user-details m-3">
            <div className="fs-5">{`First name: ${user.firstName}`}</div>
            <div className="fs-5">{`Last name: ${user.lastName}`}</div>
            <div className="fs-5">{`Email: ${user.email}`}</div>
            <div className="fs-5">{`Phone: ${user.phone}`}</div>
            <div className="fs-5">
              {user.bio ? `Biography: ${user.bio}` : ""}
            </div>
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
