const Results = ({results}) => {
  return (
    <div>
      {results.length > 0 &&
      <h3>Result: {results[0]}</h3>
      }
    </div>
  );
};

export default Results;
