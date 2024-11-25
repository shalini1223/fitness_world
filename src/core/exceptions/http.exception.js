export class HttpException extends Error {
    constructor(status, message, data) {
        super(message);
        this.status =status;
        this.data = data;
    }
}