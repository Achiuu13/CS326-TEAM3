import express from "express";
import morgan from "morgan";
import studyGroupRouter from "./routes/studyGroupRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/groups", studyGroupRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});