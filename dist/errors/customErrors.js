export class CustomError extends Error {
    constructor(message, name, status = 500, details = null) {
        super();
        this.message = message;
        this.name = name;
        this.status = status;
        this.details = details;
    }
}
export class BadInputError extends CustomError {
    constructor(error) {
        super("There were validation errors.", "BadInputError", 400, error);
    }
}
export class MissingTokenError extends CustomError {
    constructor(message = "The access token is missing") {
        super(message, "MissingTokenError");
    }
}
