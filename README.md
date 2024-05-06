
# Learning Management System API 

This is a brief overview of the LMS (Learning Management System) API, which provides functionality for managing users in the system.

## Technologies Used

- **Node.js**: A JavaScript runtime environment that executes JavaScript code outside of a web browser.
- **Express.js**: A web application framework for Node.js, used for building APIs.
- **MongoDB**: A NoSQL database used for storing user data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, used for interacting with MongoDB databases.
- **bcrypt**: A library for hashing passwords before storing them in the database.
- **validator**: A library for validating and sanitizing strings.
- **joi**: A library for validating input data.

## Setup Instructions

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database and configure the connection in the project.
4. Run the application using `node app.js` or `npm start`.

## User Schema

The user schema defines the structure of user data stored in the MongoDB database. Here's a breakdown of the user schema fields:

- **username**: The username of the user.
- **name**: The name of the user (required).
- **profile**: An object containing additional profile information such as names, bio, and avatar.
- **role**: The role of the user (student or admin, default: student).
- **email**: The email address of the user (required, unique).
- **password**: The password of the user (required, hashed using bcrypt).
- **otpExpires**: The expiration date of the OTP (One Time Password).
- **otp**: The OTP generated for user verification (required).
- **verified**: A boolean flag indicating whether the user account is verified (default: false).
- **last_login**: The date of the user's last login.

## Pre-save Hook

A pre-save hook is defined
