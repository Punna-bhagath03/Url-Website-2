import {nanoid} from "nanoid"
import mongoose from "mongoose"

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: () => nanoid(),
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
