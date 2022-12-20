import { Pets } from "../PetsDataSet";
import "bootstrap/dist/css/bootstrap.min.css";
import PetCardsList from "./PetCardsList";
import PetProps from "../Types/PetProps";
import "../style/Home.css";
function Home() {
  return (
    <div className="App">
      <div className="home">
        <div className="title">
          Standing up for animals since... just about to start
        </div>
        <img className="home-img" src="./home3.png" alt="" />
      </div>
    </div>
  );
}

export default Home;
