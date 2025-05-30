import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { isSignedIn, user } = useUser();
  const [userStats, setUserStats] = useState(() => {
    const savedStats = localStorage.getItem('userStats');
    return savedStats ? JSON.parse(savedStats) : {
      completedQuizzes: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      quizHistory: []
    };
  });

  useEffect(() => {
    if (isSignedIn) {
      localStorage.setItem('userStats', JSON.stringify(userStats));
    }
  }, [userStats, isSignedIn]);

  const updateStats = (quizResults) => {
    setUserStats(prevStats => {
      const newStats = {
        ...prevStats,
        completedQuizzes: prevStats.completedQuizzes + 1,
        correctAnswers: prevStats.correctAnswers + quizResults.correct,
        wrongAnswers: prevStats.wrongAnswers + quizResults.wrong,
        quizHistory: [
          ...prevStats.quizHistory,
          {
            id: Date.now(),
            date: new Date().toISOString(),
            category: quizResults.category,
            difficulty: quizResults.difficulty,
            correct: quizResults.correct,
            wrong: quizResults.wrong,
            total: quizResults.total,
          }
        ]
      };
      return newStats;
    });
  };

  const value = {
    isSignedIn,
    user,
    userStats,
    updateStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
