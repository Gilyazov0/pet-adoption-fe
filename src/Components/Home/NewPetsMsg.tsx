const NewPetsMsg: React.FC<{ num: number }> = ({ num }) => {
  return (
    <>
      {num > 0 && (
        <div>
          <span>We've got</span>
          <span className="text-red">{` ${num} `}</span>
          <span>{`new pet${num > 1 ? "s" : ""} for you`}.</span>
        </div>
      )}
    </>
  );
};

export default NewPetsMsg;
