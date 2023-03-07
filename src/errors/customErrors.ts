export class CustomError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
    public error: any = null
  ) {
    super();
  }
}

export class BadUserInputError extends CustomError {
  constructor(error: any) {
    super("There were validation errors.", 400, error);
  }
}

export class InvalidTokenError extends CustomError {
  constructor(message = "Authentication token is invalid") {
    super(message);
  }
}
