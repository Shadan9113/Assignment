import { useState, useEffect } from 'react';
import QuestionText from './QuestionText';
import OptionsList from './OptionsList';
import QuestionFooter from './QuestionFooter';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const Question = ({ question, onSubmit, isSubmitted, results }) => {
  const [answers, setAnswers] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    if (question) {
      const blanksCount = (question.text.match(/___/g) || []).length;
      setAnswers(Array(blanksCount).fill(''));
      setShuffledOptions([...new Set(question.options)].sort(() => Math.random() - 0.5));
    }
  }, [question]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleDrop = (index, word) => {
    if (!isSubmitted) {
      setAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[index] = word;
        return newAnswers;
      });
    }
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <h3>{question?.title || 'Question'}</h3>
        <div className="timer">Time: {formatTime(timeSpent)}</div>
      </div>

      <QuestionText 
        question={question}
        answers={answers}
        isSubmitted={isSubmitted}
        onDrop={handleDrop}
      />
      <OptionsList options={shuffledOptions} />
      <QuestionFooter
        onSubmit={() => onSubmit(answers)}
        isSubmitted={isSubmitted}
        results={results}
        answers={answers}
      />
    </div>
  );
};

export default Question;