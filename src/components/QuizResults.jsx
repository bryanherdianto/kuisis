import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function QuizResults({ results, onReset }) {
  const navigate = useNavigate();
  const { updateStats, isSignedIn } = useAuth();

  const handleSaveResults = () => {
    updateStats(results);
    onReset();
    navigate('/stats');
  };

  const handleNewQuiz = () => {
    onReset();
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Quiz Results</h2>

      <div className="mb-6">
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Category:</span> {results.category}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Difficulty:</span> {results.difficulty.charAt(0).toUpperCase() + results.difficulty.slice(1)}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 bg-green-100 rounded-lg">
          <div className="text-3xl font-bold text-green-600">{results.correct}</div>
          <div className="text-gray-600">Correct</div>
        </div>

        <div className="text-center p-4 bg-red-100 rounded-lg">
          <div className="text-3xl font-bold text-red-600">{results.wrong}</div>
          <div className="text-gray-600">Wrong</div>
        </div>

        <div className="text-center p-4 bg-gray-100 rounded-lg col-span-2 sm:col-span-1">
          <div className="text-3xl font-bold text-gray-600">{results.unanswered}</div>
          <div className="text-gray-600">Unanswered</div>
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleNewQuiz}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          New Quiz
        </button>
        {isSignedIn && (
          <button
            onClick={handleSaveResults}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Results
          </button>
        )}
      </div>
    </div>
  );
}
