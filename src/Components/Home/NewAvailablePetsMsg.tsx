const NewAvailablePetsMsg: React.FC<{ num: number }> = ({ num }) => {
  return (
    <>
      {num > 0 && (
        <div>
          <span>Since your last visit </span>
          <span className="text-red">{` ${num} `}</span>
          <span>
            {`pet${num > 1 ? "s" : ""} changed status to available!`}.
          </span>
        </div>
      )}
    </>
  );
};

export default NewAvailablePetsMsg;
