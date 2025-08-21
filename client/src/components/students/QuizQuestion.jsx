// QuizQuestion.jsx
import React from "react";

const QuizQuestion = ({ question, onAnswerSelect }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">{question.questionText}</h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option._id)}
            className="block w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
