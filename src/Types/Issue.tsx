import IssueComment from "./IssueComment";
import User from "./User";

type Issue = {
  id: string;
  author: User;
  text: string;
  title: string;
  time: string;
  comments: IssueComment[];
};

export default Issue;
