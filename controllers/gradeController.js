const asyncWrapper = require('../middleware/async');
const gradeModel= require('../Model/gradeModel');
const QuizModel= require('../Model/quizModel');
const AssigModel= require('../Model/assignmentModel');
const Badrequest=require('../error/Badrequest');
const Notfound=require('../error/Notfound');
// Controller methods
const gradeController = {
  // Get all contacts
  getAllgrade: asyncWrapper(async (req, res,next) => {
    const Grades = await gradeModel.find();
      res.json(Grades);
    }),
  // Get a single contact by ID
  getgrade: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const Grade = await gradeModel.findById(id);
      if (!Grade) {
        return next(new Notfound(`Grade not found`));
      }
      res.json(Sub);
  }),

  // Create a new contact
  createGradeAssign: asyncWrapper(async (req, res,next) => {
    // const newGra = new gradeModel(req.body);
    //   const savedGra = await newGra.save();
    //   res.status(201).json(savedGra);
    
      const { assignmentId ,grade} = req.body;
     

      // Find the assignment by ID
      const assignment = await AssigModel.findById(assignmentId);

      if (!assignment) {
        return next(new Notfound(`Assignment not found`));
      }

      // Update the grade
      assignment.grade = grade;

      // Save the updated assignment
      await assignment.save();

      res.status(200).json({ message: 'Assignment grade updated successfully', assignment });
 
  }),
  createGradeQuiz: asyncWrapper(async (req, res,next) => {
    // const newGra = new gradeModel(req.body);
    //   const savedGra = await newGra.save();
    //   res.status(201).json(savedGra);
    
      const { quizId ,grade} = req.body;
     

      // Find the assignment by ID
      const quiz = await QuizModel.findById(quizId);

      if (!quiz) {
        return next(new Notfound(`Quiz not found`));
      }

      // Update the grade
      quiz.grade = grade;

      // Save the updated assignment
      await quiz.save();

      res.status(200).json({ message: 'Quiz grade updated successfully', quiz });
  
  }),
  deletegrade: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const deletedGra = await gradeModel.findByIdAndDelete(id);
      if (!deletedGra) {
        return next(new Notfound(`Grade not found`));
      }
      res.json({ message: 'Grade deleted successfully' });
  }),
  updategrade: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const updatedgrade = await gradeModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedgrade) {
        return next(new Notfound(`Grade not found`));
      }
      res.json(updatedgrade);
    
  })

  
};
module.exports = gradeController;
