const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../models/Question');

// Get all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find().sort({ _id: 1 });
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

// Submit answers
router.post('/submit', async (req, res) => {
  try {
    const { questionId, userAnswers } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ message: 'Invalid question ID' });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    let correctCount = 0;
    const results = question.correctAnswers.map((correctWord, index) => {
      const isCorrect = correctWord === userAnswers[index];
      if (isCorrect) correctCount++;
      return {
        userAnswer: userAnswers[index],
        correctWord,
        isCorrect
      };
    });

    res.json({
      score: correctCount,
      total: question.correctAnswers.length,
      results
    });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: 'Error submitting answers' });
  }
});

module.exports = router;