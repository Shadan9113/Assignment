import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import Controls from './components/Controls/Controls';
import Question from './components/Question';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/questions')
      .then(res => {
        setQuestions(res.data.questions || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setSubmitted(false);
  }, [currentIndex]);

  const handleSubmit = async (answers) => {
    try {
      const res = await axios.post('http://localhost:5000/api/submit', {
        questionId: questions[currentIndex]._id,
        userAnswers: answers
      });

      setResults(prev => ({
        ...prev,
        [currentIndex]: res.data
      }));
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err.response?.data);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setResults({});
    setSubmitted(false);
  };

  if (loading) return <div className="loading">Loading questions...</div>;

  const totalScore = Object.values(results).reduce((sum, r) => sum + r.score, 0);
  const totalPossible = Object.values(results).reduce((sum, r) => sum + r.total, 0);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1)/questions.length)*100}%` }}
          >
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>

        <Controls
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          handlePrevious={() => setCurrentIndex(i => i - 1)}
          handleNext={() => setCurrentIndex(i => i + 1)}
          handleSelect={(e) => setCurrentIndex(Number(e.target.value))}
          handleRestart={handleRestart}
        />

        {questions[currentIndex] ? (
          <Question
            key={currentIndex}
            question={questions[currentIndex]}
            onSubmit={handleSubmit}
            isSubmitted={submitted}
            results={results[currentIndex] || {}}
          />
        ) : (
          <div>No questions available</div>
        )}

        {currentIndex === questions.length - 1 && submitted && (
          <div className="final-score">
            <h3>Quiz Complete! 🎉</h3>
            <p>Final Score: {totalScore}/{totalPossible}</p>
            <p>Percentage: {Math.round((totalScore/totalPossible)*100)}%</p>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default App;