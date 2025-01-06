function CustomError(message = "", code) {
    this.name = "CustomError";
    this.code = code;
    this.message = message;
}

CustomError.prototype = Error.prototype;
module.exports = CustomError;