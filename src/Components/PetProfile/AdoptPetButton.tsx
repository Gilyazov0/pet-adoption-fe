import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../App";
import { toggleAdopt } from "../../lib/userApi";
import PetProps from "../../Types/Pet";

const AdoptPetButton: React.FC<{ pet: PetProps }> = ({ pet }) => {
  const { user, setUser } = useContext(UserContext);

  const getLabel = () => {
    switch (pet.adoptionStatus) {
      case "Adopted":
        return pet.owner_id === user?.id ? "Return" : "";
      case "Fostered":
        return pet.owner_id === user?.id ? "Adopt" : "";
      case "Available":
        return "Adopt";
    }
  };

  const label = getLabel();

  return (
    <>
      {user && label && (
        <Button
          className="m-3 btn-custom"
          onClick={async () => {
            const res = await toggleAdopt(user.id, pet.id);
            if (res.user) setUser(res.user);
            else console.log(res.error);
          }}
        >
          {label}
        </Button>
      )}
    </>
  );
};
export default AdoptPetButton;
