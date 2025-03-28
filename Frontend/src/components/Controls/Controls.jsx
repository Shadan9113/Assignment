const Controls = ({ 
    currentIndex, 
    totalQuestions,
    handlePrevious,
    handleNext,
    handleSelect,
    handleRestart
  }) => {
    return (
      <div className="controls">
        <button 
          className="restart-btn"
          onClick={handleRestart}
        >
          ↻ Restart Quiz
        </button>
  
        <select
          value={currentIndex}
          onChange={handleSelect}
        >
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <option key={`q-${i}`} value={i}>Question {i + 1}</option>
          ))}
        </select>
        
        <button
          disabled={currentIndex === 0}
          onClick={handlePrevious}
        >
          ← Previous
        </button>
        
        <button
          disabled={currentIndex === totalQuestions - 1}
          onClick={handleNext}
        >
          Next →
        </button>
      </div>
    );
  };
  
  export default Controls;