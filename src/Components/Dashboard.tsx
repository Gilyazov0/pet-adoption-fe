import { Link } from "react-router-dom";
import "../style/Dashboard.css";
const Dashboard: React.FC = () => {
  return (
    <>
      <div className="dashboard">
        <Link to={"/addPet/new"} className={"no-underline"}>
          <div className="label mt-3">Add pet</div>
        </Link>

        <Link to={"/search/edit"} className={"no-underline"}>
          <div className="label mt-3">Edit pet</div>
        </Link>

        <Link to={"/userList"} className={"no-underline"}>
          <div className="label mt-3">User list</div>
        </Link>
        <Link to={"/newsfeed"} className={"no-underline"}>
          <div className="label mt-3">Newsfeed</div>
        </Link>
        <Link to={"/chatsList"} className={"no-underline"}>
          <div className="label mt-3">Chats list</div>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
