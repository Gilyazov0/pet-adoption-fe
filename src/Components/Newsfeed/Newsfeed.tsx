import { useEffect, useState } from "react";
import EventApi from "../../lib/eventApi";
import { EventMsg } from "../../Types/EventMsg";
import Message, { MessageType } from "../CommonComponents/Message";
import NewsfeedItem from "./NewsfeedItem";
import moment from "moment";
import { Button } from "react-bootstrap";

const Newsfeed: React.FC = () => {
  const [newsfeed, setNewsfeed] = useState<EventMsg[] | undefined>();
  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });
  const [endDate, setEndDate] = useState<string>(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [startDate, setStartDate] = useState<string>(
    moment().subtract(1, "days").format("YYYY-MM-DDTHH:mm")
  );

  async function getNewsfeed() {
    const response = await EventApi.getNewsfeed(startDate, endDate);
    if (response.error) {
      setMsg({ text: response.error, type: "error" });
    }
    if (response.data) {
      setNewsfeed(response.data);
    }
  }

  useEffect(() => {
    getNewsfeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = newsfeed?.map((event, i) => (
    <NewsfeedItem key={event.id} row={i + 1} event={event} />
  ));

  return (
    <>
      <div>
        <span className="m-3">End date</span>
        <input
          className="m-3"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <span className="m-3">Start date</span>

        <input
          className="m-3"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Button className="btn-custom me-2" onClick={getNewsfeed}>
          Submit
        </Button>
      </div>

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
