// QuizItem.jsx
import React from "react";
import { Link } from "react-router-dom";

const QuizItem = ({ quiz }) => {
  return (
    <div className="border p-6 rounded-lg shadow-lg bg-white hover:bg-gray-100 transition duration-300">
      <h2 className="text-xl font-semibold mb-3">{quiz.title}</h2>
      <p className="text-gray-600 mb-4">{quiz.description}</p>
      <Link
        to={`/quiz/${quiz._id}`}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizItem;
