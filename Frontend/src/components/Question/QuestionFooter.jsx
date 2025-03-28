const QuestionFooter = ({ onSubmit, isSubmitted, results, answers }) => {
    return !isSubmitted ? (
      <button 
        onClick={onSubmit}
        disabled={answers.some(a => !a)}
      >
        Submit
      </button>
    ) : (
      <div className="results">
        <p>Score: {results?.score || 0}/{results?.total || 0}</p>
      </div>
    );
  };
  
  export default QuestionFooter;