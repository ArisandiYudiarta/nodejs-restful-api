class ResponseError extends Error {
    constructor(status, message, error = true) {
        super(message);
        this.status = status;
        this.error = error;
    }
}

export { ResponseError };
