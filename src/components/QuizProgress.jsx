export default function QuizProgress({ currentQuestionIndex, totalQuestions, timeRemaining, formatTime, initialTime }) {
  const timePercentage = Math.max(0, Math.min(100, (timeRemaining / initialTime) * 100));

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium text-gray-700">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <div className="text-sm font-medium text-indigo-600">
          Countdown: {formatTime()}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${timePercentage}%` }}
        />
      </div>
    </div>
  );
}
