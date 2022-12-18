import PetProps from "../Types/PetProps";
import "../style/PetProfile.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PetCard: React.FC<PetProps> = ({ adoptionStatus, name, id }) => {
  console.log(id);
  return (
    <div className="d-flex">
      <Card border="primary">
        <Card.Img variant="top" src="./AppIcon.png" />
        <Card.Body>
          <Card.Title>{`${name}: ${adoptionStatus}`}</Card.Title>
        </Card.Body>

        <Card.Body>
          <Link to={`/profile/${id}`}>See more</Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PetCard;
