import ChatMsg from "../Types/ChatMsg";

export default class Ws {
  private ws: WebSocket;
  private name: string;
  private userId: string;
  private chatId: string;
  private onMessage: Function;

  constructor(
    userId: number,
    chatId: number,
    isAdmin: boolean,
    name: string,
    onMessage: Function
  ) {
    this.name = name;
    this.userId = userId.toString();
    this.chatId = chatId.toString();
    this.onMessage = onMessage;
    this.ws = new WebSocket(
      `ws${
        import.meta.env.VITE_API_BASE_URL
      }websocket?userId=${userId}&isAdmin=${isAdmin}&chatId=${chatId}`
    );

    this.ws.onmessage = function (event) {
      const msgObj: ChatMsg = JSON.parse(event.data);
      onMessage(msgObj);
    };
  }

  public send(msg: string) {
    const msgObj = {
      msg,
      name: this.name,
      userId: this.userId,
      chatId: this.chatId,
    };
    this.ws.send(JSON.stringify(msgObj));
  }
}

// export function webSocketTest() {
//   // Let us open a web socket
//   var ws = new WebSocket("ws://localhost:8080/websockets?pam=1");

//   ws.onopen = function () {
//     // Web Socket is connected, send data using send()
//     ws.send("Message to send");
//   };

//   ws.onclose = function () {
//     // websocket is closed.
//     alert("Connection is closed...");
//   };
// }
