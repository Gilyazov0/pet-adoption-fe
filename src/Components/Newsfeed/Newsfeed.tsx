import { useEffect, useState } from "react";
import EventApi from "../../lib/eventApi";
import { EventMsg } from "../../Types/EventMsg";
import Message, { MessageType } from "../CommonComponents/Message";
import NewsfeedItem from "./NewsfeedItem";

const Newsfeed: React.FC = () => {
  const [newsfeed, setNewsfeed] = useState<EventMsg[] | undefined>();
  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });

  useEffect(() => {
    async function getNewsfeed() {
      const response = await EventApi.getNewsfeed();
      if (response.error) {
        setMsg({ text: response.error, type: "error" });
      }
      if (response.data) {
        setNewsfeed(response.data);
      }
    }
    getNewsfeed();
  }, []);

  const rows = newsfeed?.map((event, i) => (
    <NewsfeedItem key={event.id} row={i + 1} event={event} />
  ));

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Event type </th>
            <th scope="col">Author</th>
            <th scope="col">Time</th>
            <th scope="col">Pet</th>
            <th scope="col">New pet status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <Message msg={msg} setMsg={setMsg} />
    </>
  );
};

export default Newsfeed;
