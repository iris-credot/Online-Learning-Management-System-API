/**
 * CustomError is a custom error class that extends the built-in Error class.
 * It allows for creating custom error messages and can be used to throw custom errors.
 * @constructor
 * @param {string} message - The error message to be displayed when the error is thrown.
 */
class CustomError extends Error {
    /**
     * Constructor for CustomError.
     * @param {string} message - The error message to be displayed when the error is thrown.
     */
    constructor(message) {
        // Call the superclass constructor with the provided error message.
        super(message);
    }
}
module.exports= CustomError