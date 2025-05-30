import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../contexts/QuizContext';
import useTimer from '../../hooks/useTimer';
import QuizQuestion from '../../components/QuizQuestion';
import QuizProgress from '../../components/QuizProgress';
import QuizResults from '../../components/QuizResults';

export default function Quiz() {
  const navigate = useNavigate();
  const { activeQuiz, submitAnswer, completeQuiz, resetQuiz } = useQuiz();
  
  const handleTimeout = () => {
    completeQuiz();
  };
  
  const { timeRemaining, formatTime, startTimer } = useTimer(
    activeQuiz?.timeLimit || 300, 
    handleTimeout
  );

  // Start timer when component mounts
  useEffect(() => {
    if (activeQuiz && !activeQuiz.completed) {
      startTimer();
    }
  }, []);

  // If no active quiz, redirect to home
  useEffect(() => {
    if (!activeQuiz) {
      navigate('/');
    }
  }, [activeQuiz, navigate]);

  if (!activeQuiz) {
    return <div className="text-center p-6">Loading quiz...</div>;
  }

  // Show results if quiz is completed
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
        />
      </div>
      
      <QuizQuestion 
        question={currentQuestion}
        onAnswer={submitAnswer}
      />
    </div>
  );
}
