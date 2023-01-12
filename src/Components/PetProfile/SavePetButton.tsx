import { Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import UserApi from "../../lib/userApi";
import { userSlice } from "../../store/reducers/UserSlice";
import PetProps from "../../Types/Pet";

const SavePetButton: React.FC<{ pet: PetProps }> = ({ pet }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  const label =
    user?.savedPets.findIndex((savedPet) => savedPet.id === pet.id) === -1
      ? "Save"
      : "Unsave";

  return (
    <>
      {user && (
        <Button
          className="m-3 btn-custom"
          style={{ width: "5rem" }}
          onClick={async () => {
            const res = await UserApi.changeSave(user.id, pet.id!);
            if (res.data) dispatch(setUser(res.data));
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
