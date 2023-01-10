import { useState, useContext, useEffect, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import Ws from "../../lib/websocket";
import { UserContext } from "../../App";
import "../../style/Chat.css";
import ChatMessage from "./ChatMessage";
import ChatMsg from "../../Types/ChatMsg";
import ChatApi from "../../lib/chatApi";

const Chat: React.FC = () => {
  const [msg, setMsg] = useState<string>("");
  const [ws, setWs] = useState<Ws | undefined>();
  const { user } = useContext(UserContext);
  const [chat, setChat] = useState<ChatMsg[]>();

  const onMsg = useCallback((newMsg: ChatMsg) => {
    setChat((prev) => (prev ? [...prev, newMsg] : [newMsg]));
  }, []);
  useEffect(() => {
    async function getChatData(id: number) {
      const response = await ChatApi.getChatById(id);
      if (response.data) setChat(response.data);
    }

    if (user) getChatData(user.id);
  }, [user]);

  useEffect(() => {
    if (!user || !user.id) return;

    const ws = new Ws(
      user.id,
      user.id,
      user.isAdmin,
      `${user.firstName} ${user.lastName}`,
      onMsg
    );
    setWs(ws);
  }, [user, onMsg]);

  const messages = chat?.map((msg, i) => <ChatMessage key={i} {...msg} />);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {ws && (
        <div className="chat">
          <div className="chat-messages">{messages}</div>
          <div className="d-flex">
            <Form.Control
              type="text"
              name={"password"}
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
            />
            <Button
              className="btn-custom ms-2"
              onClick={() => {
                const newMsg: ChatMsg = {
                  msg,
                  authorId: user!.id,
                  name: "you",
                  time: new Date().toString(),
                };
                ws.send(msg);
                onMsg(newMsg);
                setMsg("");
              }}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
