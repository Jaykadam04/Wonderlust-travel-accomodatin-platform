class ExpressError extends Error {
    constructor(statusCode, message) {
        super(); // Pass the message to the Error constructor
        this.statusCode = statusCode;
        this.message = message
    }
}

module.exports = ExpressError;
