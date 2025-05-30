import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  const { startQuiz } = useQuiz();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizOptions, setQuizOptions] = useState({
    amount: 10,
    difficulty: 'easy'
  });
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = async () => {
    try {
      setLoading(true);
      await startQuiz(category.id, quizOptions.amount, quizOptions.difficulty);
      navigate('/quiz');
    } catch (error) {
      console.error('Failed to start quiz:', error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{category.name}</h3>
          <p className="text-gray-600 text-sm">Test your knowledge in this category</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">{category.name} Quiz</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Number of Questions</label>
              <select 
                className="w-full border rounded p-2"
                value={quizOptions.amount}
                onChange={(e) => setQuizOptions({...quizOptions, amount: parseInt(e.target.value)})}
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Difficulty</label>
              <select 
                className="w-full border rounded p-2"
                value={quizOptions.difficulty}
                onChange={(e) => setQuizOptions({...quizOptions, difficulty: e.target.value})}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                onClick={handleStartQuiz}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Start Quiz'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
