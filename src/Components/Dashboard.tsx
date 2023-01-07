import { Link } from "react-router-dom";
import "../style/Dashboard.css";
import Newsfeed from "./Newsfeed/Newsfeed";
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
        <Link to={"/Newsfeed"} className={"no-underline"}>
          <div className="label mt-3">Newsfeed</div>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
