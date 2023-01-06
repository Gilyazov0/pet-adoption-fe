import User from "../../Types/User";
import PetCardsList from "../PetsList/PetsList";
import "../../style/UserDetails.css";

const UserDetails: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="d-flex flex-row ">
      <div className="user-details m-3">
        <div className="fs-5">{`First name: ${user.firstName}`}</div>
        <div className="fs-5">{`Last name: ${user.lastName}`}</div>
        <div className="fs-5">{`Email: ${user.email}`}</div>
        <div className="fs-5">{`Phone: ${user.phone}`}</div>
        <div className="fs-5">{user.bio ? `Biography: ${user.bio}` : ""}</div>
      </div>
      <div className="user-details-pets">
        <PetCardsList pets={user.pets} isChangeMode={false} />
      </div>
    </div>
  );
};

export default UserDetails;
