import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { UserContext } from "../App";
import "../style/MyPets.css";
import User from "../Types/User";
import PetCardsList from "./PetsList/PetsList";
import SelectStyled from "./CommonComponents/SelectStyled";

type ViewType = "myPets" | "savedPets";

const MyPets: React.FC = () => {
  const user = useContext(UserContext).user as User;

  const [view, setView] = useState<ViewType>("myPets");

  const pets = view === "myPets" ? user.pets : user.savedPets;

  const options = [
    { value: "myPets", label: "My pets" },
    { value: "savedPets", label: "Saved pets" },
  ];
  return (
    <>
      <div className="d-flex mt-3 ms-3 align-items-center">
        <div className="d-flex flex-row-reverse w-100 m-3">
          <SelectStyled options={options} />

          {/* <Form.Select
            className="view-selector"
            onChange={(e) => setView(e.target.value as ViewType)}
          >
            <option value={"myPets"}>My pets</option>
            <option value={"savedPets"}>Saved pets</option>
          </Form.Select> */}
        </div>
        {/*         
        <span className="me-3 fs-4">my pets</span>


        <Form.Check
          type="switch"
          onClick={() => {
            setView(view === "myPets" ? "savedPets" : "myPets");
          }}
        />
        <span className="me-3 fs-4">saved pets</span> */}
      </div>
      {pets.length > 0 ? (
        <PetCardsList pets={pets} />
      ) : (
        <div className="w-100 text-center mt-5">
          <span className="display-3">Nothing to show yet :(</span>
        </div>
      )}
    </>
  );
};

export default MyPets;
