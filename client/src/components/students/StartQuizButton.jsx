// StartQuizButton.jsx
import React from "react";
import { Link } from "react-router-dom";

const StartQuizButton = ({ quizId }) => {
  return (
    <Link
      to={`/quiz/${quizId}/start`}
      className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
    >
      Start Quiz
    </Link>
  );
};

export default StartQuizButton;
