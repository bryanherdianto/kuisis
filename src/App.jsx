import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { QuizProvider } from './contexts/QuizContext';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Quiz from './pages/Quiz';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const isQuizRoute = location.pathname === '/quiz';

  return (
    <AuthProvider>
      <QuizProvider>
        <div className="min-h-screen bg-gray-50">
          {!isQuizRoute && <Navbar />}
          <main className={`p-4 ${!isQuizRoute ? 'mt-15' : ''}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
          {!isQuizRoute && <Footer />}
        </div>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
