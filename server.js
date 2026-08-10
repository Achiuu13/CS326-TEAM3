import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import studyGroupRouter from "./routes/studyGroupRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { attachUser } from "./middleware/attachUser.js";

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://dev:devpassword@mongo:27017/devdb?authSource=admin";
const SESSION_SECRET =
  process.env.SESSION_SECRET || "development-only-change-this-secret";
await mongoose.connect(MONGODB_URI);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

app.use(attachUser);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/auth", authRouter);
app.use("/groups", studyGroupRouter);

app.get("/", (req, res) => {
  res.redirect("/groups");
});

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
