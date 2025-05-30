import { createContext, useContext, useState, useEffect } from 'react';

const QuizContext = createContext();

export const useQuiz = () => {
  return useContext(QuizContext);
};

export function QuizProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(() => {
    const savedQuiz = localStorage.getItem('activeQuiz');
    return savedQuiz ? JSON.parse(savedQuiz) : null;
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (err) {
        setError('Failed to load quiz categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeQuiz) {
      localStorage.setItem('activeQuiz', JSON.stringify(activeQuiz));
    } else {
      localStorage.removeItem('activeQuiz');
    }
  }, [activeQuiz]);

  const startQuiz = async (categoryId, amount, difficulty) => {
    try {
      setLoading(true);
      const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.response_code !== 0) {
        throw new Error('Failed to load quiz questions');
      }

      const category = categories.find(c => c.id === categoryId)?.name || 'Unknown';

      const quiz = {
        id: Date.now(),
        category,
        categoryId,
        difficulty,
        startTime: new Date().toISOString(),
        timeLimit: amount * 30,
        timeRemaining: amount * 30,
        lastResumeTime: new Date().toISOString(),
        currentQuestionIndex: 0,
        questions: data.results.map(q => ({
          ...q,
          all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
          user_answer: null,
        })),
        completed: false,
        results: {
          correct: 0,
          wrong: 0,
          unanswered: amount,
          total: amount,
          category,
          difficulty
        }
      };

      setActiveQuiz(quiz);
      return quiz;
    } catch (err) {
      setError(err.message || 'An error occurred starting the quiz');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = (answer) => {
    if (!activeQuiz || activeQuiz.completed) return;

    setActiveQuiz(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      const isCorrect = answer === currentQuestion.correct_answer;

      const updatedQuestions = [...prev.questions];
      updatedQuestions[prev.currentQuestionIndex] = {
        ...currentQuestion,
        user_answer: answer
      };

      const updatedResults = {
        ...prev.results,
        correct: isCorrect ? prev.results.correct + 1 : prev.results.correct,
        wrong: !isCorrect ? prev.results.wrong + 1 : prev.results.wrong,
        unanswered: prev.results.unanswered - 1,
      };

      const isLastQuestion = prev.currentQuestionIndex === prev.questions.length - 1;

      return {
        ...prev,
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
        questions: updatedQuestions,
        completed: isLastQuestion,
        results: updatedResults
      };
    });
  };

  const completeQuiz = () => {
    if (!activeQuiz) return;

    setActiveQuiz(prev => {
      const answeredCount = prev.questions.filter(q => q.user_answer !== null).length;
      const correctCount = prev.questions.filter(q => q.user_answer === q.correct_answer).length;

      return {
        ...prev,
        completed: true,
        results: {
          ...prev.results,
          correct: correctCount,
          wrong: answeredCount - correctCount,
          unanswered: prev.questions.length - answeredCount
        }
      };
    });
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    localStorage.removeItem('activeQuiz');
  };

  const value = {
    categories,
    loading,
    error,
    activeQuiz,
    startQuiz,
    submitAnswer,
    completeQuiz,
    resetQuiz
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}
