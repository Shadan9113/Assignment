import DroppableBlank from '../Draggable/DroppableBlank';

const QuestionText = ({ question, answers, isSubmitted, onDrop }) => {
  const splitText = () => {
    if (!question?.text) return null;
    
    const parts = question.text.split(/(___)/g);
    let blankIndex = -1;
    
    return parts.map((part, i) => {
      if (part === '___') {
        blankIndex++;
        return (
          <DroppableBlank
            key={`blank-${i}`}
            index={blankIndex}
            answer={answers[blankIndex]}
            correctAnswer={question.correctAnswers?.[blankIndex] || ''}
            isSubmitted={isSubmitted}
            onDrop={onDrop}
          />
        );
      }
      return <span key={`text-${i}`}>{part}</span>;
    });
  };

  return (
    <div className="text-container">
      {splitText()}
    </div>
  );
};

export default QuestionText;