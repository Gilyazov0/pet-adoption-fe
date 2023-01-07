import { useNavigate } from "react-router-dom";
import { EventMsg, EventType } from "../../Types/EventMsg";

function getLabel(eventType: EventType) {
  switch (eventType) {
    case "NewPet":
      return "new pet created";
    case "NewPetStatus":
      return "pet status changed";
    case "NewUser":
      return "new user created";
    case "PetUpdate":
      return "pet data updated";
  }
}

const NewsfeedItem: React.FC<{ event: EventMsg; row: number }> = ({
  event,
  row,
}) => {
  const { author, newStatus, pet, time, type, id } = event;
  const navigate = useNavigate();
  return (
    <tr key={id}>
      <th scope="row"> {row} </th>
      <td>{getLabel(type)}</td>
      <td
        className="pointer"
        onClick={() => {
          navigate(`/userDetails/${author.id}`);
        }}
      >{`${author.firstName} ${author.lastName} (id: ${author.id})`}</td>
      <td>{new Date(time).toLocaleString()}</td>
      <td
        className="pointer"
        onClick={() => {
          if (pet) navigate(`/profile/${pet.id}`);
        }}
      >
        {pet ? `${pet.name}(id: ${pet.id})` : "-"}
      </td>
      <td>{newStatus ? newStatus : "-"}</td>
    </tr>
  );
};

export default NewsfeedItem;
