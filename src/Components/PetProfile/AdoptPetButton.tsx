import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../App";
import UserApi from "../../lib/userApi";
import PetProps from "../../Types/Pet";

const AdoptPetButton: React.FC<{ pet: PetProps }> = ({ pet }) => {
  const { user, setUser } = useContext(UserContext);

  const getLabel = () => {
    switch (pet.adoptionStatus) {
      case "Adopted":
        return pet.ownerId === user?.id ? "Return" : "";
      case "Fostered":
        return pet.ownerId === user?.id ? "Adopt" : "";
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
            const res = await UserApi.changeAdopt(user.id, pet.id);
            if (res.data) setUser(res.data);
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
