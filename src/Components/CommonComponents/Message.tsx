import { useState, useEffect } from "react";
export type MessageType = {
  text: string;
  type: "error" | "success";
};

const Message: React.FC<MessageType> = (msg) => {
  const [show, setShow] = useState<boolean>(true);
  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 10000);
    return () => clearTimeout(timer);
  }, [msg]);
  return (
    <span
      className={`${msg.type === "error" ? "text-danger" : "text-success"}  ${
        show ? "" : "d-none"
      }`}
    >
      {msg.text}
    </span>
  );
};

export default Message;
