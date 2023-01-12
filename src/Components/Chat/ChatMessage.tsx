import ChatMsg from "../../Types/ChatMsg";
import { useAppSelector } from "../../hooks/redux";

const ChatMessages: React.FC<ChatMsg> = ({ msg, name, authorId }) => {
  const { user } = useAppSelector((state) => state.user);

  return <div>{`${authorId === user?.id ? "you" : name}: ${msg}`}</div>;
};

export default ChatMessages;
