import sharp from "sharp";
import { logger } from "../logger/logger";
import { FailedToProcessImageError } from "../../exceptions/sharp.exceptions.js";

export async function compressImage(file) {
  try {
    const compressImage = await sharp(file.buffer)
      .rotate()
      [`${file.mimetype === "image/jpeg" ? "jpeg" : "png"}`]({ quality: 50 })
      .toBuffer();
    return compressImage;
  } catch (error) {
    throw new FailedToProcessImageError();
  }
}
