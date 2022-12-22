import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Home.css";
import { useContext } from "react";
import { UserContext } from "../App";
function Home() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <div className="home">
        <div className="title">
          {user
            ? `Welcome back, ${user.firstName} ${user.lastName}`
            : "Standing up for animals since... just about to start"}
        </div>

        <img className="home-img" src="./home3.png" alt="" />
      </div>
    </div>
  );
}

export default Home;
