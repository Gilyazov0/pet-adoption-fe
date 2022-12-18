import PetProps from "../Types/PetProps";
import "../style/PetProfile.css";
import { Card } from "react-bootstrap";

const PetCard: React.FC<PetProps> = ({ adoptionStatus, name }) => {
  return (
    <div className="d-flex">
      <Card border="primary">
        <Card.Img variant="top" src="./AppIcon.png" />
        <Card.Body>
          <Card.Title>{`${name}: ${adoptionStatus}`}</Card.Title>
        </Card.Body>

        <Card.Body>
          <Card.Link href="#">See more</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PetCard;
