import { useEffect, useState } from "react";
import ChatMsg from "../../Types/ChatMsg";
import ChatApi from "../../lib/chatApi";
import Message, { MessageType } from "../CommonComponents/Message";
import ChatListItem from "./ChatlistItem";
import Chat from "../Chat/Chat";

const ChatList: React.FC = () => {
  const [chats, setChats] = useState<{ [key: number]: ChatMsg[] }>({});
  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });

  useEffect(() => {
    async function getAllChats() {
      const response = await ChatApi.getAllChats();
      if (response.error) {
        setMsg({ text: response.error, type: "error" });
      }
      if (response.data) {
        setChats(response.data);
      }
    }
    getAllChats();
  }, []);

  const rows = Object.values(chats).map((chat, i) => (
    <ChatListItem key={chat[0].authorId} row={i + 1} chat={chat} />
  ));
  console.log(chats);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Chat id </th>
            <th scope="col">User name</th>
            <th scope="col">Last message date</th>
            <th scope="col">Chat </th>
          </tr>
        </thead>
        {rows}
      </table>

      <Message msg={msg} setMsg={setMsg} />
    </>
  );
};

export default ChatList;
