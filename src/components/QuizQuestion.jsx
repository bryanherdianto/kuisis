import { useState } from 'react';
import DOMPurify from 'dompurify';

export default function QuizQuestion({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Helper function to decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  // Clean and decode the question and answer text
  const sanitizedQuestion = decodeHTML(question.question);
  const sanitizedAnswers = question.all_answers.map(answer => decodeHTML(answer));

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    // Small delay to let user see selection before moving to next question
    setTimeout(() => {
      onAnswer(answer);
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 
        className="text-xl font-semibold mb-4 text-gray-800"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sanitizedQuestion) }}
      />
      
      <div className="space-y-3">
        {sanitizedAnswers.map((answer, index) => (
          <button
            key={index}
            className={`w-full p-4 text-left rounded-lg transition-colors ${
              selectedAnswer === answer
                ? 'bg-indigo-600 text-white'
                : 'bg-white hover:bg-indigo-100 border border-gray-300'
            }`}
            onClick={() => handleSelectAnswer(answer)}
            disabled={selectedAnswer !== null}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
