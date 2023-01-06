import User from "../../Types/User";
const UserItem: React.FC<{ user: User; row: number; onClick: Function }> = ({
  user,
  row,
  onClick,
}) => {
  return (
    <tr key={user.id} onClick={() => onClick(user)}>
      <th scope="row"> {row} </th>
      <td>{`${user.firstName} ${user.lastName}`}</td>
      <td>{user.email}</td>
      <td>{user.phone ? user.phone : "-"}</td>
      <td>{user.pets.length}</td>
      <td>{user.isAdmin.toString()}</td>
    </tr>
  );
};

export default UserItem;
