export class CustomError extends Error {
    constructor(message, status = 500, error = null) {
        super();
        this.message = message;
        this.status = status;
        this.error = error;
    }
}
export class BadUserInputError extends CustomError {
    constructor(error) {
        super("There were validation errors.", 400, error);
    }
}
export class InvalidTokenError extends CustomError {
    constructor(message = "Authentication token is invalid") {
        super(message);
    }
}
