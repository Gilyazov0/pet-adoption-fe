import { Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import UserApi from "../../lib/userApi";
import { userSlice } from "../../store/reducers/UserSlice";
import PetProps from "../../Types/Pet";

const FosterPetButton: React.FC<{ pet: PetProps }> = ({ pet }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { setUser } = userSlice.actions;

  const getLabel = () => {
    switch (pet.adoptionStatus) {
      case "Adopted":
        return "";
      case "Fostered":
        return pet.ownerId === user?.id ? "Return" : "";
      case "Available":
        return user ? "Foster" : "";
    }
  };

  const label = getLabel();

  return (
    <>
      {user && label && (
        <Button
          className="m-3 btn-custom"
          onClick={async () => {
            const res = await UserApi.changeFoster(user.id, pet.id!);
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
export default FosterPetButton;
