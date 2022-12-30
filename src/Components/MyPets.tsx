import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { UserContext } from "../App";
import "../style/MyPets.css";
import User from "../Types/User";
import PetCardsList from "./PetsList/PetsList";

const MyPets: React.FC = () => {
  const user = useContext(UserContext).user as User;
  const [view, setView] = useState<"myPets" | "savedPets">("myPets");

  const pets = view === "myPets" ? user.pets : user.savedPets;
  return (
    <>
      <div className="d-flex mt-3 ms-3 align-items-center">
        <span className="me-3 fs-4">my pets</span>
        <Form.Check
          type="switch"
          onClick={() => {
            setView(view === "myPets" ? "savedPets" : "myPets");
          }}
        />
        <span className="me-3 fs-4">saved pets</span>
      </div>
      {pets.length > 0 ? (
        <PetCardsList pets={pets} />
      ) : (
        <h3>Nothing to show yet</h3>
      )}
    </>
  );
};

export default MyPets;
