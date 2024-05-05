const asyncWrapper = require('../middleware/async');
const CourseModel= require('../Model/courseModel');
const Badrequest=require('../error/Badrequest');
const Notfound=require('../error/Notfound');
// Controller methods
const CourseController = {
  // Get all contacts
  getAllCourse: asyncWrapper(async (req, res,next) => {
    const Course = await CourseModel.find();
      res.json(Course);
    }),
  // Get a single contact by ID
  getCourse: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const Course = await CourseModel.findById(id);
      if (!Course) {
        return next(new Notfound(`Course not found`));
      }
      res.json(Course);
  }),

  // Create a new contact
  createCourse: asyncWrapper(async (req, res,next) => {
    const newCourse = new CourseModel(req.body);
      const savedCourse = await newCourse.save();
      res.status(201).json(savedCourse);
  }),
  deleteCourse: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const deletedCourse = await CourseModel.findByIdAndDelete(id);
      if (!deletedCourse) {
        return next(new Notfound(`Course not found`));
      }
      res.json({ message: 'Course deleted successfully' });
  }),
  updateCourse: asyncWrapper(async (req, res,next) => {
    const { id } = req.params;
      const updatedCourse = await CourseModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedCourse) {
        return next(new Notfound(`Course not found`));
      }
      res.json(updatedCourse);
    
  })

  
};
module.exports = CourseController;
