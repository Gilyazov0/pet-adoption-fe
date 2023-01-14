import IssueComment from "../../Types/IssueComment";

const Comment: React.FC<{ comment: IssueComment }> = ({ comment }) => {
  const { author, time, text } = comment;
  return (
    <>
      <h5>{`${new Date(time).toLocaleString()} comment from ${
        author.firstName
      } ${author.lastName} (id:${author.id}):`}</h5>
      <h5>{text}</h5>
    </>
  );
};

export default Comment;
