import { useDrop } from 'react-dnd';

const DroppableBlank = ({ index, answer, correctAnswer, isSubmitted, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'word',
    drop: (item) => onDrop(index, item.word),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getAnswerStatus = () => {
    if (!isSubmitted) return '';
    return answer === correctAnswer ? 'correct' : 'incorrect';
  };

  return (
    <span
      ref={drop}
      className={`blank ${isOver ? 'over' : ''} ${getAnswerStatus()}`}
    >
      {isSubmitted ? (
        <>
          [{answer || ' '}]<span className="correct-answer">{correctAnswer}</span>
        </>
      ) : (
        answer || '___'
      )}
    </span>
  );
};

export default DroppableBlank;