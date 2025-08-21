// QuizDetailsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StartQuizButton from "../../components/students/StartQuizButton";

const QuizDetailsPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`/api/quiz/${id}`);
        setQuiz(response.data.quiz);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuizDetails();
  }, [id]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">{quiz.title}</h1>
      <p className="text-gray-600 text-center mb-6">{quiz.description}</p>
      <StartQuizButton quizId={quiz._id} />
    </div>
  );
};

export default QuizDetailsPage;
