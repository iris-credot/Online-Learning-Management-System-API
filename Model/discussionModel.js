// models/discussion.js

const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    replies: [{
        content: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
    }],
    created_at: { type: Date, default: Date.now },
    // Add more fields as needed
},{timestamps:true});

module.exports = mongoose.model('Discussion', discussionSchema);
