export class CustomError extends Error {
  constructor(
    public message: string,
    public name: string,
    public status: number = 500,
    public details: any = null
  ) {
    super();
  }
}

export class BadInputError extends CustomError {
  constructor(error: any) {
    super("There were validation errors.", "BadInputError", 400, error);
  }
}

export class MissingTokenError extends CustomError {
  constructor(message = "The access token is missing") {
    super(message, "MissingTokenError");
  }
}
