import ChatMsg from "../../Types/ChatMsg";
import React, { useState } from "react";
import Chat from "../Chat/Chat";

const ChatListItem: React.FC<{ chat: ChatMsg[]; row: number }> = ({
  chat,
  row,
}) => {
  const [showChat, setShowChat] = useState<boolean>(false);

  const time = new Date(chat[chat.length - 1].time);
  return (
    <tbody>
      <tr
        onClick={() => {
          setShowChat((prev) => !prev);
        }}
        className="pointer"
      >
        <th scope="row"> {row} </th>
        <td>{chat[0].authorId}</td>
        <td>{`${chat[0].name}`}</td>
        <td>{time.toLocaleString()}</td>

        <td>{showChat && <Chat />}</td>
      </tr>
    </tbody>
  );
};

export default ChatListItem;
