import httpStatus from "http-status";
import { HttpException } from "./http.exception";

export class FailedToProcessImageError extends HttpException {
  constructor(mesage) {
    super(message);
    this.name = "FailedToProcessImageError";
    this.status = httpStatus.BAD_REQUEST;
    this.message = message || "Failed to process image";
  }
}
