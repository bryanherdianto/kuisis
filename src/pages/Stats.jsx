import { useAuth } from "../contexts/AuthContext";
import { SignedOut, SignedIn, useClerk } from '@clerk/clerk-react';

export default function Stats() {
  const { userStats } = useAuth();
  const clerk = useClerk();

  return (
    <>
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
          <h1 className="text-4xl font-bold text-black mb-4">Login is Required</h1>
          <p className="text-gray-700 mb-6">
            You need to login to view your quiz statistics.
          </p>
          <button
            onClick={() => clerk.openSignIn({})}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8">My Quiz Statistics</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Completed Quizzes</h3>
              <p className="text-3xl font-bold text-indigo-600">{userStats.completedQuizzes}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Correct Answers</h3>
              <p className="text-3xl font-bold text-green-600">{userStats.correctAnswers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Wrong Answers</h3>
              <p className="text-3xl font-bold text-red-600">{userStats.wrongAnswers}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Quiz History</h2>

          {userStats.quizHistory.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userStats.quizHistory.map((quiz) => (
                    <tr key={quiz.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(quiz.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quiz.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {quiz.difficulty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quiz.correct} / {quiz.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
              You haven't completed any quizzes yet.
            </div>
          )}    </div>
      </SignedIn>
    </>
  );
}
