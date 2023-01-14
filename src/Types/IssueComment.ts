type IssueComment = {
  id: string;
  authorId: string;
  text: string;
  time: string;
  author: { id: string; firstName: string; lastName: string };
};

export default IssueComment;
