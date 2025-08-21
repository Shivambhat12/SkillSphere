// QuizStartPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuizQuestion from "../../components/students/QuizQuestion";
import QuizResult from "../../components/students/QuizResult";

const QuizStartPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quiz/${id}`);
        setQuiz(response.data.quiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (answerId) => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionIndex: currentQuestionIndex, answerId },
    ]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (!quiz) return <div>Loading...</div>;

  if (currentQuestionIndex >= quiz.questions.length) {
    return <QuizResult answers={userAnswers} quiz={quiz} />;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">{quiz.title}</h2>
      <QuizQuestion
        question={currentQuestion}
        onAnswerSelect={handleAnswerSelect}
      />
    </div>
  );
};

export default QuizStartPage;
