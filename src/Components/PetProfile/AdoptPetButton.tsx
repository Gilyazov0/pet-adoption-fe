import { Button } from "react-bootstrap";
import UserApi from "../../lib/userApi";
import PetProps from "../../Types/Pet";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";

const AdoptPetButton: React.FC<{ pet: PetProps }> = ({ pet }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

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
            const res = await UserApi.changeAdopt(user.id, pet.id!);
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
export default AdoptPetButton;
