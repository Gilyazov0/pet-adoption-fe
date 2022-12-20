import "../style/PetProfile.css";
import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPetById } from "../lib/api";

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

  const colorClass =
    adoptionStatus === "Adopted"
      ? "text-success"
      : adoptionStatus === "Fostered"
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
          <ListGroup.Item>{`Type: ${type}`}</ListGroup.Item>
          <ListGroup.Item>{`Breed: ${breed}`}</ListGroup.Item>
          <ListGroup.Item>{`Color: ${color}`}</ListGroup.Item>
          <ListGroup.Item>{`Height: ${height} cm`}</ListGroup.Item>
          <ListGroup.Item>{`Weight: ${weight} kg`}</ListGroup.Item>
          <ListGroup.Item>{`Hypoallergnic: ${hypoallergnic}`}</ListGroup.Item>
          <ListGroup.Item>{`Dietary: ${dietary}`}</ListGroup.Item>
          <ListGroup.Item>
            {"Adoption status: "}
            <span className={`${colorClass}`}>{`${adoptionStatus}`}</span>
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Save</Card.Link>
          <Card.Link href="#">Adopt</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PetProfile;
