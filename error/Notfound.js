const CustomError =require('./class');

/**
 * @class
 * @classdesc Custom error class for 404 Not Found responses.
 * @extends {CustomError}
 */
 class NotFoundError extends CustomError {
    /**
     * Creates a new NotFoundError instance.
     * @param {string} message - Error message.
     */
    constructor(message) {
        super(message);

        /**
         * HTTP status code for this error.
         * @type {number}
         */
        this.statusCode = 404;
    }
}
module.exports=NotFoundError