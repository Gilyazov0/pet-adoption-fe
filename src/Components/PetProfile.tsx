import "../style/PetProfile.css";
import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPetById } from "../lib/petsApi";
import { AdoptStatus } from "../Types/AdoptStatus";
import { PetType } from "../Types/PetsTypes";
import { useContext } from "react";
import { UserContext } from "../App";

const PetProfile: React.FC = () => {
  const { id } = useParams();
  const {
    adoptionStatus,
    bio,
    breed,
    color,
    dietary,
    height,
    hypoallergnic,
    name,
    picture,
    type,
    weight,
  } = getPetById(id!);

  const { user } = useContext(UserContext);
  const colorClass =
    adoptionStatus === AdoptStatus.Adopted
      ? "text-success"
      : adoptionStatus === AdoptStatus.Fostered
      ? "text-warning"
      : "text-danger";

  return (
    <div className="pet-profile">
      <img className="profile-img" src="/AppIcon2.jpg" alt="petImg" />
      <Card>
        <Card.Body>
          <Card.Title>{`${name}`}</Card.Title>
          <Card.Text>{`${bio}`}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{`Type: ${PetType[type]}`}</ListGroup.Item>
          <ListGroup.Item>{`Breed: ${breed}`}</ListGroup.Item>
          <ListGroup.Item>{`Color: ${color}`}</ListGroup.Item>
          <ListGroup.Item>{`Height: ${height} cm`}</ListGroup.Item>
          <ListGroup.Item>{`Weight: ${weight} kg`}</ListGroup.Item>
          <ListGroup.Item>{`Hypoallergnic: ${
            hypoallergnic ? "Yes" : "No"
          }`}</ListGroup.Item>
          <ListGroup.Item>{`Dietary: ${dietary}`}</ListGroup.Item>
          <ListGroup.Item>
            {"Adoption status: "}
            <span
              className={`${colorClass}`}
            >{`${AdoptStatus[adoptionStatus]}`}</span>
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link>Save</Card.Link>
          <Card.Link>Adopt</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};
export default PetProfile;
