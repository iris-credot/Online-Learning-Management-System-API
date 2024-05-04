const asyncWrapper = require('../middleware/async');
const gradeModel= require('../Model/gradeModel');
const QuizModel= require('../Model/quizModel');
const AssigModel= require('../Model/assignmentModel');
// Controller methods
const gradeController = {
  // Get all contacts
  getAllgrade: asyncWrapper(async (req, res) => {
    const Grades = await gradeModel.find();
      res.json(Grades);
    }),
  // Get a single contact by ID
  getgrade: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const Grade = await gradeModel.findById(id);
      if (!Grade) {
        return res.status(404).json({ message: 'Grade not found' });
      }
      res.json(Sub);
  }),

  // Create a new contact
  createGradeAssign: asyncWrapper(async (req, res) => {
    // const newGra = new gradeModel(req.body);
    //   const savedGra = await newGra.save();
    //   res.status(201).json(savedGra);
    try {
      const { assignmentId ,grade} = req.body;
     

      // Find the assignment by ID
      const assignment = await AssigModel.findById(assignmentId);

      if (!assignment) {
          return res.status(404).json({ message: 'Assignment not found' });
      }

      // Update the grade
      assignment.grade = grade;

      // Save the updated assignment
      await assignment.save();

      res.status(200).json({ message: 'Assignment grade updated successfully', assignment });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
  }),
  createGradeQuiz: asyncWrapper(async (req, res) => {
    // const newGra = new gradeModel(req.body);
    //   const savedGra = await newGra.save();
    //   res.status(201).json(savedGra);
    try {
      const { quizId ,grade} = req.body;
     

      // Find the assignment by ID
      const quiz = await QuizModel.findById(quizId);

      if (!quiz) {
          return res.status(404).json({ message: 'Quiz not found' });
      }

      // Update the grade
      quiz.grade = grade;

      // Save the updated assignment
      await quiz.save();

      res.status(200).json({ message: 'Quiz grade updated successfully', quiz });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
  }),
  deletegrade: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const deletedGra = await gradeModel.findByIdAndDelete(id);
      if (!deletedGra) {
        return res.status(404).json({ message: 'Grade not found' });
      }
      res.json({ message: 'Grade deleted successfully' });
  }),
  updategrade: asyncWrapper(async (req, res) => {
    const { id } = req.params;
      const updatedgrade = await gradeModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedgrade) {
        return res.status(404).json({ message: 'grade not found' });
      }
      res.json(updatedgrade);
    
  })

  
};
module.exports = gradeController;
