import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import useTimer from '../hooks/useTimer';
import QuizQuestion from '../components/QuizQuestion';
import QuizProgress from '../components/QuizProgress';
import QuizResults from '../components/QuizResults';

export default function Quiz() {
  const navigate = useNavigate();
  const { activeQuiz, submitAnswer, completeQuiz, resetQuiz } = useQuiz();
  const [isInitialized, setIsInitialized] = useState(false);

  const calculateRemainingTime = () => {
    if (!activeQuiz) return 300;
    
    if (activeQuiz.timeRemaining) {
      return activeQuiz.timeRemaining;
    }
    
    return activeQuiz.timeLimit || 300;
  };

  const handleTimeout = () => {
    completeQuiz();
  };

  const { timeRemaining, formatTime, startTimer } = useTimer(
    calculateRemainingTime(),
    handleTimeout
  );
  useEffect(() => {
    if (activeQuiz && !activeQuiz.completed && !isInitialized) {
      startTimer();
      setIsInitialized(true);
    }
  }, [activeQuiz, isInitialized, startTimer]);
  
  useEffect(() => {
    if (activeQuiz && !activeQuiz.completed) {
      console.log("Saving timer state:", timeRemaining);
      const updatedQuiz = {
        ...activeQuiz,
        timeRemaining: timeRemaining,
        lastResumeTime: new Date().toISOString()
      };
      localStorage.setItem('activeQuiz', JSON.stringify(updatedQuiz));
    }
  }, [timeRemaining, activeQuiz]);

  useEffect(() => {
    if (!activeQuiz) {
      navigate('/');
    }
  }, [activeQuiz, navigate]);

  if (!activeQuiz) {
    return <div className="text-center p-6">Loading quiz...</div>;
  }

  if (activeQuiz.completed) {
    return <QuizResults results={activeQuiz.results} onReset={resetQuiz} />;
  }

  const currentQuestion = activeQuiz.questions[activeQuiz.currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">{activeQuiz.category}</h1>
        <p className="text-gray-600 capitalize mb-6">
          Difficulty: {activeQuiz.difficulty}
        </p>
        <QuizProgress
          currentQuestionIndex={activeQuiz.currentQuestionIndex}
          totalQuestions={activeQuiz.questions.length}
          timeRemaining={timeRemaining}
          formatTime={formatTime}
          initialTime={activeQuiz.timeLimit}
        />
      </div>

      <QuizQuestion
        question={currentQuestion}
        onAnswer={submitAnswer}
      />
    </div>
  );
}
