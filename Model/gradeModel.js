// models/grade.js

const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    grade: { type: Number, required: true },
    graded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    graded_at: { type: Date, default: Date.now },
    // Add more fields as needed
},{timestamps:true});

module.exports = mongoose.model('Grade', gradeSchema);
