import { useState, useEffect } from "react";
import User from "../../Types/User";
import UserApi from "../../lib/userApi";
import Message, { MessageType } from "../CommonComponents/Message";
import UserItem from "./UserItem";
import { useNavigate } from "react-router-dom";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });

  const navigate = useNavigate();

  useEffect(() => {
    async function getAllUsers() {
      const res = await UserApi.getAllUsers();
      if (res.data) setUsers(res.data);
      if (res.error) setMsg({ text: res.error, type: "error" });
    }

    getAllUsers();
  }, []);

  const rows = users?.map((user, i) => (
    <UserItem
      key={user.id}
      row={i + 1}
      user={user}
      onClick={() => navigate(`/userDetails/${user.id}`)}
    />
  ));

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name </th>
            <th scope="col">Email </th>
            <th scope="col">Phone</th>
            <th scope="col">Pets number</th>
            <th scope="col">Is admin</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <Message msg={msg} setMsg={setMsg} />
    </>
  );
};

export default UserList;
