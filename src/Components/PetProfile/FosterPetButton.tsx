import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../App";
import { toggleFoster } from "../../lib/userApi";
import PetProps from "../../Types/Pet";
import { AdoptStatus } from "../../Types/AdoptStatus";

const FosterPetButton: React.FC<{ pet: PetProps }> = ({ pet }) => {
  const { user, setUser } = useContext(UserContext);

  const getLabel = () => {
    switch (pet.adoptionStatus) {
      case AdoptStatus.Adopted:
        return "";
      case AdoptStatus.Fostered:
        return pet.fosteredBy === user?.id ? "Return" : "";
      case AdoptStatus.Available:
        return "Foster";
    }
  };

  const label = getLabel();

  return (
    <>
      {user && label && (
        <Button
          className="m-3 btn-custom"
          onClick={async () => {
            const newUser = await toggleFoster(user.id, pet.id);
            setUser(newUser);
          }}
        >
          {label}
        </Button>
      )}
    </>
  );
};
export default FosterPetButton;
