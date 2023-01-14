import { useContext, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import ContactUsApi from "../../lib/contactUsApi";
import Message, { MessageType } from "../CommonComponents/Message";
import { IssueContext } from "./Issues";
import { useAppSelector } from "../../hooks/redux";

interface Props {
  showAddComment: boolean;
  setShowAddComment: Function;
  issueId: string;
}

const AddComment: React.FC<Props> = ({
  showAddComment,
  setShowAddComment,
  issueId,
}) => {
  const [text, setText] = useState<string>("");
  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });
  const { setIssues } = useContext(IssueContext);
  const { user } = useAppSelector((state) => state.user);

  async function handleClick() {
    const response = await ContactUsApi.addComment(text, issueId);
    if (response.error) {
      setMsg({ text: response.error, type: "error" });
    }
    if (response.data) {
      setIssues((prev) =>
        prev.map((issue) => {
          if (issue.id === issueId) {
            issue.comments.push({
              author: {
                id: user!.id.toString(),
                firstName: user!.firstName,
                lastName: user!.lastName,
              },
              authorId: user!.id.toString(),
              text,
              time: new Date().toString(),
              id: crypto.randomUUID(),
            });
          }
          return issue;
        })
      );
      setText("");
      setShowAddComment(false);
    }
  }

  return (
    <Modal
      show={showAddComment}
      onHide={() => setShowAddComment(false)}
      centered
    >
      <Modal.Body className=" ">
        <FloatingLabel label="Comment" className="mb-3">
          <Form.Control
            className="styled-border"
            style={{ height: "200px" }}
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
          Add comment
        </Button>
        <Message msg={msg} setMsg={setMsg} />
      </Modal.Body>
    </Modal>
  );
};

export default AddComment;
