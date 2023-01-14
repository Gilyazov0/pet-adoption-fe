import Issue from "../../Types/Issue";
const IssuesItem: React.FC<{
  issue: Issue;
  row: number;
  onClick: Function;
}> = ({ issue, row, onClick }) => {
  const { author, time, title } = issue;
  return (
    <tr onClick={() => onClick()} className="pointer">
      <th scope="row"> {row} </th>
      <td>{`${author.firstName} ${author.lastName} (id:${author.id})`}</td>
      <td>{new Date(time).toLocaleString()}</td>
      <td>{title}</td>
    </tr>
  );
};

export default IssuesItem;
