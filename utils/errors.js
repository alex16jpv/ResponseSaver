export class NotFoundError extends Error {
  constructor() {
    super("Not found");
    this.name = "NotFoundError";
  }
}

export class WriteFileError extends Error {
  constructor() {
    super("Error writing file");
    this.name = "WriteFileError";
  }
}
