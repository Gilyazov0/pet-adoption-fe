import ChatMsg from "../../Types/ChatMsg";
import React, { useState } from "react";
import Chat from "../Chat/Chat";

const Test: React.FC<{ chat: ChatMsg[]; row: number }> = ({ chat, row }) => {
  const [showChat, setShowChat] = useState<boolean>(false);

  const lastMsgTime = new Date(chat[chat.length - 1].time);
  const firstMsgTime = new Date(chat[0].time);
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
        <td>{firstMsgTime.toLocaleString()}</td>
        <td>{lastMsgTime.toLocaleString()}</td>

        <td className="w-100">
          {showChat && <Chat chatId={chat[0].authorId} />}
        </td>
      </tr>
    </tbody>
  );
};

export default Test;
