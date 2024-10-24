import express from "express"
import { createShortUrl, redirectShortUrl, deleteShortUrl, getAllShortUrl } from "../controllers/shortUrlController.js"
import { checkAuth } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", checkAuth, getAllShortUrl)
router.post("/", checkAuth, createShortUrl)
router.get("/:id", checkAuth, redirectShortUrl)
router.delete("/:id", checkAuth, deleteShortUrl)

export default router