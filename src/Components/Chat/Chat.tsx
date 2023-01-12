import { useState, useEffect, useCallback, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import Ws from "../../lib/websocket";
import "../../style/Chat.css";
import ChatMessage from "./ChatMessage";
import ChatMsg from "../../Types/ChatMsg";
import ChatApi from "../../lib/chatApi";
import { useAppSelector } from "../../hooks/redux";

const Chat: React.FC<{ chatId: number }> = ({ chatId }) => {
  const [msg, setMsg] = useState<string>("");
  const [ws, setWs] = useState<Ws | undefined>();

  const { user } = useAppSelector((state) => state.user);
  const [chat, setChat] = useState<ChatMsg[]>();
  const msgWindow = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (msgWindow.current)
      msgWindow.current.scrollTop = msgWindow.current.scrollHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgWindow.current, msg]);

  const onMsg = useCallback((newMsg: ChatMsg) => {
    setChat((prev) => (prev ? [...prev, newMsg] : [newMsg]));
  }, []);

  useEffect(() => {
    async function getChatData(id: number) {
      const response = await ChatApi.getChatById(id);
      if (response.data) setChat(response.data);
    }

    if (user) getChatData(chatId);
  }, [user, chatId]);

  useEffect(() => {
    if (!user || !user.id) return;

    const ws = new Ws(
      user.id,
      chatId,
      user.isAdmin,
      `${user.firstName} ${user.lastName}`,
      onMsg
    );
    setWs(ws);
  }, [user, onMsg, chatId]);

  function handleSend() {
    const newMsg: ChatMsg = {
      msg,
      authorId: user!.id,
      name: "you",
      time: new Date().toString(),
    };
    ws?.send(msg);
    onMsg(newMsg);
    setMsg("");
  }

  async function handleDel() {
    const res = await ChatApi.delChat(chatId);
    if (res.data) setChat([]);
  }

  const messages = chat?.map((msg, i) => <ChatMessage key={i} {...msg} />);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="w-100"
    >
      {ws && (
        <div className="chat w-100">
          <div className="chat-messages w-100" ref={msgWindow}>
            {messages}
          </div>

          <div className="d-flex w-100">
            {user && user.isAdmin && (
              <Button className="btn-custom me-2" onClick={handleDel}>
                Del
              </Button>
            )}
            <Form.Control
              type="text"
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
            />
            <Button className="btn-custom ms-2" onClick={handleSend}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
