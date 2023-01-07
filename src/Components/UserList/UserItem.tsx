import User from "../../Types/User";
const UserItem: React.FC<{ user: User; row: number; onClick: Function }> = ({
  user,
  row,
  onClick,
}) => {
  const { id, email, firstName, lastName, isAdmin, pets, phone } = user;
  return (
    <tr key={id} onClick={() => onClick(user)} className="pointer">
      <th scope="row"> {row} </th>
      <td>{`${firstName} ${lastName}`}</td>
      <td>{email}</td>
      <td>{phone ? phone : "-"}</td>
      <td>{pets.length}</td>
      <td>{isAdmin.toString()}</td>
    </tr>
  );
};

export default UserItem;
