// QuizResult.jsx
import React from "react";

const QuizResult = ({ answers, quiz }) => {
  const totalQuestions = quiz.questions.length;
  const correctAnswers = answers.filter((answer) =>
    quiz.questions[answer.questionIndex].options.find(
      (option) => option._id === answer.answerId && option.isCorrect
    )
  ).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center">
      <h2 className="text-3xl font-semibold mb-4">Quiz Completed!</h2>
      <p className="text-xl mb-4">
        You answered {correctAnswers} out of {totalQuestions} questions
        correctly!
      </p>
      <p className="text-lg text-gray-600">
        Your score: {(correctAnswers / totalQuestions) * 100}%
      </p>
    </div>
  );
};

export default QuizResult;
