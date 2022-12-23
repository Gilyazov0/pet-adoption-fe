import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../App";
import { toggleSave } from "../../lib/userApi";
import PetProps from "../../Types/Pet";

const SavePetButton: React.FC<{ pet: PetProps }> = ({ pet }) => {
  const { user, setUser } = useContext(UserContext);
  const label = user?.savedPets.includes(pet.id) ? "Unsave" : "Save";

  return (
    <>
      {user && (
        <Button
          className="m-3 btn-custom"
          onClick={async () => {
            const res = await toggleSave(user.id, pet.id);
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
export default SavePetButton;
