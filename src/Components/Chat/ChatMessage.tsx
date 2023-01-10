import ChatMsg from "../../Types/ChatMsg";
import { useContext } from "react";
import { UserContext } from "../../App";

const ChatMessages: React.FC<ChatMsg> = ({ msg, name, authorId }) => {
  const { user } = useContext(UserContext);

  return <div>{`${name}: ${msg}`}</div>;
};

export default ChatMessages;
