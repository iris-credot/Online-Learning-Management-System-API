const asyncWrapper = require('../middleware/async');
const QuizModel= require('../Model/quizModel');
// Controller methods
const QuizController = {
  // Get all contacts
  getAllQuiz: asyncWrapper(async (req, res) => {
    const Quiz = await QuizModel.find();
      res.json(Quiz);
    }),
  // Get a single contact by ID
  getQuiz: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const Quiz = await QuizModel.findById(id);
      if (!Quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      res.json(Quiz);
  }),

  // Create a new contact
  createQuiz: asyncWrapper(async (req, res) => {
    const newQuiz = new QuizModel(req.body);
      const savedQuiz = await newQuiz.save();
      res.status(201).json(savedQuiz);
  }),
  deleteQuiz: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const deletedQuiz = await QuizModel.findByIdAndDelete(id);
      if (!deletedQuiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      res.json({ message: 'Quiz deleted successfully' });
  }),
  updateQuiz: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const updatedQuiz = await QuizModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedQuiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      res.json(updatedQuiz);
    
  })

  
};
module.exports = QuizController;
