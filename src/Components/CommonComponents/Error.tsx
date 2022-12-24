const Error: React.FC<{ error: string }> = ({ error }) => {
  return (
    <span className={`text-danger ${error ? "" : "d-none"}`}>{error}</span>
  );
};

export default Error;
