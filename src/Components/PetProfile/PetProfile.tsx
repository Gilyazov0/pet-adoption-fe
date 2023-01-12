import "../../style/PetProfile.css";
import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PetApi from "../../lib/petApi";
import { useEffect } from "react";
import SavePetButton from "./SavePetButton";
import AdoptPetButton from "./AdoptPetButton";
import FosterPetButton from "./FosterPetButton";
import Loading from "../CommonComponents/Loading";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { petSlice } from "../../store/reducers/PetSlice";

const PetProfile: React.FC = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { pet } = useAppSelector((state) => state.pet);
  const dispatch = useAppDispatch();
  const { setPet } = petSlice.actions;

  useEffect(() => {
    async function getProfilePet() {
      const res = await PetApi.getPetById(id!);
      if (res.data) dispatch(setPet(res.data));
    }
    if (!pet || pet.id !== id) getProfilePet();
  }, [dispatch, id, pet, setPet]);

  const colorClass =
    pet?.adoptionStatus === "Adopted"
      ? "text-success"
      : pet?.adoptionStatus === "Fostered"
      ? "text-warning"
      : "text-danger";

  const yourPet = user && pet && pet.ownerId === user.id ? true : false;
  return pet ? (
    <div className="d-flex justify-content-center">
      <div className="pet-profile">
        <img
          className="profile-img"
          src={pet.picture ? pet.picture : "/AppIcon2.jpg"}
          alt="petImg"
        />
        <div className="pet-profile-card">
          <Card>
            <Card.Body>
              <Card.Title>{`${pet.name}`}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{`Type: ${pet.type}`}</ListGroup.Item>
              <ListGroup.Item>{`Breed: ${pet.breed}`}</ListGroup.Item>
              <ListGroup.Item>{`Color: ${pet.color}`}</ListGroup.Item>
              <ListGroup.Item>{`Height: ${pet.height} cm`}</ListGroup.Item>
              <ListGroup.Item>{`Weight: ${pet.weight} kg`}</ListGroup.Item>
              <ListGroup.Item>{`Hypoallergnic: ${
                pet.hypoallergenic ? "Yes" : "No"
              }`}</ListGroup.Item>
              <ListGroup.Item>{`Dietary: ${pet.dietary}`}</ListGroup.Item>
              <ListGroup.Item>{`Biography: ${pet.bio}`}</ListGroup.Item>
              <ListGroup.Item>
                {"Adoption status: "}
                <span className={`${colorClass}`}>{`${pet.adoptionStatus} ${
                  yourPet ? "by you" : ""
                }`}</span>
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <SavePetButton pet={pet} />
              <AdoptPetButton pet={pet} />
              <FosterPetButton pet={pet} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
export default PetProfile;
