import Issue from "../../Types/Issue";
import UserData from "../CommonComponents/UserData";
import backImgUrl from "../../assets/back.svg";
import { Button } from "react-bootstrap";
import AddComment from "./AddComment";
import { useState } from "react";
import ContactUsApi from "../../lib/contactUsApi";
import Comment from "./Comment";

const IssueDetails: React.FC<{ issue: Issue; backToList: Function }> = ({
  backToList,
  issue,
}) => {
  const [showAddComment, setShowAddComment] = useState(false);

  async function handleDelete() {
    ContactUsApi.delIssue(issue.id);
  }
  const { author, title, time, text } = issue;

  const comments = issue.comments.map((comment) => (
    <Comment comment={comment} key={comment.id} />
  ));

  return (
    <div className="d-flex flex-row m-3">
      <UserData user={author} />

      <div style={{ marginLeft: "300px" }}>
        <h3> {title} </h3>
        <h5> {`Created ${new Date(time).toLocaleString()}`} </h5>
        <div className="mb-4">{text}</div>
        {comments}

        <Button
          className="btn-custom mt-3 me-3"
          onClick={() => {
            setShowAddComment(true);
          }}
        >
          Add comment
        </Button>
        <Button className="btn-custom mt-3" onClick={(e) => handleDelete()}>
          Del issue
        </Button>
      </div>
      <img
        className={`active pointer back-icon`}
        src={backImgUrl}
        alt="chat"
        onClick={() => backToList()}
      />
      <AddComment
        showAddComment={showAddComment}
        setShowAddComment={setShowAddComment}
        issueId={issue.id}
      />
    </div>
  );
};

export default IssueDetails;
