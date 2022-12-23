import { useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { UserContext } from "../App";
import { getPetsByIds } from "../lib/petsApi";
import Pet from "../Types/Pet";
import "../style/MyPets.css";
import User from "../Types/User";
import PetCardsList from "./PetsList/PetsList";
const MyPets: React.FC = () => {
  const user = useContext(UserContext).user as User;
  const [view, setView] = useState<"myPets" | "savedPets">("myPets");
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    async function getPets() {
      const ids = view === "myPets" ? user.myPets : user.savedPets;
      const newPets = await getPetsByIds(ids);
      setPets(newPets);
    }
    getPets();
  }, [user, view]);

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
