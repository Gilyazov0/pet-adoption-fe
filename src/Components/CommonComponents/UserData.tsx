import User from "../../Types/User";
import "../../style/UserData.css";
const UserData: React.FC<{ user: User }> = ({ user }) => {
  const { bio, email, firstName, phone, lastName } = user;
  return (
    <div className="user-data">
      <div className="fs-5">{`First name: ${firstName}`}</div>
      <div className="fs-5">{`Last name: ${lastName}`}</div>
      <div className="fs-5">{`Email: ${email}`}</div>
      <div className="fs-5">{`Phone: ${phone ? phone : "-"}`}</div>
      <div className="fs-5">{bio ? `Biography: ${bio}` : ""}</div>
    </div>
  );
};

export default UserData;
