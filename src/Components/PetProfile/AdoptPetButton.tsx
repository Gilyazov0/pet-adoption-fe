import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../App";
import { toggleAdopt } from "../../lib/userApi";
import PetProps from "../../Types/Pet";
import { AdoptStatus } from "../../Types/AdoptStatus";

const AdoptPetButton: React.FC<{ pet: PetProps }> = ({ pet }) => {
  const { user, setUser } = useContext(UserContext);

  const getLabel = () => {
    switch (pet.adoptionStatus) {
      case AdoptStatus.Adopted:
        return pet.adoptedBy === user?.id ? "Return" : "";
      case AdoptStatus.Fostered:
        return pet.fosteredBy === user?.id ? "Adopt" : "";
      case AdoptStatus.Available:
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
            const newUser = await toggleAdopt(user.id, pet.id);
            setUser(newUser);
          }}
        >
          {label}
        </Button>
      )}
    </>
  );
};
export default AdoptPetButton;
