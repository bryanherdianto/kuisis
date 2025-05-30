import { Routes, Route } from 'react-router-dom';
import { RedirectToSignIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';
import { AuthProvider } from './contexts/AuthContext';
import { QuizProvider } from './contexts/QuizContext';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Quiz from './pages/quiz/Quiz';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/stats" element={<Stats />} />
              <Route 
                path="/sign-in/*" 
                element={<SignIn routing="path" path="/sign-in" />} 
              />
              <Route 
                path="/sign-up/*" 
                element={<SignUp routing="path" path="/sign-up" />} 
              />
            </Routes>
          </main>
        </div>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
