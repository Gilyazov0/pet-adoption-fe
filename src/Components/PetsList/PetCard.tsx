import Pet from "../../Types/Pet";
import "../../style/PetProfile.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PetCard: React.FC<{ pet: Pet; onClick: Function }> = ({
  pet,
  onClick,
}) => {
  const { adoptionStatus, name, id, picture } = { ...pet };
  const colorClass =
    adoptionStatus === "Adopted"
      ? "text-success"
      : adoptionStatus === "Fostered"
      ? "text-warning"
      : "text-danger";
  return (
    <div className="d-flex pointer" onClick={() => onClick()}>
      <Card>
        <Card.Img
          variant="top"
          className="card-img"
          src={picture ? picture : "/AppIcon2.jpg"}
        />
        <Card.Body>
          <Card.Title>
            {`${name}: `}
            <span className={`${colorClass}`}>{`${adoptionStatus}`}</span>
          </Card.Title>
        </Card.Body>

        <Card.Body>
          <Link to={`/profile/${id}`}>See more</Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PetCard;
