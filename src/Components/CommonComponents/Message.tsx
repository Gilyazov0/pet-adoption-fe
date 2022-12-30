import { useEffect } from "react";
export type MessageType = {
  text: string;
  type: "error" | "success";
};

const Message: React.FC<{
  msg: MessageType;
  setMsg: React.Dispatch<React.SetStateAction<MessageType>>;
}> = ({ msg, setMsg }) => {
  useEffect(() => {
    if (!msg.text) return;
    const timer = setTimeout(() => setMsg({ ...msg, text: "" }), 10000);
    return () => clearTimeout(timer);
  }, [msg]);
  return (
    <span
      className={`${msg.type === "error" ? "text-danger" : "text-success"}`}
    >
      {msg.text}
    </span>
  );
};

export default Message;
