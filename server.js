import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import studyGroupRouter from "./routes/studyGroupRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

await mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/devdb"
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
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