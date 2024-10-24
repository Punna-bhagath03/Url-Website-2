import express from "express"
import mongoose from "mongoose"
import { ShortUrl } from "./models/shortUrl.js"
import userRoutes from "./routes/userRoute.js"
import shortUrlRoutes from "./routes/shortUrlRoutes.js"
import methodOverride from "method-override"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { checkAuth } from "./middleware/authMiddleware.js"
import cors from "cors"
dotenv.config({ path: ".env" })

const app = express()

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)

app.set("view engine", "ejs")
// CORS middleware
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:8080'] // Whitelist the domains you want to allow
};
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method")) // Allows overriding methods using ?_method=DELETE

// Route to display all short URLs
app.get("/",checkAuth, async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render("index", { shortUrls: shortUrls })
})

app.get("/login", (req,res) => {
   res.render("login")
})

app.get("/signup", (req,res) => {
  res.render("signup")
})

app.use('/api/users', userRoutes)
app.use("/api/shortUrls", shortUrlRoutes)

// Start the server
app.listen(process.env.PORT || 8080)
