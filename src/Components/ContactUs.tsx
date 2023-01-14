import { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import ContactUsApi from "../lib/contactUsApi";
import Message, { MessageType } from "./CommonComponents/Message";

const ContactUs: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });

  async function handleClick() {
    const response = await ContactUsApi.addIssue(text, title);
    if (response.error) {
      setMsg({ text: response.error, type: "error" });
    } else {
      setMsg({
        text: "We've got your message and soon contact you",
        type: "success",
      });
      setText("");
      setTitle("");
    }
  }

  return (
    <Container className="mt-4">
      <h3>
        Please, describe your problem. We will try to help you as soon as
        possible:
      </h3>
      <FloatingLabel label="Title" className="mb-3 mt-4">
        <Form.Control
          type="text"
          placeholder="Dietary"
          name={"dietary"}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="styled-border"
          max={40}
          required
        />
      </FloatingLabel>
      <FloatingLabel label="Problem description" className="mb-3">
        <Form.Control
          className="styled-border"
          style={{ height: "50vh" }}
          as="textarea"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          required
        />
      </FloatingLabel>
      <Button
        className="btn-custom mt-2 me-2"
        type="submit"
        disabled={!text}
        onClick={(e) => handleClick()}
      >
        Submit
      </Button>
      <Message msg={msg} setMsg={setMsg} />
    </Container>
  );
};

export default ContactUs;
