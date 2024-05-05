// models/quiz.js

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questions: { type: String },
    
});

const quizSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    grade:{ type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    questions: {type: mongoose.Schema.Types.ObjectId, ref: 'QNS', required: true}, // Embedding questions within the quiz document
    Newfile:{type:String},
    due_date: { type: Date, required: true },
    // Add more fields as needed
},{timestamps:true});

module.exports = mongoose.model('Quiz', quizSchema);
