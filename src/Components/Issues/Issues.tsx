import { useState, useEffect, createContext } from "react";
import Issue from "../../Types/Issue";
import ContactUsApi from "../../lib/contactUsApi";
import Message, { MessageType } from "../CommonComponents/Message";
import IssuesItem from "./IssuesItem";
import IssueDetails from "./IssueDetails";
import "../../style/Issues.css";

export const IssueContext = createContext<{
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
}>({ setIssues: () => {} });

const Issues: React.FC = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentIssue, setCurrentIssue] = useState<Issue | undefined>();
  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });

  useEffect(() => {
    async function getIssues() {
      const response = await ContactUsApi.getAllIssues();
      if (response.data) setIssues(response.data);
      if (response.error) setMsg({ text: response.error, type: "error" });
    }

    getIssues();
  }, []);

  const rows = issues?.map((issue, i) => (
    <IssuesItem
      key={issue.id}
      row={i + 1}
      issue={issue}
      onClick={() => {
        setCurrentIssue(issue);
        setShowDetails(true);
      }}
    />
  ));

  return (
    <IssueContext.Provider value={{ setIssues }}>
      {!showDetails ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Author </th>
                <th scope="col">Date </th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
          <Message msg={msg} setMsg={setMsg} />{" "}
        </>
      ) : (
        <IssueDetails
          issue={currentIssue!}
          backToList={() => setShowDetails(false)}
        />
      )}
    </IssueContext.Provider>
  );
};

export default Issues;
