import express from "express";
import Quiz from "../models/Quiz.js";

const quizRouter = express.Router();

Router.post("/create", async (req, res) => {
  try {
    const { title, description, questions, creadetBy } = req.body;
    const newQuiz = new Quiz({ title, description, questions, createdBy });
    await newQuiz.save();
    res.json({ success: true, quiz: newQuiz });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
});
export default quizRouter;
