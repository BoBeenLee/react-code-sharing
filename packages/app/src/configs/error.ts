const ERROR_CODE = {};

class CMError extends Error {
  public code: string;
  public name: string;

  constructor(message: string, name: string, code: string) {
    super(message);
    this.name = name;
    this.code = code;
  }
}

export { ERROR_CODE, CMError };
