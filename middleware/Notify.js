const Announcement = require('../Model/announcementModel');
const Quiz = require('../Model/quizModel');
const Assignment = require('../Model/assignmentModel');
const User = require('../Model/userModel');
const Notification = require('../Model/notifyModel');

const notificationMiddleware = async (req, res, next) => {
    try {
        // Fetch all announcements, quizzes, and assignments created since yesterday
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const announcements = await Announcement.find({ createdAt: { $gt: yesterday } });
        const quizzes = await Quiz.find({ createdAt: { $gt: yesterday } });
        const assignments = await Assignment.find({ createdAt: { $gt: yesterday } });

        // Construct notifications for each new announcement, quiz, and assignment
        const notifications = [];

        announcements.forEach(announcement => {
            notifications.push({
                type: 'announcement',
                message: `New announcement: ${announcement.title}`,
                data: announcement._id
            });
        });

        quizzes.forEach(quiz => {
            notifications.push({
                type: 'quiz',
                message: `New quiz: ${quiz.title}`,
                data: quiz._id
            });
        });

        assignments.forEach(assignment => {
            notifications.push({
                type: 'assignment',
                message: `New assignment: ${assignment.title}`,
                data: assignment._id
            });
        });

        // Save notifications to the database
        await Notification.insertMany(notifications);

        // Continue with the next middleware or route handler
        next();
    } catch (error) {
        console.error('Notification middleware error:', error);
        // Handle errors appropriately
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = notificationMiddleware;
